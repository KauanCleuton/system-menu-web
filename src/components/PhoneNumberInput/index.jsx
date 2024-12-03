import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { TextField, Button, Box, Grid, FormControl, FormHelperText, InputAdornment, useTheme } from '@mui/material';
import { PhoneIphoneOutlined } from '@mui/icons-material';

// Validação do Formik
const validationSchema = Yup.object({
  name: Yup.string().required('O nome é obrigatório'),
  phone: Yup.string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Número de telefone inválido')
    .required('Número de telefone é obrigatório'),
});

const PhoneNumberInput = ({ onFetchAddress, setData }) => {
  const theme = useTheme();

  return (
    <Formik
      initialValues={{ phone: '', name: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const cleanedPhone = values.phone.replace(/\D/g, '');
        setData((prevData) => ({
          ...prevData,
          phone: cleanedPhone,
          name: values.name,
        }));
        onFetchAddress(cleanedPhone, values.name);
      }}
    >
      {({ handleChange, handleBlur }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Field name="name">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Nome"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(field.touched && field.errors.name)}
                      helperText={<ErrorMessage name="name" component={FormHelperText} />}
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
                </Field>
              </FormControl>
            </Grid>

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
                    bgcolor: theme.palette.primary.main,
                    borderRadius: '5px',
                    textTransform: 'inherit',
                    fontSize: '18px',
                    fontWeight: 400,
                    color: "#fff",
                    border: `1px solid ${theme.palette.primary.main}`,
                    ":hover": {
                      bgcolor: "transparent",
                      color: theme.palette.primary.main,
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
