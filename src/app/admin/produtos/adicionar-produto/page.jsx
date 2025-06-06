"use client";
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { TextField, Button, Grid, FormControl, FormHelperText, Typography, Box, useTheme, Autocomplete, Modal } from '@mui/material';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import ProductsSv from '@/service/productsAdmin.service';
import Image from 'next/image';
import CategoryService from '@/service/categories.service';
import { SET_ALERT } from '@/store/actions';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import CategoryComponent from '@/components/CategoryComponent';
import ButtonOption from '@/components/ButtonOption';


const validationSchema = Yup.object({
    category_id: Yup.string().required('Categoria é obrigatória'),
    title: Yup.string().required('Título é obrigatório'),
    description: Yup.string().required('Descrição é obrigatória'),
    price: Yup.number().required('Preço é obrigatório').min(0, 'Preço deve ser maior que 0'),
    file_url: Yup.string().nullable(),
    quantity: Yup.number().required('Quantidade é obrigatória'),
});

const ProductSv = new ProductsSv();
const CategorySv = new CategoryService()
const AddNewAdmin = () => {
    const [loading, setLoading] = useState(false)

    const theme = useTheme();
    const dispatch = useDispatch();
    const router = useRouter()
    const [fileBase64, setFileBase64] = useState('');
    const [categories, setCategories] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [file, setFile] = useState(null)
    
    const handleSubmit = async (values) => {
        const form = new FormData()

        try {
            form.append("file", file)
            form.append("category_id", values.category_id)
            form.append("title", values.title)
            form.append("description", values.description)
            form.append("price", values.price)
            form.append("quantity", values.quantity)

            setLoading(true)
            const response = await ProductSv.postCreateNewProduct(form)
            dispatch({ type: SET_ALERT, message: 'Produto adicionado com sucesso!', severity: 'success', alertType: 'category' });
            setTimeout(() => {
                router.push('/admin/produtos');
            }, 3000);
        } catch (error) {
            console.error('Error ao criar novo administrador!', error);
            dispatch({ type: SET_ALERT, message: 'Erro ao adicionar novo produto!', severity: 'error', type: 'category' });
        }
        finally {
            setLoading(false)
        }
    };

    const getData = async () => {
        try {
            const category = await CategorySv.getAllCategories()
            setCategories(category)
            console.log(category, '9239123929239')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleOpenModalCreate = () => {
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFileBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitCreateCategory = async (values) => {
        try {
            const response = await CategorySv.postCreateCategory(values);
            console.log(response.message);
            dispatch({ type: SET_ALERT, message: response.message, severity: "success", alertType: "category" });
            setOpenModal(false)
            setLoading(true)
        } catch (error) {
            console.error("Error ao editar novo uma categoria", error);
            dispatch({ type: SET_ALERT, message: error.message, severity: "error", alertType: "category" });
        }
        finally {
            setLoading(false)
            getData()
        }
    };

    return loading ? <Loading /> : (
        <>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <CategoryComponent
                    functionStates={'create'}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitCreateCategory}
                />
            </Modal>
            <Box sx={{ width: '100%', height: 'auto' }}>
                <Grid container spacing={2} direction='column' py={1}>
                    <Grid item xs={12}>
                        <Typography
                            variant='h2'
                            sx={{
                                color: theme.palette.secondary.main,
                                textAlign: 'center',
                                fontSize: { lg: '40px', md: '34px', sm: '30px', xs: '25px' },
                            }}
                        >
                            Adicionar Novo Produto
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
                                <Image alt='Imagem do Produto' src={fileBase64} layout='fill' style={{ objectFit: 'contain' }} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Formik
                            initialValues={{ category_id: '', title: '', description: '', price: '', file_url: '', quantity: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                handleSubmit(values);
                            }}
                        >
                            {({ handleChange, handleBlur, values, touched, errors, setFieldValue }) => (
                                <Form>
                                    <Grid container spacing={3}>
                                        {/* Upload de Arquivo */}
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
                                                        "& .MuiInputBase-input": { color: theme.palette.secondary.main },
                                                        "& .MuiFormLabel-root": { color: theme.palette.secondary.main },
                                                        "& .MuiFormHelperText-root": { color: theme.palette.primary.main },
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
                                                            noOptionsText={<ButtonOption title="Criar Categoria" handleOpen={handleOpenModalCreate} />}
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
                                                                        "& .MuiFormHelperText-root": { color: theme.palette.primary.main },
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
                                                                    backgroundColor: theme.palette.primary.main,
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
                                                                "& .MuiFormHelperText-root": { color: theme.palette.primary.main },
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} lg={4} md={4} sm={12}>
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
                                                                "& .MuiFormHelperText-root": { color: theme.palette.primary.main },
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} lg={4} md={4} sm={12}>
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
                                                                "& .MuiInputBase-input": { color: theme.palette.primary.main },
                                                                "& .MuiFormLabel-root": { color: theme.palette.primary.main },
                                                                "& .MuiFormHelperText-root": { color: theme.palette.primary.main },
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} lg={4} md={4} sm={12}>
                                            <FormControl fullWidth>
                                                <Field name="quantity">
                                                    {({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            label="Quantidade"
                                                            type="number"
                                                            variant="outlined"
                                                            margin="normal"
                                                            fullWidth
                                                            error={touched.quantity && Boolean(errors.quantity)}
                                                            helperText={<ErrorMessage name="quantity" component={FormHelperText} />}
                                                            sx={{
                                                                "& .MuiInputBase-input": { color: theme.palette.primary.main },
                                                                "& .MuiFormLabel-root": { color: theme.palette.primary.main },
                                                                "& .MuiFormHelperText-root": { color: theme.palette.primary.main },
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
                                                    Adicionar
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
                    </Grid>
                </Grid>
            </Box>
        </>

    );
};

export default AddNewAdmin;
