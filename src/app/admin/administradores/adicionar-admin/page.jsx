"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, FormControl, FormHelperText, Typography, Box } from '@mui/material';
import Link from 'next/link';

// Validação com Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    phone: Yup.string()
        .required('Telefone é obrigatório')
        .matches(/^\d+$/, 'Telefone deve conter apenas números'),
    senha: Yup.string()
        .required('Senha é obrigatória')
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

const AddNewAdmin = ({ handleSubmit, initialValues }) => {
    return (
        <Grid container spacing={2} direction='column' py={1}>
            <Grid item >
                <Typography variant='h2' sx={{ color: "#000", textAlign: "center" }}>
                    Adicionar Novo Administrador
                </Typography>
            </Grid>
            <Grid item >
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
                                {/* Nome */}
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
                                                    error={touched.name && Boolean(errors.name)}
                                                    helperText={<ErrorMessage name="name" component={FormHelperText} />}
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            color: "#000",
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: "#000",
                                                        },
                                                        "& .MuiFormHelperText-root": {
                                                            color: "#d32f2f",
                                                        },
                                                        "& .MuiOutlinedInput-root": {
                                                            "&:hover fieldset": {
                                                                borderColor: "#ec500d", // Cor da borda ao passar o mouse
                                                            },
                                                        },
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormControl>
                                </Grid>

                                {/* Telefone */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <Field name="phone">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Telefone"
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    error={touched.phone && Boolean(errors.phone)}
                                                    helperText={<ErrorMessage name="phone" component={FormHelperText} />}
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            color: "#000",
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: "#000",
                                                        },
                                                        "& .MuiFormHelperText-root": {
                                                            color: "#d32f2f",
                                                        },
                                                        "& .MuiOutlinedInput-root": {
                                                            "&:hover fieldset": {
                                                                borderColor: "#ec500d", // Cor da borda ao passar o mouse
                                                            },
                                                        },
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormControl>
                                </Grid>

                                {/* Senha */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <Field name="senha">
                                            {({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Senha"
                                                    type="password"
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    error={touched.senha && Boolean(errors.senha)}
                                                    helperText={<ErrorMessage name="senha" component={FormHelperText} />}
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            color: "#000",
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: "#000",
                                                        },
                                                        "& .MuiFormHelperText-root": {
                                                            color: "#d32f2f",
                                                        },
                                                        "& .MuiOutlinedInput-root": {
                                                            "&:hover fieldset": {
                                                                borderColor: "#ec500d", // Cor da borda ao passar o mouse
                                                            },
                                                        },
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormControl>
                                </Grid>

                                {/* Botão de Enviar */}
                                <Grid item xs={12} >
                                    <Box sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: "space-between"
                                    }}>
                                        <Button
                                            variant="contained"
                                            LinkComponent={Link}
                                            href="/admin/administradores"
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
                                                    color: "#FF4D00",
                                                    border: `1px solid #FF4D00`,
                                                },
                                            }}
                                        >
                                            Voltar
                                        </Button>
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
                                                    color: "#FF4D00",
                                                    border: `1px solid #FF4D00`,
                                                },
                                            }}
                                        >
                                            Adicionar Administrador
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
};

export default AddNewAdmin;
