"use client";
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { TextField, Button, Grid, FormControl, FormHelperText, Typography, Box, InputAdornment, IconButton, useTheme } from '@mui/material';
import Link from 'next/link';
import { PhoneIphoneOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import AdminService from '@/service/admin.service';
import { useRouter } from 'next/navigation';
import { SET_ALERT } from '@/store/actions';

// Validação com Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    phone: Yup.string()
        .required('Telefone é obrigatório')
        .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido. Deve estar no formato correto'),
    senha: Yup.string()
        .required('Senha é obrigatória')
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

const AdminSv = new AdminService()
const AddNewAdmin = () => {
    const theme = useTheme()
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const formatPhoneNumber = (phone) => {
        return phone.replace(/\D/g, '');
    };
    const handleSubmit = async (values) => {
        const newValues = {
            phone: formatPhoneNumber(values.phone),
            ...values
        }
        try {
            const response = await AdminSv.createNewAdmin(newValues)
            console.log(response.message)
            dispatch({type: SET_ALERT, message: response.message, severity: "success", alertType: "admin"})
            setTimeout(() => {
                router.push("/admin/administradores")
            }, 3000)
        } catch (error) {
            console.error("Error ao criar novo administrador!", error)
            dispatch({type: SET_ALERT, message: error.message, severity: "error", alertType: "admin"})
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Grid container spacing={2} direction='column' py={1}>
            <Grid item>
                <Typography variant='h2' sx={{ color: theme.palette.secondary.main, textAlign: "center", fontSize: {lg: '40px', md: '34px', sm: '30px', xs: '25px'} }}>
                    Adicionar Novo Administrador
                </Typography>
            </Grid>
            <Grid item>
                <Formik
                    initialValues={{ name: '', phone: '', senha: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ handleChange, handleBlur, values, touched, errors, setFieldValue }) => (
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
                                                            color: theme.palette.secondary.main,
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: theme.palette.secondary.main,
                                                        },
                                                        "& .MuiFormHelperText-root": {
                                                            color: theme.palette.primary.main,
                                                        },
                                                        "& .MuiOutlinedInput-root": {
                                                            "&:hover fieldset": {
                                                                borderColor: theme.palette.primary.main,
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
                                                <InputMask
                                                    mask="(99) 99999-9999"
                                                    value={field.value}
                                                    onChange={(e) => setFieldValue('phone', e.target.value)} // Certifique-se de passar o valor correto para o Formik
                                                    onBlur={handleBlur}
                                                >
                                                    {() => (
                                                        <TextField
                                                            label="Número de Telefone"
                                                            variant="outlined"
                                                            margin="normal"
                                                            fullWidth
                                                            error={touched.phone && Boolean(errors.phone)}
                                                            helperText={touched.phone && errors.phone ? errors.phone : ''}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <PhoneIphoneOutlined sx={{ color: theme.palette.primary.white, width: 17, height: 17 }} />
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
                                                                "& .MuiOutlinedInput-root": {
                                                                    "&:hover fieldset": {
                                                                        borderColor: theme.palette.primary.main,
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                </InputMask>
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
                                                    type={showPassword ? 'text' : "password"}
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position='end' >
                                                                <IconButton onClick={handleShowPassword} sx={{
                                                                    color: theme.palette.primary.main
                                                                }}>
                                                                    {showPassword ? <Visibility sx={{width: 20, height: 20}} /> : <VisibilityOff sx={{width: 20, height: 20}} />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    error={touched.senha && Boolean(errors.senha)}
                                                    helperText={<ErrorMessage name="senha" component={FormHelperText} />}
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
                                                        "& .MuiOutlinedInput-root": {
                                                            "&:hover fieldset": {
                                                                borderColor: theme.palette.primary.main,
                                                            },
                                                        },
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormControl>
                                </Grid>

                                {/* Botão de Enviar */}
                                <Grid item xs={12}>
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
                                                bgcolor: theme.palette.primary.main,
                                                borderRadius: '5px',
                                                textTransform: 'inherit',
                                                fontSize: '18px',
                                                fontWeight: 400,
                                                color: theme.palette.primary.white,
                                                border: `1px solid ${theme.palette.primary.main}`,
                                                ":hover": {
                                                    bgcolor: "transparent",
                                                    color: theme.palette.primary.main,
                                                    border: `1px solid ${theme.palette.primary.main}`,
                                                },
                                            }}
                                        >
                                            Voltar
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                borderRadius: '5px',
                                                textTransform: 'inherit',
                                                fontSize: '18px',
                                                fontWeight: 400,
                                                color: theme.palette.primary.white,
                                                border: `1px solid ${theme.palette.primary.main}`,
                                                ":hover": {
                                                    bgcolor: "transparent",
                                                    color: theme.palette.primary.main,
                                                    border: `1px solid ${theme.palette.primary.main}`,
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
