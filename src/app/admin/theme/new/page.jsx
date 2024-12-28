"use client"
import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography, FormControl } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { SET_ALERT } from '@/store/actions';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { ThemeService } from '@/service/theme.service';

const themeSv = new ThemeService()
const ThemePage = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [initialValues, setInitialValues] = useState({
        nameTheme: '',
        domain: typeof window !== "undefined" ? window.location.hostname : "",
        primary: '',
        secondary: '',
        logo: '',
        title: '',
        favicon: '',
        siteName: '',
        address: '',
        phone: '',
    });

    const router = useRouter()

    const validationSchema = Yup.object({
        nameTheme: Yup.string().required('Nome do tema é obrigatório'),
        domain: Yup.string().required('Domínio é obrigatório'),
        primary: Yup.string().required('Cor primária é obrigatória'),
        secondary: Yup.string().required('Cor secundária é obrigatória'),
        logo: Yup.string(),
        title: Yup.string().required('Título é obrigatório'),
        favicon: Yup.string(),
        siteName: Yup.string().required('Nome do site é obrigatório'),
        address: Yup.string().required('Endereço é obrigatório'),
        phone: Yup.string().required('Telefone é obrigatório'),
    });

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };


    const [colors, setColors] = useState({
        primary: initialValues.primary,
        secondary: initialValues.secondary,
    });

    const handleColorChange = (e) => {
        const { name, value } = e.target;
        setColors((prevColors) => ({
            ...prevColors,
            [name]: value,
        }));
    };


    const handleCreateNewTheme = async (values) => {
        try {
            setLoading(true)
            const response = await themeSv.postCreateTheme(values)

            dispatch({type: SET_ALERT, message: response.message, severity: 'error', alertType: 'tema'})


        } catch (error) {
            console.log(error)
            dispatch({type: SET_ALERT, message: 'Erro ao adicionar novo tema', severity: 'error', alertType: 'tema'})
        }
        finally {
            setLoading(false)
            router.replace("/admin/theme")
        }
    } 

    return loading ? <Loading/> : (
        <Box sx={{ width: '100%', height: '100%', p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }} >
                        <Typography variant='h4' sx={{
                            color: theme.palette.primary.main
                        }}>
                            Adicionar novo tema
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} display="flex" flexDirection="column" alignItems="center">
                            <Typography
                                sx={{
                                    color: theme.palette.secondary.main
                                }}
                                variant="h6"
                                gutterBottom
                            >
                                {colors.primary}
                            </Typography>
                            <Box
                                sx={{
                                    width: 150,
                                    height: 150,
                                    backgroundColor: colors.primary,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    borderRadius: 1,
                                    boxShadow: 1,
                                    border: '1px solid #000'
                                }}
                            >
                            </Box>
                        </Grid>

                        <Grid item xs={6} sm={6} display="flex" flexDirection="column" alignItems="center">
                            <Typography
                                sx={{
                                    color: theme.palette.secondary.main
                                }}
                                variant="h6"
                                gutterBottom
                            >
                                {colors.secondary}
                            </Typography>
                            <Box
                                sx={{
                                    width: 150,
                                    height: 150,
                                    backgroundColor: colors.secondary,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    borderRadius: 1,
                                    boxShadow: 1,
                                    border: '1px solid #000'
                                }}
                            >
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleCreateNewTheme(values)}
                    >
                        {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    {/* Nome do tema */}
                                    <Grid item xs={12} lg={6}>
                                        <Field
                                            name="nameTheme"
                                            as={TextField}
                                            label="Nome do Tema"
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.primary.dark,
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                            value={values.nameTheme}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.nameTheme && errors.nameTheme}
                                            error={touched.nameTheme && Boolean(errors.nameTheme)}
                                        />
                                    </Grid>

                                    {/* Domínio */}
                                    <Grid item xs={12} lg={6}>
                                        <Field
                                            name="domain"
                                            as={TextField}
                                            label="Domínio"
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.primary.dark,
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                            value={initialValues.domain}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.domain && errors.domain}
                                            error={touched.domain && Boolean(errors.domain)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} lg={6}>
                                        <Field
                                            name="primary"
                                            as={TextField}
                                            label="Cor Primária"
                                            type="color"
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.primary.dark,
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                            value={values.primary}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleColorChange(e);  // Atualiza a cor primária no estado
                                            }}
                                            onBlur={handleBlur}
                                            helperText={touched.primary && errors.primary}
                                            error={touched.primary && Boolean(errors.primary)}
                                        />
                                    </Grid>

                                    {/* Cor secundária */}
                                    <Grid item xs={12} lg={6}>
                                        <Field
                                            name="secondary"
                                            as={TextField}
                                            label="Cor Secundária"
                                            type="color"
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.primary.dark,
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                            value={values.secondary}
                                            onChange={(e) => {
                                                handleChange(e);
                                                handleColorChange(e);  // Atualiza a cor secundária no estado
                                            }}
                                            onBlur={handleBlur}
                                            helperText={touched.secondary && errors.secondary}
                                            error={touched.secondary && Boolean(errors.secondary)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                type="file"
                                                variant="outlined"
                                                margin="normal"
                                                label="Logo"
                                                fullWidth
                                                onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const base64 = await toBase64(file);
                                                        setFieldValue("logo", base64);
                                                    }
                                                }}
                                                helperText={<ErrorMessage name="logo" />}
                                                error={touched.logo && Boolean(errors.logo)}
                                                InputProps={{
                                                    inputProps: {
                                                        sx: {
                                                            flexShrink: false,
                                                        },
                                                    },
                                                }}
                                                
                                                sx={{
                                                    "& .MuiInputBase-input": {
                                                        color: theme.palette.secondary.main,
                                                    },
                                                    "& .MuiFormLabel-root": {
                                                        color: theme.palette.secondary.main,
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "& fieldset": {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                        "&:hover fieldset": {
                                                            borderColor: theme.palette.primary.dark,
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                    },
                                                    "& .MuiFormHelperText-root": {
                                                        color: theme.palette.primary.main,
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                type="file"
                                                variant="outlined"
                                                margin="normal"
                                                label="Favicon"
                                                fullWidth
                                                onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const base64 = await toBase64(file);
                                                        setFieldValue("favicon", base64);
                                                    }
                                                }}
                                                helperText={<ErrorMessage name="favicon" />}
                                                error={touched.favicon && Boolean(errors.favicon)}
                                                InputProps={{
                                                    inputProps: {
                                                        sx: {
                                                            flexShrink: false,
                                                        },
                                                    },
                                                }}
                                                
                                                sx={{
                                                    "& .MuiInputBase-input": {
                                                        color: theme.palette.secondary.main,
                                                    },
                                                    "& .MuiFormLabel-root": {
                                                        color: theme.palette.secondary.main,
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                        "& fieldset": {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                        "&:hover fieldset": {
                                                            borderColor: theme.palette.primary.dark,
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: theme.palette.primary.main,
                                                        },
                                                    },
                                                    "& .MuiFormHelperText-root": {
                                                        color: theme.palette.primary.main,
                                                    },
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={12} lg={6}>
                                        <Field
                                            name="title"
                                            as={TextField}
                                            label="Título"
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.primary.dark,
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.title && errors.title}
                                            error={touched.title && Boolean(errors.title)}
                                        />
                                    </Grid>


                                    <Grid item xs={12} lg={6}>
                                        <Field
                                            name="siteName"
                                            as={TextField}
                                            label="Nome do Site"
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.primary.dark,
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                            value={values.siteName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.siteName && errors.siteName}
                                            error={touched.siteName && Boolean(errors.siteName)}
                                        />
                                    </Grid>

                                    {/* Endereço */}
                                    <Grid item xs={12} lg={6}>
                                        <Field
                                            name="address"
                                            as={TextField}
                                            label="Endereço"
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.primary.dark,
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.address && errors.address}
                                            error={touched.address && Boolean(errors.address)}
                                        />
                                    </Grid>

                                    {/* Telefone */}
                                    <Grid item xs={12} lg={6}>
                                        <Field
                                            name="phone"
                                            as={TextField}
                                            label="Telefone"
                                            fullWidth
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputBase-input": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiFormLabel-root": {
                                                    color: theme.palette.secondary.main,
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: theme.palette.primary.dark,
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: theme.palette.primary.main,
                                                    },
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.phone && errors.phone}
                                            error={touched.phone && Boolean(errors.phone)}
                                        />
                                    </Grid>

                                    {/* Botão de submit */}
                                    <Grid item xs={12}>
                                        <Box sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: "space-between"
                                        }}>
                                            <Button LinkComponent={Link} href='/admin/theme' variant="outlined" color="primary" >
                                                Voltar
                                            </Button>

                                            <Button type="submit" variant="contained" color="primary" >
                                                Salvar Tema
                                            </Button>
                                        </Box>
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

export default ThemePage;
