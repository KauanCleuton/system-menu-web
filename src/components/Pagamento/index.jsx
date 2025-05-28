import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  useTheme,
  FormControl
} from '@mui/material';
import {
  AttachMoneyOutlined,
  PixOutlined,
  CreditCardOutlined
} from '@mui/icons-material';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Pagamento = ({ onPaymentMethodChange, handleNext, handleBack, total }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [troco, setTroco] = useState('');
  const [document, setDocument] = useState('');
  const valorTotal = total; // total recebido por props
const frete = valorTotal < 15 ? 2 : 0;
const totalComFrete = valorTotal + frete;


  const theme = useTheme();

  const validationSchema = Yup.object({
    document: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
      .required('O CPF é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      document: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const cleanedDocument = values.document.replace(/\D/g, '');
      setDocument(cleanedDocument);
      onPaymentMethodChange('PIX', troco, cleanedDocument);
      handleNext();
    },
  });

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    if (method !== 'PIX') {
      setDocument('');
    }
    onPaymentMethodChange(method, method === 'Dinheiro' ? troco : '', document);
  };

  const handleTrocoChange = (event) => {
    setTroco(event.target.value);
    if (paymentMethod === 'Dinheiro') {
      onPaymentMethodChange(paymentMethod, event.target.value, document);
    }
  };

  const isNextButtonEnabled = () => {
    if (!paymentMethod) return false;

    if (paymentMethod === 'PIX') {
      return (
        !!formik.values.document &&
        !formik.errors.document &&
        formik.touched.document
      );
    }

    if (paymentMethod === 'Dinheiro') {
  if (!troco) return true; // valor exato
  const trocoValue = parseFloat(troco);
  return !isNaN(trocoValue) && trocoValue >= totalComFrete;
}


    return true; // cartão não exige validação extra
  };



  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Escolha a sua forma de Pagamento
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sm={12}>
          <Button
            fullWidth
            variant={paymentMethod === 'PIX' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePaymentChange('PIX')}
            startIcon={<PixOutlined />}
            sx={{ py: 2 }}
          >
            PIX
          </Button>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Button
            fullWidth
            variant={paymentMethod === 'Dinheiro' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePaymentChange('Dinheiro')}
            startIcon={<AttachMoneyOutlined />}
            sx={{ py: 2 }}
          >
            Dinheiro
          </Button>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Button
            fullWidth
            variant={paymentMethod === 'CREDIT_CARD' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePaymentChange('CREDIT_CARD')}
            startIcon={<CreditCardOutlined />}
            sx={{ py: 2 }}
          >
            Cartão de Crédito
          </Button>
        </Grid>

        {paymentMethod === 'PIX' && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography sx={{ mb: 1, color: "secondary.main", fontWeight: "500" }}>
                Prezados clientes, informamos que o <strong>CPF</strong> é <strong>obrigatório</strong> para dar prosseguimento ao <strong>pagamento via PIX</strong>.<br />
                Essa exigência faz parte das <strong>políticas de segurança da API de Pagamentos do Mercado</strong>, tecnologia utilizada neste site.<br /><br />
                Agradecemos pela sua compreensão.<br />
                <strong>VishiDelivery Devs – Desenvolvedores.</strong>
              </Typography>

              <InputMask
                mask="999.999.999-99"
                value={formik.values.document}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {() => (
                  <TextField
                    name="document"
                    label="CPF"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={Boolean(formik.touched.document && formik.errors.document)}
                    helperText={formik.touched.document && formik.errors.document}
                    InputProps={{
                      inputProps: {
                        style: { color: theme.palette.secondary.main },
                      },
                    }}
                    sx={{
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary.main,
                      },
                      "& .MuiFormLabel-root": {
                        color: theme.palette.secondary.main,
                      },
                      "& .MuiFormHelperText-root": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                )}
              </InputMask>
            </FormControl>
          </Grid>
        )}

        {paymentMethod === 'Dinheiro' && (
          <Grid item xs={12}>
            <TextField
              label="Troco"
              type="number"
              value={troco}
              sx={{
                "& .MuiInputBase-input": {
                  color: theme.palette.secondary.main,
                },
                "& .MuiFormLabel-root": {
                  color: theme.palette.secondary.main,
                },
                "& .MuiFormHelperText-root": {
                  color: theme.palette.primary.main,
                },
              }}
              onChange={handleTrocoChange}
              fullWidth
              margin="normal"
            />
            {paymentMethod === 'Dinheiro' && troco && parseFloat(troco) < total && (
              <Typography variant="body2" color="error">
                O valor informado deve ser maior ou igual ao total da compra (R$ {totalComFrete.toFixed(2)}).
              </Typography>
            )}

          </Grid>
        )}

        <Grid item xs={12}>
          <Box sx={{
            width: "100%",
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              sx={{ mt: 2 }}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={isNextButtonEnabled() && handleNext}
              sx={{ mt: 2 }}
              disabled={!isNextButtonEnabled()}
            >
              Próximo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pagamento;
