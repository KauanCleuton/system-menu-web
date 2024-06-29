import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, IconButton, InputAdornment, InputBase, InputLabel, TextField, Typography, useTheme } from "@mui/material"
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Image from 'next/image';
// import IconMessage from '@mui/icons-material/IconMessage'
import { MailOutlineOutlined, PhoneIphoneOutlined, SendOutlined } from '@mui/icons-material';
import ReactInputMask from 'react-input-mask';

const numberMask = '(99) 99999-9999';

const AuthLogin = ({ modal, setMode }) => {
    const theme = useTheme()

    const [phoneMask, setPhoneMask] = useState(numberMask);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        phone: "",
    });

    const handleInputChange = (e) => {
        const onlyDigits = e.target.value?.replace(/\D/g, '');
        console.log(onlyDigits);
        onlyDigits.length < 11
            && setPhoneMask(phoneMask)
        setData({ ...data, phone: onlyDigits });
    };

    const handleInputBlur = () => {
        if (data.phone?.replace(/\D/g, '').length === 11) {
            setPhoneMask(phoneMask);
        }
    };

    const validate = (values) => {
        const errors = {};

        if (!values.phone) {
            errors.phone = 'Campo obrigatório';
        }

        if (!values.password) {
            errors.password = 'Campo obrigatório';
        }

        return errors;
    };


    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <Grid container justifyContent="center" alignItems="center" spacing={{ xs: 1, md: 3 }} sx={{mb: {lg: 0, xs: 4}}}>
            <Grid item xs={12} >
                <Grid container >
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <Typography variant="titleLogin" fontWeight="400" lineHeight={"40px"} sx={{ color: '#FF4D00' }}>
                                    Login
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: '4px',
                                        alignItems: "flex-start"
                                    }}
                                >
                                    <Typography >
                                        Se você ainda não tem conta e deseja criar
                                    </Typography>
                                    <Button variant="text"
                                        sx={{
                                            textTransform: "inherit",
                                            p: 0,
                                            color: '#FF4D00'
                                        }}
                                        onClick={() => setMode("register")}
                                    >
                                        Registre-se aqui!
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Formik
                    initialValues={{ phone: '', password: '' }}
                    validate={validate}
                // onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} container spacing={1}>
                                <Grid item xs={12} container spacing={{ xs: 1, md: 4 }}>
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="phone" sx={{ color: "#FFF" }}>Telefone</InputLabel>
                                        <Field name="phone">
                                            {({ field, form }) => (
                                                <FormControl fullWidth error={Boolean(errors['cpfcnpj'])}>
                                                    <ReactInputMask
                                                        {...field}
                                                        mask={numberMask}
                                                        value={data.phone}
                                                        onChange={handleInputChange}
                                                        onBlur={handleInputBlur}
                                                        name="Telefone"
                                                    >
                                                        {(inputProps) => (
                                                            <InputBase
                                                                {...inputProps}
                                                                id="text"
                                                                type="text"
                                                                placeholder='Digite seu telefone'
                                                                sx={{
                                                                    mt: 1,
                                                                    borderRadius: '8px',
                                                                    // color: "#FF4D00",
                                                                    border: `2px solid #FF4D00`,
                                                                    p: 1,
                                                                    '&:hover': {
                                                                        borderColor: "#fff",
                                                                    },
                                                                    '&:focus': {
                                                                        borderColor: "#FF4D00",
                                                                    },
                                                                }}
                                                                InputProps={{
                                                                    sx: {
                                                                        py: 0.5,
                                                                        color: "#fff",
                                                                        '& input::placeholder': {
                                                                            color: "#fff",
                                                                        }
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

                                                    {form.errors.phone && form.touched.phone && (
                                                        <FormHelperText error>
                                                            {form.errors.phone}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="password" sx={{ color: "#FFF" }}>Senha</InputLabel>
                                        <Field name="password">
                                            {({ field, form }) => (
                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                    <InputBase
                                                        {...field}
                                                        id="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        variant="standard"
                                                        autoComplete="current-password"
                                                        placeholder="Insira sua senha"
                                                        sx={{
                                                            borderRadius: '8px',
                                                            // color: "#FF4D00",
                                                            border: `2px solid #FF4D00`,
                                                            p: 1,
                                                            '&:hover': {
                                                                borderColor: "#fff",
                                                            },
                                                            '&:focus': {
                                                                borderColor: "#FF4D00",
                                                            },
                                                        }}
                                                        InputProps={{
                                                            sx: {
                                                                py: 0.5,
                                                                color: "#fff",
                                                                '& input::placeholder': {
                                                                    color: "#fff",
                                                                }
                                                            },
                                                        }}
                                                        startAdornment={
                                                            <InputAdornment position="start">
                                                                <LockOutlinedIcon sx={{ color: "#FFF", width: 17, height: 17 }} />
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
                                                    {form.errors.password && form.touched.password && (
                                                        <FormHelperText error>{form.errors.password}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            )}
                                        </Field>

                                    </Grid>
                                </Grid>
                                <Grid item xs={12} >
                                    <Grid container direction="row" alignItems="center" justifyContent={"space-between"}>
                                        <Grid item>
                                            <FormGroup>
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
                                            </FormGroup>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="text"
                                                sx={{
                                                    textTransform: "inherit",
                                                    p: 0
                                                }}
                                                onClick={() => setMode("forgotPassword")}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        color: "#FFF",
                                                    }}>
                                                    Esqueceu a senha?
                                                </Typography>
                                            </Button>
                                        </Grid>
                                    </Grid>
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
                                        Entrar
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Grid>
        </Grid>
    )
}

export default AuthLogin