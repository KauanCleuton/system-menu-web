import React, { useState } from 'react';
import { Visibility, VisibilityOff, LockOutlined, Person, PhoneIphoneOutlined } from '@mui/icons-material';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Typography, useTheme, InputBase } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import ReactInputMask from 'react-input-mask';
import * as Yup from 'yup';
import { login, Signup } from '@/service/auth.service';
import { SET_ALERT, SET_LOGIN_DATA, SET_LOGIN_MENU, showAlert } from '@/store/actions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const numberMask = '(99) 99999-9999';

const AuthRegister = ({ setMode }) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const router = useRouter()

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formattedValues = {
                ...values,
                phone: values.phone.replace(/\D/g, ''),
            };


            const response = await Signup(formattedValues);


            const { accessToken, refreshToken, role, message } = response.data.data;
            console.log(accessToken, refreshToken, role, message)
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("role", role)
            console.log(response.data, '11')
            console.log(response, 123232939239291392n)
            dispatch({ type: SET_ALERT, message: message, severity: "success", alertType: "user" })
            dispatch({ type: SET_LOGIN_DATA })
            closeModal();
        } catch (error) {
            dispatch({ type: SET_ALERT, message: 'Erro ao fazer login! Tente Novamente', severity: "error", alertType: "user" })
            console.error("Erro ao fazer login!", error);
        } finally {
            setSubmitting(false);
        }
    };

    const closeModal = () => {
        dispatch({ type: SET_LOGIN_MENU, opened: false });
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        phone: Yup.string().required('Campo obrigatório'),
        senha: Yup.string().required('Campo obrigatório')
    });

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 3 }} sx={{ mb: { lg: 2, xs: 4 } }}>
            <Grid item xs={12}>
                <Typography variant="titleLogin" fontWeight="400" lineHeight={"40px"} sx={{ color: theme.palette.primary.main }}>
                    Cadastrar
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Formik
                    initialValues={{ name: '', phone: '', senha: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
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
                                                border: `2px solid ${theme.palette.primary.main}`,
                                                p: 1,
                                                '&:hover': {
                                                    borderColor: "#fff",
                                                },
                                                '&:focus': {
                                                    borderColor: theme.palette.primary.main,
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
                                                        border: `2px solid ${theme.palette.primary.main}`,
                                                        p: 1,
                                                        '&:hover': {
                                                            borderColor: "#fff",
                                                        },
                                                        '&:focus': {
                                                            borderColor: theme.palette.primary.main,
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
                                                border: `2px solid ${theme.palette.primary.main}`,
                                                p: 1,
                                                '&:hover': {
                                                    borderColor: "#fff",
                                                },
                                                '&:focus': {
                                                    borderColor: theme.palette.primary.main,
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
                                                            color: theme.palette.primary.main,
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
                                    <Box sx={{ width: "100%" }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                borderRadius: '5px',
                                                textTransform: 'inherit',
                                                width: '100%',
                                                fontSize: '18px',
                                                fontWeight: 400,
                                                color: "#fff",
                                                border: `1px solid ${theme.palette.primary.main}`,
                                                ":hover": {
                                                    bgcolor: "transparent",
                                                    color: theme.palette.primary.main
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
