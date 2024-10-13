"use client";
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { TextField, Button, Grid, FormControl, FormHelperText, Typography, Box, useTheme, Autocomplete } from '@mui/material';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import ProductsSv from '@/service/productsAdmin.service';
import Image from 'next/image';
import CategoryService from '@/service/categories.service';
import { SET_ALERT } from '@/store/actions';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

const validationSchema = Yup.object({
    category_id: Yup.string().required('Categoria é obrigatória'),
    title: Yup.string().required('Título é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    price: Yup.number().required('Preço é obrigatório').min(0, 'Preço deve ser maior que 0'),
    file_url: Yup.string().nullable(),
});

const ProductSv = new ProductsSv();
const CategorySv = new CategoryService();

const EditProduct = () => {
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();
    const theme = useTheme();
    const dispatch = useDispatch();
    const router = useRouter();
    const [fileBase64, setFileBase64] = useState('');
    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState(null); // Armazena os dados do produto

    const handleSubmit = async (values) => {
        const newValues = {
            ...values,
            file_url: fileBase64.split(",")[1],
        };

        try {
            setLoading(true);
            await ProductSv.putEditProductById(slug, newValues);
            dispatch({ type: SET_ALERT, message: 'Produto editado com sucesso!', severity: 'success', alertType: 'product' });
            setTimeout(() => {
                router.push('/admin/produtos');
            }, 3000);
        } catch (error) {
            console.error('Error ao editar produto!', error);
            dispatch({ type: SET_ALERT, message: 'Erro ao editar o produto!', severity: 'error', type: 'product' });
        } finally {
            setLoading(false);
        }
    };

    const getData = async () => {
        try {
            setLoading(true)
            const category = await CategorySv.getAllCategories();
            const product = await ProductSv.getProductsById(slug);
            setCategories(category);
            setProductData(product); // Define o produto
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getData();
    }, [slug]);

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

    return loading ? <Loading /> : (
        <Box sx={{ width: '100%', height: 'auto' }}>
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
                        Editar Produto
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Box
                            sx={{
                                position: 'relative',
                                width: 200,
                                height: 200,
                                borderRadius: '8px',
                                boxShadow: 1,
                            }}
                        >
                            <Image alt='Imagem do Produto' src={fileBase64 || productData?.file_url} layout='fill' style={{ objectFit: 'contain' }} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {productData && (
                        <Formik
                            initialValues={{
                                category_id: productData.category_id || '',
                                title: productData.title || '',
                                description: productData.description || '',
                                price: productData.price || '',
                                file_url: productData.file_url || '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ handleChange, handleBlur, values, touched, errors, setFieldValue }) => (
                                <Form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    type="file"
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    onChange={handleFileChange}
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
                                                            value={categories.find(option => option.idCategory === field.value) || null}
                                                            options={categories}
                                                            getOptionLabel={(option) => option.name}
                                                            onChange={(event, value) => {
                                                                setFieldValue('category_id', value ? value.idCategory : '');
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="Categoria"
                                                                    variant="outlined"
                                                                    margin="normal"
                                                                    error={touched.category_id && Boolean(errors.category_id)}
                                                                    helperText={<ErrorMessage name="category_id" component={FormHelperText} />}
                                                                    sx={{
                                                                        "& .MuiInputBase-input": { color: theme.palette.primary.main },
                                                                        "& .MuiFormLabel-root": { color: theme.palette.primary.main },
                                                                        "& .MuiFormHelperText-root": { color: '#d32f2f' },
                                                                    }}
                                                                />
                                                            )}
                                                            renderOption={(props, option) => (
                                                                <Box {...props} key={option.idCategory}>
                                                                    <Typography color={theme.palette.primary.main}>
                                                                        {option.name}
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                            sx={{
                                                                '& .MuiAutocomplete-option': {
                                                                    backgroundColor: '#fff',
                                                                    color: theme.palette.primary.main,
                                                                },
                                                                '& .MuiAutocomplete-option.Mui-focused': {
                                                                    backgroundColor: '#ec500d',
                                                                    color: '#fff',
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </FormControl>
                                        </Grid>
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
                                                                "& .MuiInputBase-input": { color: theme.palette.primary.main },
                                                                "& .MuiFormLabel-root": { color: theme.palette.primary.main },
                                                                "& .MuiFormHelperText-root": { color: '#d32f2f' },
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </FormControl>
                                        </Grid>
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
                                                                "& .MuiInputBase-input": { color: theme.palette.primary.main },
                                                                "& .MuiFormLabel-root": { color: theme.palette.primary.main },
                                                                "& .MuiFormHelperText-root": { color: '#d32f2f' },
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} lg={6} md={6} sm={12}>
                                            <FormControl fullWidth>
                                                <Field name="price">
                                                    {({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            label="Preço"
                                                            variant="outlined"
                                                            margin="normal"
                                                            fullWidth
                                                            type="text"
                                                            error={touched.price && Boolean(errors.price)}
                                                            helperText={<ErrorMessage name="price" component={FormHelperText} />}
                                                            sx={{
                                                                "& .MuiInputBase-input": { color: theme.palette.primary.main },
                                                                "& .MuiFormLabel-root": { color: theme.palette.primary.main },
                                                                "& .MuiFormHelperText-root": { color: '#d32f2f' },
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    flexDirection: "row-reverse",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    sx={{
                                                        backgroundColor: theme.palette.primary.main,
                                                        '&:hover': {
                                                            backgroundColor: theme.palette.primary.dark,
                                                        },
                                                    }}
                                                >
                                                    Editar Produto
                                                </Button>
                                                <Link href='/admin/produtos' passHref>
                                                    <Button variant="outlined">Voltar</Button>
                                                </Link>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default EditProduct;
