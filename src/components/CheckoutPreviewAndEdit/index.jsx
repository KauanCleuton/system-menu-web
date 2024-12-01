import React from "react";
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
} from "@mui/material";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CheckoutPreviewAndEdit = ({ data, handleFinalize }) => {
  const nameUser = useSelector((state) => state.login.data.name);
  const phone = useSelector((state) => state.login.data.phone);

  // Função para converter arquivo em Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
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

    return `Olá,%20aqui%20estão%20os%20detalhes%20do%20meu%20pedido:%0A%0ANome:%20${nameUser}%0ATelefone:%20${phone}%0A%0AEndereço:%20${address}%0A%0A${items}%0A%0A${total}`;
  };

  const validationSchema = Yup.object().shape({
    file: Yup.mixed()
      .nullable()
      .test("fileSize", "O arquivo deve ter no máximo 2MB", (value) => {
        if (!value) return true;
        return value.size <= 2 * 1024 * 1024;
      })
      .test("fileType", "O arquivo deve ser JPG, PNG ou PDF", (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "application/pdf"].includes(value.type);
      }),
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Visualizar Dados
      </Typography>
      <Grid container spacing={2}>
        {/* Exibindo dados do pedido */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" sx={{ color: "#000" }}>
            <strong>Nome:</strong> {nameUser}
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            <strong>Telefone:</strong> {phone}
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            <strong>Endereço:</strong>{" "}
            {data?.address
              ? `${data?.address.road}, ${data?.address.house_number}, ${data?.address.neighborhood}, ${data?.address.city}, ${data?.address.complement}`
              : "Não disponível"}
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            <strong>Data:</strong> {new Date().toLocaleDateString()}
          </Typography>
          {data?.orderItems.map((item, index) => (
            <Box key={index} sx={{ mb: 2, mt: 2 }}>
              <Typography variant="body1" sx={{ color: "#000" }}>
                <strong>Produto:</strong> {item.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#000" }}>
                <strong>Quantidade:</strong> {item.quantity}
              </Typography>
              <Typography variant="body1" sx={{ color: "#000" }}>
                <strong>Observação:</strong> {item.observation}
              </Typography>
              <Typography variant="body1" sx={{ color: "#000" }}>
                <strong>Preço:</strong>{" "}
                {parseInt(item.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Typography>
            </Box>
          ))}
          <Typography variant="h6" color="secondary">
            <strong>Total:</strong>{" "}
            {parseInt(data?.total_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Formik
            initialValues={{ file: null }}
            validationSchema={validationSchema}
            onSubmit={() => handleFinalize(data)}
          >
            {({ setFieldValue, errors, touched, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={touched.file && Boolean(errors.file)}>
                      <InputLabel htmlFor="file-input">Arquivo</InputLabel>
                      <TextField
                        id="file-input"
                        type="file"
                        inputProps={{ accept: "image/jpeg,image/png,application/pdf" }}
                        onChange={async (e) => {
                          const file = e.target.files[0] || null;
                          setFieldValue("file", file);
                          console.log("Arquivo carregado:", file);

                          if (file) {
                            try {
                              const base64 = await fileToBase64(file);
                              console.log("Arquivo em Base64:", base64);
                            } catch (error) {
                              console.error("Erro ao converter arquivo para Base64:", error);
                            }
                          }
                        }}
                        sx={{
                          "& .MuiInputBase-input": { color: '#000' },
                          "& .MuiFormLabel-root": { color: '#000' },
                          "& .MuiFormHelperText-root": { color: '#d32f2f' },
                        }}
                        label="Arquivo"
                      />
                      {touched.file && errors.file && (
                        <FormHelperText>{errors.file}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
                      <Grid item>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
                          Finalizar Compra
                        </Button>
                      </Grid>

                      <Grid item>
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ mt: 2, ml: 2 }}
                          component="a"
                          href={`https://wa.me/558592985693?text=${generateWhatsAppMessage()}`}
                          target="_blank"
                          rel="noopener noreferrer"
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
