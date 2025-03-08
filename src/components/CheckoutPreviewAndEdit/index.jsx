import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
  useTheme,
  Autocomplete
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UserNoAuthSv from "@/service/user.service";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { SET_ALERT } from "@/store/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "../Loading";
import { Pix } from "@mui/icons-material";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { Formik, Form, Field } from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';

const installmentOptions = Array.from({ length: 10 }, (_, i) => `${i + 1}x`);




const userSv = new UserNoAuthSv()
const CheckoutPreviewAndEdit = ({ data, handleFinalize, qrCodeImage, pixCola }) => {
  const [comprovante, setComprovante] = useState([])
  const [timeLeft, setTimeLeft] = useState(480);
  const navigate = useRouter();
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [card, setCard] = useState({ name: '', number: '', expiry: '', cvc: '', installments: '' });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);



  const handleInputFocus = (e) => {
    setCard((prev) => ({ ...prev, focus: e.target.name }));
  };

  const handleInstallmentsChange = (event, value) => {
    setCard((prev) => ({ ...prev, installments: value }));
    console.log(value)
  };

  const handleSavedCard = (e) => {
    const { name, value } = e.target;
    if (name === 'expiry') {
      const formattedValue = value.replace(/\//g, '').padEnd(4, '0');
      setCard((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setCard((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!card.name || card.name.trim() === '') newErrors.name = 'Nome do titular é obrigatório';

    if (!card.number || card.number.replace(/\s/g, '').length !== 16) newErrors.number = 'Número do cartão inválido';

    if (!card.expiry || card.expiry.trim() === '') {
      newErrors.expiry = 'Data de validade é obrigatória';
    } else if (!/^\d{2}\/\d{4}$/.test(card.expiry)) {
      const formattedExpiry = card.expiry.slice(0, 2) + '/' + card.expiry.slice(2);
      if (!/^\d{2}\/\d{4}$/.test(formattedExpiry)) {
        newErrors.expiry = 'Data de validade inválida';
      } else {
        card.expiry = formattedExpiry;
      }
    } else {
      const [expiryMonth, expiryYear] = card.expiry.split('/');

      const month = parseInt(expiryMonth, 10);
      const year = parseInt(expiryYear, 10);

      if (month < 1 || month > 12) {
        newErrors.expiry = 'Mês inválido';
      } else {
        const currentDate = new Date();
        const expiryDate = new Date(`20${expiryYear}`, month, 0);

        if (expiryDate < currentDate) {
          newErrors.expiry = 'Data de validade expirada';
        }
      }
    }

    if (!card.cvc || card.cvc.length !== 3) newErrors.cvc = 'CVV inválido';

    if (!card.installments) newErrors.installments = 'Selecione o número de parcelas';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };





  useEffect(() => {
    setIsFormValid(validateFields());
  }, [card]);

  const handleSubmit = () => {
    if (validateFields()) {
      const formattedCard = {
        holderName: card.name,
        number: card.number.replace(/\s/g, ''),
        expiryMonth: card.expiry.slice(0, 2),
        expiryYear: card.expiry.slice(3, 7),
        cvv: card.cvc,
      };

      const payload = {
        creditCard: {
          ...formattedCard
        },
        installmentCount: Number(card.installments.slice('x')[0]),
        ...data

      }

      console.log('Compra confirmada:', {
        payload
      });
      handleFinalize(payload)
    }
  };




  const generateWhatsAppMessage = () => {
    const address = `${data?.address.road}, ${data?.address.house_number}, ${data?.address.neighborhood}, ${data?.address.city}, ${data?.address.complement}`;
    const items = data?.orderItems
      .map(
        (item) =>
          `Produto: ${item.title}, Quantidade: ${item.quantity}, Preço: ${Number(item.price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`
      )
      .join("%0A");
    const total = `Total: ${parseInt(data?.total_price).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;

    return `Olá,%20aqui%20estão%20os%20detalhes%20do%20meu%20pedido:%0A%0ANome:%20${data.name}%0ATelefone:%20${data.phone}%0A%0AEndereço:%20${address}%0A%0A${items}%0A%0A${total}`;
  };

  const validationSchema = Yup.object().shape({
    file: Yup.mixed()
      .required("O comprovante é obrigatório")
      .test("fileSize", "O arquivo deve ter no máximo 2MB", (value) => {
        if (!value) return false;
        return value.size <= 2 * 1024 * 1024;
      })
      .test("fileType", "O arquivo deve ser JPG, PNG ou PDF", (value) => {
        if (!value) return false;
        return ["image/jpeg", "image/png", "application/pdf"].includes(value.type);
      }),
  });


  const handleChangeForm = async (e) => {
    const file = e.target.files[0] || null;
    console.log("Arquivo carregado:", file);

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        console.error("Tipo de arquivo não suportado:", file.type);
        return;
      }

      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("valorPedido", data?.total_price)

        const response = await userSv.postPixReceiptAnalysis(formData);
        console.log("Resposta do servidor:", response);
        setComprovante(response)
        dispatch({ type: SET_ALERT, message: response.mensagem })
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
        dispatch({ type: SET_ALERT, message: 'Erro ao análisar comprovante!', severity: 'error' })
      } finally {
        setLoading(false);
      }
    }
  };


  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);

  useEffect(() => {
    let timer;

    if (qrCodeGenerated && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      clearInterval(timer);
      navigate.replace("/")
    }

    return () => clearInterval(timer);
  }, [qrCodeGenerated, timeLeft, navigate]);



  const renderComponent = () => {
    switch (data.payment) {
      case 'PIX': {
        return (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 2,
                mt: 4,
              }}
            >
              <Pix sx={{ fontSize: 120, color: "#4DB6AC" }} />
              <Typography variant="h6" color="secondary">
                <strong>Pagamento via PIX</strong>
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                Clique no botão abaixo para gerar o QR Code do PIX. Você terá até 8 minutos para realizar o pagamento.
              </Typography>
            </Box>

            {!qrCodeGenerated ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  sx={{
                    mt: 10,
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleFinalize(data);
                    setQrCodeGenerated(true)
                  }}
                >
                  Gerar QR Code
                </Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', mt: 4 }}>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 270,
                      height: 270,
                      position: 'relative',
                    }}
                  >
                    {qrCodeImage ? (
                      <Image
                        src={`data:image/png;base64,${qrCodeImage}`}
                        alt="QR Code PIX"
                        layout="fill"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <Box sx={{ width: '100%', height: '270px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Loading />
                      </Box>
                    )}
                  </Box>
                </Box>

                <Typography variant="body1" sx={{ mb: 1, color: theme.palette.secondary.main }}>
                  Valor a pagar: <strong>{Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(data.total_price)}</strong>
                </Typography>

                <Typography sx={{ mb: 1, color: theme.palette.secondary.main }}>
                  Pix cola:
                </Typography>
                <Typography
                  sx={{
                    mb: 1,
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                    wordBreak: 'break-word',  // Faz o texto quebrar quando atingir o limite da tela
                    overflowWrap: 'break-word', // Para garantir que palavras longas que não podem ser quebradas, também quebrem
                  }}
                >
                  {pixCola}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(pixCola);
                    dispatch({ type: SET_ALERT, message: 'Pix cola copiado com sucesso!' });
                  }}
                >
                  Copiar Pix cola
                </Button>
                <Typography variant="body2" color="error" sx={{ mt: 2, fontWeight: 'bold' }}>
                  O QR Code expira em 8 minutos.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: theme.palette.primary.main, fontWeight: 'bold' }}>
                  Tempo restante: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
                  {timeLeft % 60} minutos
                </Typography>
              </Box>
            )}
          </>
        )
      }
      case 'Dinheiro': {
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                <strong>Nome:</strong> {data.name}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                <strong>Telefone:</strong> {data.phone}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                <strong>Endereço:</strong>{" "}
                {data?.address
                  ? `${data?.address.postalCode}, ${data?.address.house_number}, ${data?.address.neighborhood}, ${data?.address.city}, ${data?.address.postalCode}, ${data?.address.complement}`
                  : "Não disponível"}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                <strong>Data:</strong> {new Date().toLocaleDateString()}
              </Typography>
              {data?.orderItems.map((item, index) => (
                <Box key={index} sx={{ mb: 2, mt: 2 }}>
                  <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                    <strong>Produto:</strong> {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                    <strong>Quantidade:</strong> {item.quantity}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                    <strong>Observação:</strong> {item.observation}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                    <strong>Preço:</strong>{" "}
                    {Number(item.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </Typography>
                </Box>
              ))}

              <Typography variant="h6" color="secondary">
                <strong>Tipo do pagamento:</strong>{" "}
                {data.payment}
              </Typography>

              <Typography variant="h6" color="secondary">
                <strong>Total:</strong>{" "}
                {Number(data?.total_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Typography>
            </Grid>

            {/* <Grid item xs={12}>
          <Formik
            initialValues={{ file: null }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const finalData = {
                ...data,
                comprovante: values.file,
              };
              handleFinalize(finalData);
            }}
          >
            {({ setFieldValue, errors, touched, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="secondary" fontWeight='bold'>
                      Envie o comprovante
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth error={touched.file && Boolean(errors.file)}>
                      <InputLabel htmlFor="file-input">Arquivo</InputLabel>
                      <TextField
                        id="file-input"
                        type="file"
                        inputProps={{ accept: "image/jpeg,image/png,application/pdf" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFieldValue("file", file);
                          handleChangeForm(e)
                        }}
                        sx={{
                          "& .MuiInputBase-input": { color: theme.palette.secondary.main },
                          "& .MuiFormLabel-root": { color: theme.palette.secondary.main },
                          "& .MuiFormHelperText-root": { color: theme.palette.primary.main}
                        }}
                        label="Arquivo"
                        InputProps={{
                          sx: {
                            flexShrink: 0,
                          },
                        }}
                        helperText={loading ? "Carregando arquivo..." : "Selecione um arquivo para upload"}
                      />
                      {touched.file && errors.file && (
                        <FormHelperText>{errors.file}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  {comprovante.status && (
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: comprovante.status === "valido"
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                          fontSize: 18,
                        }}
                      >
                        {comprovante.status === "valido" ? (
                          <>
                            <CheckCircleIcon sx={{ marginRight: 1 }} /> Status: Válido
                          </>
                        ) : (
                          <>
                            <ErrorIcon sx={{ marginRight: 1 }} /> Status: Inválido
                          </>
                        )}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                      <Grid item>
                        <Button variant="contained" color="primary" type="submit" sx={{
                          fontSize: 11
                        }}>
                          Finalizar Compra
                        </Button>
                      </Grid>

                      <Grid item>
                        <Button
                          variant="contained"
                          color="success"
                          component="a"
                          href={`https://wa.me/558592985693?text=${generateWhatsAppMessage()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            fontSize: 11
                          }}
                        >
                          Enviar para WhatsApp
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid> */}
          </Grid>
        )
      }
      case 'CREDIT_CARD': {
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{
                width: "auto",
              }}>
                <Cards
                  number={card.number}
                  expiry={card.expiry.slice(0, 2) + '/' + card.expiry}
                  cvc={card.cvc}
                  name={card.name}
                  focused={card.focus}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.name}>
                <TextField
                  name="name"
                  label="Nome do Titular"
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-input": {
                      color: theme.palette.secondary.main
                    },
                    "& .MuiFormLabel-root": {
                      color: theme.palette.secondary.main
                    },
                    "& .MuiFormHelperText-root": {
                      color: theme.palette.primary.main
                    }
                  }}
                  value={card.name}
                  onChange={handleSavedCard}
                  onFocus={handleInputFocus}
                />
                {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.number}>
                <InputMask mask="9999 9999 9999 9999" value={card.number} onChange={handleSavedCard} onFocus={handleInputFocus}>
                  {(inputProps) => <TextField {...inputProps} name="number" label="Número do Cartão" variant="outlined"
                    sx={{
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary.main
                      },
                      "& .MuiFormLabel-root": {
                        color: theme.palette.secondary.main
                      },
                      "& .MuiFormHelperText-root": {
                        color: theme.palette.primary.main
                      }
                    }} />}
                </InputMask>
                {errors.number && <FormHelperText>{errors.number}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.expiry}>
                <InputMask mask="99/9999" value={card.expiry.slice(0, 2) + '/' + card.expiry.slice(2)} onChange={handleSavedCard} onFocus={handleInputFocus}>
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      name="expiry"
                      label="Validade (MM/AAAA)"
                      variant="outlined"
                      sx={{
                        "& .MuiInputBase-input": {
                          color: theme.palette.secondary.main
                        },
                        "& .MuiFormLabel-root": {
                          color: theme.palette.secondary.main
                        },
                        "& .MuiFormHelperText-root": {
                          color: theme.palette.primary.main
                        }
                      }}
                    />
                  )}
                </InputMask>
                {errors.expiry && <FormHelperText>{errors.expiry}</FormHelperText>}
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.cvc}>
                <InputMask mask="999" value={card.cvc} onChange={handleSavedCard} onFocus={handleInputFocus}>
                  {(inputProps) => <TextField {...inputProps} name="cvc" label="CVV" variant="outlined"
                    sx={{
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary.main
                      },
                      "& .MuiFormLabel-root": {
                        color: theme.palette.secondary.main
                      },
                      "& .MuiFormHelperText-root": {
                        color: theme.palette.primary.main
                      }
                    }} />}
                </InputMask>
                {errors.cvc && <FormHelperText>{errors.cvc}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.installments}>
                <Autocomplete
                  options={installmentOptions}
                  value={card.installments}
                  onChange={handleInstallmentsChange}
                  renderOption={(props, option) => (
                    <Box {...props} key={option}>
                      <Typography color={theme.palette.primary.main}>
                        {option}
                      </Typography>
                    </Box>
                  )}
                  sx={{
                    '& .MuiAutocomplete-option': {
                      backgroundColor: '#fff',
                      color: theme.palette.primary.main,
                    },
                    '& .MuiAutocomplete-option.Mui-focused': {
                      backgroundColor: theme.palette.primary.main,
                      color: '#fff',
                    },
                  }}
                  renderInput={(params) => <TextField {...params} label="Parcelas" variant="outlined"
                    sx={{
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary.main
                      },
                      "& .MuiFormLabel-root": {
                        color: theme.palette.secondary.main
                      },
                      "& .MuiFormHelperText-root": {
                        color: theme.palette.primary.main
                      }
                    }} />}
                />
                {errors.installments && <FormHelperText>{errors.installments}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={!isFormValid}>
                Confirmar Compra
              </Button>
            </Grid>
          </Grid>
        )
      }
    }
  }


  return loading ? <Loading /> : (
    <Box sx={{ p: 0 }}>
      {renderComponent()}
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
            <strong>Nome:</strong> {data.name}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
            <strong>Telefone:</strong> {data.phone}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
            <strong>Endereço:</strong>{" "}
            {data?.address
              ? `${data?.address.road}, ${data?.address.house_number}, ${data?.address.neighborhood}, ${data?.address.city}, ${data?.address.postalCode}, ${data?.address.complement}`
              : "Não disponível"}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
            <strong>Data:</strong> {new Date().toLocaleDateString()}
          </Typography>
          {data?.orderItems.map((item, index) => (
            <Box key={index} sx={{ mb: 2, mt: 2 }}>
              <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                <strong>Produto:</strong> {item.title}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                <strong>Quantidade:</strong> {item.quantity}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                <strong>Observação:</strong> {item.observation}
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                <strong>Preço:</strong>{" "}
                {Number(item.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Typography>
            </Box>
          ))}

          <Typography variant="h6" color="secondary">
            <strong>Tipo do pagamento:</strong>{" "}
            {data.payment}
          </Typography>

          <Typography variant="h6" color="secondary">
            <strong>Total:</strong>{" "}
            {Number(data?.total_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Typography>
        </Grid>


        {data.payment === 'PIX' ? (
          <Grid item xs={12}>
            <Formik
              initialValues={{ file: null }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const finalData = {
                  ...data,
                  comprovante: values.file,
                };
                handleFinalize(finalData);
              }}
            >
              {({ setFieldValue, errors, touched, values }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="secondary" fontWeight='bold'>
                        Envie o comprovante
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth error={touched.file && Boolean(errors.file)}>
                        <InputLabel htmlFor="file-input">Arquivo</InputLabel>
                        <TextField
                          id="file-input"
                          type="file"
                          inputProps={{ accept: "image/jpeg,image/png,application/pdf" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setFieldValue("file", file);
                            handleChangeForm(e)
                          }}
                          sx={{
                            "& .MuiInputBase-input": { color: theme.palette.secondary.main },
                            "& .MuiFormLabel-root": { color: theme.palette.secondary.main },
                            "& .MuiFormHelperText-root": { color: theme.palette.primary.main }
                          }}
                          label="Arquivo"
                          InputProps={{
                            sx: {
                              flexShrink: 0,
                            },
                          }}
                          helperText={loading ? "Carregando arquivo..." : "Selecione um arquivo para upload"}
                        />
                        {touched.file && errors.file && (
                          <FormHelperText>{errors.file}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    {comprovante.status && (
                      <Grid item xs={12}>
                        <Typography
                          variant="body1"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: comprovante.status === "valido"
                              ? theme.palette.success.main
                              : theme.palette.error.main,
                            fontSize: 18,
                          }}
                        >
                          {comprovante.status === "valido" ? (
                            <>
                              <CheckCircleIcon sx={{ marginRight: 1 }} /> Status: Válido
                            </>
                          ) : (
                            <>
                              <ErrorIcon sx={{ marginRight: 1 }} /> Status: Inválido
                            </>
                          )}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                        <Grid item>
                          <Button variant="contained" color="primary" type="submit" sx={{
                            fontSize: 11
                          }}>
                            Finalizar Compra
                          </Button>
                        </Grid>

                        <Grid item>
                          <Button
                            variant="contained"
                            color="success"
                            component="a"
                            href={`https://wa.me/558592985693?text=${generateWhatsAppMessage()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              fontSize: 11
                            }}
                          >
                            Enviar para WhatsApp
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => handleFinalize(data)} sx={{
                  fontSize: 11
                }}>
                  Finalizar Compra
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  component="a"
                  href={`https://wa.me/558592985693?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: 11
                  }}
                >
                  Enviar para WhatsApp
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid> */}
    </Box>
  );
};

export default CheckoutPreviewAndEdit;
