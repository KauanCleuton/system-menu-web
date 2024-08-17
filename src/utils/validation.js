import * as Yup from 'yup';

const validateCPF = (cpf) => {
  if (!cpf || typeof cpf !== 'string') return false;
  const cleanedCPF = cpf.replace(/[^\d]+/g, '');

  if (cleanedCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanedCPF)) return false;

  const validateDigit = (factor, length) => {
    let total = 0;
    for (let i = 0; i < length; i++) {
      total += parseInt(cleanedCPF.charAt(i)) * (factor - i);
    }
    let remainder = (total * 10) % 11;
    return remainder === 10 || remainder === 11 ? 0 : remainder;
  };

  const firstDigit = validateDigit(10, 9);
  const secondDigit = validateDigit(11, 10);

  return (
    firstDigit === parseInt(cleanedCPF.charAt(9)) &&
    secondDigit === parseInt(cleanedCPF.charAt(10))
  );
};

const validateCNPJ = (cnpj) => {
  if (!cnpj || typeof cnpj !== 'string') return false;
  const cleanedCNPJ = cnpj.replace(/[^\d]+/g, '');

  if (
    cleanedCNPJ.length !== 14 ||
    /^(\d)\1{13}$/.test(cleanedCNPJ) // Verifica se todos os dígitos são iguais
  )
    return false;

  const validateDigit = (length) => {
    let total = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
      total += parseInt(cleanedCNPJ.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = validateDigit(12);
  const secondDigit = validateDigit(13);

  return (
    firstDigit === parseInt(cleanedCNPJ.charAt(12)) &&
    secondDigit === parseInt(cleanedCNPJ.charAt(13))
  );
};

const validateCPFCNPJ = (value) => validateCPF(value) || validateCNPJ(value);

const validateEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const validatePhone = (phone) => phone.replace(/[^\d]/g, '').length >= 10;

const validateCEP = (cep) => cep.replace(/[^\d]/g, '').length === 8;

const validateExpiryDate = (expiry) => {
  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  return !(year < currentYear || (year == currentYear && month < currentMonth));
};

const validateName = (name) => name.trim().length > 10;
const validations = {
  creditCard: {
    holderName: Yup.string()
      .required('Nome do titular é obrigatório')
      .min(2, 'Nome do titular deve ter pelo menos 2 caracteres'),

    number: Yup.string()
      .required('Número do cartão é obrigatório')
      .matches(/^\d{16}$/, 'Número do cartão inválido. Deve conter 16 dígitos'),

    expirtyMonth: Yup.string()
      .required('Mês de validade é obrigatório')
      .matches(
        /^(0[1-9]|1[0-2])$/,
        'Mês de validade inválido. Deve ser entre 01 e 12'
      ),

    expiryYear: Yup.string()
      .required('Ano de validade é obrigatório')
      .matches(/^\d{2}$/, 'Ano de validade inválido. Deve conter 2 dígitos')
      .test(
        'is-future-year',
        'Ano de validade deve ser no futuro',
        function (value) {
          const currentYear = new Date().getFullYear() % 100;
          return value >= currentYear;
        }
      ),

    cvv: Yup.string()
      .required('CVV é obrigatório')
      .matches(/^\d{3,4}$/, 'CVV inválido. Deve conter 3 ou 4 dígitos'),

    name: Yup.string()
      .required('Nome é obrigatório')
      .test('is-valid-name', 'Nome inválido', validateName),
  },
  signUp: {
    email: Yup.string()
      .required('Campo obrigatório!')
      .test('is-valid-email', 'Email inválido', validateEmail),

    username: Yup.string()
      .required('Username é obrigatório')
      .min(3, 'Username deve ter pelo menos 3 caracteres')
      .max(20, 'Username pode ter no máximo 20 caracteres'),

    document: Yup.string()
      .required('CPF é obrigatório')
      .test('is-valid-cpf', 'CPF inválido', (value) => validateCPF(value)),

    phone: Yup.string()
      .test('is-valid-phone', 'Telefone inválido', validatePhone)
      .nullable(),

    password: Yup.string()
      .required('Senha é obrigatória')
      .min(8, 'Senha deve ter pelo menos 8 caracteres'),

    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder')
      .required('Confirmação de senha é obrigatória'),
  },
  shared: {
    billingAddress: Yup.object().shape({
      postalCode: Yup.string()
        .required('CEP é obrigatório')
        .test('is-valid-cep', 'CEP inválido', validateCEP),
      address: Yup.string(),
      addressNumber: Yup.string().required('Número é obrigatório'),
      complement: Yup.string(),
      province: Yup.string(),
      country: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
    }),
  },
};

export const creditCardValSchema = Yup.object().shape({
  ...validations.creditCard,
});

export const signUpValSchema = Yup.object().shape({ ...validations.signUp });

export default signUpValSchema;
