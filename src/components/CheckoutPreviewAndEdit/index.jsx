import React, { useState } from "react";
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


const userSv = new UserNoAuthSv()
const CheckoutPreviewAndEdit = ({ data, handleFinalize }) => {
  const [comprovante, setComprovante] = useState([])
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


  return (
    <Box sx={{ p: 0 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Visualizar Dados
      </Typography>
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
            <strong>Total:</strong>{" "}
            {Number(data?.total_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Typography>
        </Grid>

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
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPreviewAndEdit;
