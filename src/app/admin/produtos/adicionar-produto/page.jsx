"use client";
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { TextField, Button, Grid, FormControl, FormHelperText, Typography, Box, InputAdornment, IconButton, useTheme, Autocomplete } from '@mui/material';
import Link from 'next/link';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import AdminService from '@/service/admin.service';
import { useRouter } from 'next/navigation';
import { SET_ALERT } from '@/store/actions';
import Image from 'next/image';
import ProductsSv from '@/service/productsAdmin.service';

// Validação com Yup
const validationSchema = Yup.object({
    category_id: Yup.string().required('Categoria é obrigatória'),
    title: Yup.string().required('Título é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    price: Yup.number().required('Preço é obrigatório').min(0, 'Preço deve ser maior que 0'),
    file_url: Yup.string().required('Arquivo é obrigatório'),
});

const categories = [
    { id: '1', name: 'Categoria 1' },
    { id: '2', name: 'Categoria 2' },
    { id: '3', name: 'Categoria 3' },
];

const ProductSv = new ProductsSv()

const AddNewAdmin = () => {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const [fileBase64, setFileBase64] = useState('');

    const handleSubmit = async (values) => {
        const newValues = {
            ...values,
            file_url: fileBase64,
        };
        try {
            const response = await ProductSv.postCreateNewProduct(newValues)
            console.log(response.message);
            dispatch({ type: SET_ALERT, message: response.message, severity: 'success', type: 'category' });
            setTimeout(() => {
                router.push('/admin/administradores');
            }, 3000);
        } catch (error) {
            console.error('Error ao criar novo administrador!', error);
            dispatch({ type: SET_ALERT, message: error.message, severity: 'error', type: 'category' });
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFileBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{
            width: '100%',
            height: 'auto'
        }}>
            <Grid container spacing={2} direction='column' py={1}>
                <Grid item xs={12}>
                    <Typography
                        variant='h2'
                        sx={{
                            color: '#000',
                            textAlign: 'center',
                            fontSize: { lg: '40px', md: '34px', sm: '30px', xs: '25px' },
                        }}
                    >
                        Adicionar Novo Administrador
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Box sx={{
                            position: 'relative',
                            width: 200,
                            height: 200,
                            borderRadius: '8px',
                            boxShadow: 1,
                            // bgcolor: '#141414',
                        }}>
                            <Image alt='Imagem do Produto' src={fileBase64} layout='fill' style={{
                                objectFit: 'contain'
                            }} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{ category_id: '', title: '', description: '', price: '', file_url: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleSubmit(values);
                        }}
                    >
                        {({ handleChange, handleBlur, values, touched, errors, setFieldValue }) => (
                            <Form>
                                <Grid container spacing={3}>
                                    {/* Categoria */}
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <TextField
                                                type="file"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                onChange={handleFileChange}
                                                error={touched.file_url && Boolean(errors.file_url)}
                                                helperText={<ErrorMessage name="file_url" component={FormHelperText} />}
                                                sx={{
                                                    "& .MuiInputBase-input": { color: '#000' },
                                                    "& .MuiFormLabel-root": { color: '#000' },
                                                    "& .MuiFormHelperText-root": { color: '#d32f2f' },
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={6} md={6} sm={12}>
                                        <FormControl fullWidth>
                                            <Field name="category_id">
                                                {({ field }) => (
                                                    <Autocomplete
                                                        value={categories.find(option => option.id === field.value) || null}
                                                        options={categories}
                                                        getOptionLabel={(option) => option.name}
                                                        onChange={(event, value) => setFieldValue('category_id', value?.id || '')}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Categoria"
                                                                variant="outlined"
                                                                margin="normal"
                                                                error={touched.category_id && Boolean(errors.category_id)}
                                                                helperText={<ErrorMessage name="category_id" component={FormHelperText} />}
                                                                sx={{
                                                                    "& .MuiInputBase-input": { color: '#000' },
                                                                    "& .MuiFormLabel-root": { color: '#000' },
                                                                    "& .MuiFormHelperText-root": { color: '#d32f2f' },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                )}
                                            </Field>

                                        </FormControl>
                                    </Grid>

                                    {/* Título */}
                                    <Grid item xs={12} lg={6} md={6} sm={12}>
                                        <FormControl fullWidth>
                                            <Field name="title">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Título"
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        error={touched.title && Boolean(errors.title)}
                                                        helperText={<ErrorMessage name="title" component={FormHelperText} />}
                                                        sx={{
                                                            "& .MuiInputBase-input": { color: '#000' },
                                                            "& .MuiFormLabel-root": { color: '#000' },
                                                            "& .MuiFormHelperText-root": { color: '#d32f2f' },
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormControl>
                                    </Grid>

                                    {/* Descrição */}
                                    <Grid item xs={12} lg={6} md={6} sm={12}>
                                        <FormControl fullWidth>
                                            <Field name="description">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Descrição"
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        error={touched.description && Boolean(errors.description)}
                                                        helperText={<ErrorMessage name="description" component={FormHelperText} />}
                                                        sx={{
                                                            "& .MuiInputBase-input": { color: '#000' },
                                                            "& .MuiFormLabel-root": { color: '#000' },
                                                            "& .MuiFormHelperText-root": { color: '#d32f2f' },
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormControl>
                                    </Grid>

                                    {/* Preço */}
                                    <Grid item xs={12} lg={6} md={6} sm={12}>
                                        <FormControl fullWidth>
                                            <Field name="price">
                                                {({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Preço"
                                                        type="number"
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                        error={touched.price && Boolean(errors.price)}
                                                        helperText={<ErrorMessage name="price" component={FormHelperText} />}
                                                        sx={{
                                                            "& .MuiInputBase-input": { color: '#000' },
                                                            "& .MuiFormLabel-root": { color: '#000' },
                                                            "& .MuiFormHelperText-root": { color: '#d32f2f' },
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormControl>
                                    </Grid>

                                    {/* Upload de Arquivo */}


                                    {/* Botão de Enviar */}
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                LinkComponent={Link}
                                                href="/admin/administradores"
                                                sx={{
                                                    bgcolor: '#ec500d',
                                                    borderRadius: '5px',
                                                    textTransform: 'inherit',
                                                    fontSize: '18px',
                                                    fontWeight: 400,
                                                    color: '#fff',
                                                    border: `1px solid #FF4D00`,
                                                    ':hover': {
                                                        bgcolor: 'transparent',
                                                        color: '#FF4D00',
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
                                                    bgcolor: '#ec500d',
                                                    borderRadius: '5px',
                                                    textTransform: 'inherit',
                                                    fontSize: '18px',
                                                    fontWeight: 400,
                                                    color: '#fff',
                                                    border: `1px solid #FF4D00`,
                                                    ':hover': {
                                                        bgcolor: 'transparent',
                                                        color: '#FF4D00',
                                                        border: `1px solid #FF4D00`,
                                                    },
                                                }}
                                            >
                                                Adicionar
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

export default AddNewAdmin;
