import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { TextField, Button, Box, Grid, FormControl, FormHelperText, InputAdornment } from '@mui/material';
import { PhoneIphoneOutlined } from '@mui/icons-material';

// Validação do Formik
const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Número de telefone inválido')
    .required('Número de telefone é obrigatório'),
});

const PhoneNumberInput = ({ onFetchAddress }) => {
  return (
    <Formik
      initialValues={{ phone: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const cleanedPhone = values.phone.replace(/\D/g, '');
        onFetchAddress(cleanedPhone);
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Field name="phone">
                  {({ field }) => (
                    <InputMask
                      mask="(99) 99999-9999"
                      {...field}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {() => (
                        <TextField
                          {...field}
                          label="Número de Telefone"
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          error={Boolean(field.touched && field.errors.phone)}
                          helperText={<ErrorMessage name="phone" component={FormHelperText} />}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <PhoneIphoneOutlined sx={{ color: "#FFF", width: 17, height: 17 }} />
                              </InputAdornment>
                            ),
                            inputProps: {
                              style: { color: "#000" } // Cor do texto ajustada
                            }
                          }}
                          sx={{
                            "& .MuiInputBase-input": {
                              color: "#000", // Cor do texto ajustada
                            },
                            "& .MuiFormLabel-root": {
                              color: "#000", // Cor do rótulo ajustada
                            },
                            "& .MuiFormHelperText-root": {
                              color: "#d32f2f" // Cor do texto de ajuda
                            }
                          }}
                        />
                      )}
                    </InputMask>
                  )}
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ width: '100%', alignItems: "center", justifyContent: 'center', display: 'flex' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#ec500d",
                    borderRadius: '5px',
                    textTransform: 'inherit',
                    fontSize: '18px',
                    fontWeight: 400,
                    color: "#fff",
                    border: `1px solid #FF4D00`,
                    ":hover": {
                      bgcolor: "transparent",
                      color: "#FF4D00"
                    },
                  }}
                >
                  Buscar Endereço
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default PhoneNumberInput;