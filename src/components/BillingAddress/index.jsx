import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { TextField, Button, Grid, FormControl, FormHelperText, InputAdornment } from '@mui/material';

// Validação com Yup
const validationSchema = Yup.object({
    road: Yup.string().required('Rua é obrigatória'),
    house_number: Yup.string().required('Número da casa é obrigatório'),
    neighborhood: Yup.string().required('Bairro é obrigatório'),
    city: Yup.string().required('Cidade é obrigatória'),
    complement: Yup.string(),
});

const BillingAddress = ({ handleSubmit, initialValues }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ handleChange, handleBlur, values, touched, errors }) => (
                <Form>
                    <Grid container spacing={3}>
                        {/* Rua */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="road">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Rua"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            error={touched.road && Boolean(errors.road)}
                                            helperText={<ErrorMessage name="road" component={FormHelperText} />}
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
                                </Field>
                            </FormControl>
                        </Grid>

                        {/* Número da Casa */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="house_number">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Número da Casa"
                                            variant="outlined"
                                            margin="normal"
                                            type='number'
                                            fullWidth
                                            error={touched.house_number && Boolean(errors.house_number)}
                                            helperText={<ErrorMessage name="house_number" component={FormHelperText} />}
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
                                </Field>
                            </FormControl>
                        </Grid>

                        {/* Bairro */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="neighborhood">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Bairro"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            error={touched.neighborhood && Boolean(errors.neighborhood)}
                                            helperText={<ErrorMessage name="neighborhood" component={FormHelperText} />}
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
                                </Field>
                            </FormControl>
                        </Grid>

                        {/* Cidade */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="city">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Cidade"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            error={touched.city && Boolean(errors.city)}
                                            helperText={<ErrorMessage name="city" component={FormHelperText} />}
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
                                </Field>
                            </FormControl>
                        </Grid>

                        {/* Complemento */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field name="complement">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Complemento"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            error={touched.complement && Boolean(errors.complement)}
                                            helperText={<ErrorMessage name="complement" component={FormHelperText} />}
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
                                </Field>
                            </FormControl>
                        </Grid>

                        {/* Botão de Enviar */}
                        <Grid item xs={12}>
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
                                Salvar Endereço
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default BillingAddress;