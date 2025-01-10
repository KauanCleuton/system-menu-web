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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import UserNoAuthSv from "@/service/user.service";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { SET_ALERT } from "@/store/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "../Loading";
import { Pix } from "@mui/icons-material";


const userSv = new UserNoAuthSv()
const CheckoutPreviewAndEdit = ({ data, handleFinalize, qrCodeGenerated, qrCodeImage, pixCola }) => {
  const [comprovante, setComprovante] = useState([])
  const [timeLeft, setTimeLeft] = useState(300);
  const navigate = useRouter();
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()


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


  useEffect(() => {
    let timer;

    if (qrCodeGenerated) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      if (timeLeft === 0) {
        clearInterval(timer);
        setTimeout(() => {
          navigate("/");
        }, 120000);
      }
    }

    return () => clearInterval(timer);
  }, [qrCodeGenerated, timeLeft, navigate]);



  return loading ? <Loading /> : (
    <Box sx={{ p: 0 }}>
      <Typography variant="h3" gutterBottom color="primary">
        {data.payment === 'PIX' ? 'Qrcode e pix cola' : 'Visualizar Dados'}
      </Typography>
      {data.payment === 'PIX' ? (
        <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 2, // Espaço entre os elementos
            mt: 4, // Margem superior
          }}
        >
          <Pix sx={{ fontSize: 50, color: theme.palette.primary.main }} />
          <Typography variant="h6" color="secondary">
            <strong>Pagamento via PIX</strong>
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
            Clique no botão abaixo para gerar o QR Code do PIX. Você terá até 5 minutos para realizar o pagamento.
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
                setTimeLeft(300);
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
                <Image
                  src={`data:image/png;base64,${qrCodeImage}`}
                  alt="QR Code PIX"
                  layout="fill"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Box>

            <Typography variant="body1" sx={{ mb: 1, color: theme.palette.secondary.main }}>
              Valor a pagar: <strong>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(data.total_price)}</strong>
            </Typography>

            <Typography variant="body1" sx={{ mb: 1, color: theme.palette.secondary.main, fontSize: {lg: '40px', md: '40px', xs: '20px', sm: '20px' } }}>
              Pix cola: <strong>{pixCola}</strong>
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigator.clipboard.writeText(pixCola);
                dispatch({ type: SET_ALERT, message: 'Pix cola copiado com sucesso!' });
              }}
            >
              Copiar Pix cola
            </Button>
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              O QR Code expira em 5 minutos.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: theme.palette.primary.main }}>
              Tempo restante: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
              {timeLeft % 60} minutos
            </Typography>
          </Box>
        )}
      </>

      ) : (<>
        <Grid container spacing={2}>
          {/* Exibindo dados do pedido */}
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
                ? `${data?.address.road}, ${data?.address.house_number}, ${data?.address.neighborhood}, ${data?.address.city}, ${data?.address.complement}`
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

      </>)}
    </Box>
  );
};

export default CheckoutPreviewAndEdit;
