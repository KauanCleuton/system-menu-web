import React, { useState } from 'react';
import { Visibility, VisibilityOff, LockOutlined, Person, PhoneIphoneOutlined } from '@mui/icons-material';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Typography, useTheme, InputBase } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import ReactInputMask from 'react-input-mask';
import * as Yup from 'yup';
import { login, Signup } from '@/service/auth.service';

const numberMask = '(99) 99999-9999';

const AuthRegister = ({ setMode }) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegisterUser = async (values, { setSubmitting }) => {
        try {
            // Remover caracteres não numéricos do telefone
            const formattedValues = {
                ...values,
                phone: values.phone.replace(/\D/g, ''),
            };

            const response = await Signup(formattedValues);
            console.log(response.data);
            setMode("login");
        } catch (error) {
            console.error("Erro ao registrar usuário!", error);
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        phone: Yup.string().required('Campo obrigatório'),
        senha: Yup.string().required('Campo obrigatório')
    });

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 3 }} sx={{ mb: { lg: 0, xs: 4 } }}>
            <Grid item xs={12}>
                <Typography variant="titleLogin" fontWeight="400" lineHeight={"40px"} sx={{ color: '#FF4D00' }}>
                    Cadastrar
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Formik
                    initialValues={{ name: '', phone: '', senha: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleRegisterUser}
                >
                    {({ values, handleChange, handleBlur }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputBase
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Digite seu nome"
                                            sx={{
                                                mt: 1,
                                                borderRadius: '8px',
                                                border: `2px solid #FF4D00`,
                                                p: 1,
                                                '&:hover': {
                                                    borderColor: "#fff",
                                                },
                                                '&:focus': {
                                                    borderColor: "#FF4D00",
                                                },
                                            }}
                                            endAdornment={
                                                <InputAdornment position="start">
                                                    <Person sx={{ color: "#FFF", width: 17, height: 17 }} />
                                                </InputAdornment>
                                            }
                                        />
                                        <ErrorMessage name="name" component={FormHelperText} error />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <ReactInputMask
                                            mask={numberMask}
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            {(inputProps) => (
                                                <InputBase
                                                    id="phone"
                                                    name="phone"
                                                    type="text"
                                                    {...inputProps}
                                                    placeholder="Digite seu telefone"
                                                    sx={{
                                                        mt: 1,
                                                        borderRadius: '8px',
                                                        border: `2px solid #FF4D00`,
                                                        p: 1,
                                                        '&:hover': {
                                                            borderColor: "#fff",
                                                        },
                                                        '&:focus': {
                                                            borderColor: "#FF4D00",
                                                        },
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <PhoneIphoneOutlined sx={{ color: "#FFF", width: 17, height: 17 }} />
                                                        </InputAdornment>
                                                    }
                                                />
                                            )}
                                        </ReactInputMask>
                                        <ErrorMessage name="phone" component={FormHelperText} error />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputBase
                                            id="senha"
                                            name="senha"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.senha}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Insira sua senha"
                                            sx={{
                                                mt: 1,
                                                borderRadius: '8px',
                                                border: `2px solid #FF4D00`,
                                                p: 1,
                                                '&:hover': {
                                                    borderColor: "#fff",
                                                },
                                                '&:focus': {
                                                    borderColor: "#FF4D00",
                                                },
                                            }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <LockOutlined sx={{ color: "#FFF", width: 17, height: 17 }} />
                                                </InputAdornment>
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        {showPassword ? <Visibility sx={{ color: "#FFF", width: 17, height: 17 }} /> : <VisibilityOff sx={{ color: "#FFF", width: 17, height: 17 }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <ErrorMessage name="senha" component={FormHelperText} error />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    sx={{
                                                        color: "#FFF",
                                                        '&.Mui-checked': {
                                                            color: '#FF4D00',
                                                        },
                                                    }}
                                                />
                                            }
                                            label={<Typography variant="subtitle1" sx={{ color: "#FFF" }}>Lembrar-me</Typography>}
                                        />
                                        <Button
                                            variant="text"
                                            sx={{ textTransform: "inherit", p: 0 }}
                                            onClick={() => setMode("login")}
                                        >
                                            <Typography variant="subtitle1" sx={{ color: "#FFF" }}>
                                                Já tem conta?
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ width: "100%", mt: { xs: 0, md: '40px' }, mb: { xs: 0, md: '40px' } }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                bgcolor: "#ec500d",
                                                borderRadius: '5px',
                                                textTransform: 'inherit',
                                                width: '100%',
                                                fontSize: '18px',
                                                fontWeight: 400,
                                                color: "#fff",
                                                border: `1px solid #FF4D00`,
                                                ":hover": {
                                                    bgcolor: "transparent",
                                                    color: "#FF4D00"
                                                }
                                            }}
                                        >
                                            Cadastrar
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

export default AuthRegister;
