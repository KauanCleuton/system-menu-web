"use client";
import Loading from "@/app/loading";
import CardProduct from "@/components/CardProduct";
import Paginator from "@/components/Paginator";
import TableProducts from "@/components/TableProducts";
import TableUsersByRole from "@/components/TableUsersByRole";
import VerticalToggleButtons from "@/components/ToggleButton";
import AdminService from "@/service/admin.service";
import ProductsSv from "@/service/productsAdmin.service";
import { SET_ALERT } from "@/store/actions";
import { AdminPanelSettings, Inventory, PersonAddOutlined, PersonSearchOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, TextField, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductSv = new ProductsSv()
const Produtos = () => {
    const theme = useTheme()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const limit = 4;
    const [name, setName] = useState("")
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const [view, setView] = useState('list');

    const handleChange = (event, nextView) => {
        setView(nextView || view);
    };

    const getData = async () => {
        try {
            setLoading(true)
            const produtos = await ProductSv.getAllProducts()
            setData(produtos)
            console.log(produtos)
            dispatch({ type: SET_ALERT, message: produtos.length > 0 ? `${produtos.length} produtos cadastrados!` : 'Nenhum produto cadastrado!', severity: 'success', alertType: 'product' })
        } catch (error) {
            console.error("Erro ao buscar produtos", error)
        }
        finally {
            setLoading(false)
        }
    }

    const toggleVisible = async (id) => {
        try {
            setData((prevProducts) =>
                prevProducts.map((product) =>
                    product.idProducts === id
                        ? { ...product, isVisible: !product.isVisible }
                        : product
                )
            );

            const response = await ProductSv.editVisibleProductsById(id);
            console.log(response, '23821382183821388')
            dispatch({
                type: SET_ALERT,
                message: response.isVisible ? 'Produto visível no menu' : 'Produto oculto no menu',
                severity: 'success',
                alertType: 'product',
            });
        } catch (error) {
            setData((prevProducts) =>
                prevProducts.map((product) =>
                    product.idProducts === id
                        ? { ...product, isVisible: !product.isVisible }
                        : product
                )
            );
            console.error('Erro ao atualizar a visibilidade do produto', error);
        }
    };


    useEffect(() => {
        getData()
    }, [])


    const handleSearchByName = async () => {
        try {
            setLoading(true)
            const searchProduct = await ProductSv.getProductsByName(name)
            setData(searchProduct)
            console.log(searchProduct)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleDeleteProductById = async (id) => {
        try {
            setLoading(true)
            const response = await ProductSv.deleteProductById(id)
            console.log(response)
            dispatch({
                type: SET_ALERT,
                message: 'Produto deletado com sucesso!',
                severity: 'success',
                alertType: 'product'
            })
        } catch (error) {
            console.error("Erro ao deletar administrador.", error)
            dispatch({
                type: SET_ALERT,
                message: error.message || 'Erro ao deletar administrador.',
                severity: 'error',
                alertType: 'product'
            })
        }
        finally {
            setLoading(false)
            getData()
        }
    }

    return (
        <Box sx={{
            width: '100%',
            height: 'auto'
        }}>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item lg={8} xs={12}>
                            <TextField
                                id="search-admin"
                                label="Buscar Admin pelo nome"
                                placeholder="Buscar Admin pelo nome"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-input": {
                                        color: "#000"
                                    },
                                    "& .MuiFormLabel-root": {
                                        color: "#000"
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: theme.palette.primary.main
                                        },
                                        "&:hover fieldset": {
                                            borderColor: theme.palette.primary.dark
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: theme.palette.primary.main
                                        }
                                    },
                                    "& .MuiFormHelperText-root": {
                                        color: "#d32f2f"
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 2
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        color: theme.palette.secondary.white,
                                        bgcolor: theme.palette.primary.main,
                                        textTransform: "none",
                                        py: 1,
                                        fontSize: '13px',
                                        border: `1px solid ${theme.palette.primary.main}`,
                                        ":hover": {
                                            bgcolor: "transparent",
                                            color: theme.palette.primary.main,
                                        },
                                        px: 3
                                    }}
                                    onClick={handleSearchByName}
                                >
                                    Buscar
                                    <Inventory sx={{ ml: 1, width: 20, height: 20 }} />
                                </Button>
                                <Button
                                    variant="contained"
                                    LinkComponent={Link}
                                    href="/admin/produtos/adicionar-produto"
                                    sx={{
                                        color: theme.palette.secondary.white,
                                        bgcolor: theme.palette.primary.main,
                                        textTransform: "none",
                                        py: 1,
                                        fontSize: '13px',
                                        border: `1px solid ${theme.palette.primary.main}`,
                                        ":hover": {
                                            bgcolor: "transparent",
                                            color: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    Novo Produto
                                    <Inventory sx={{ ml: 1, width: 20, height: 20 }} />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: "flex-end"
                    }}>
                        <VerticalToggleButtons handleChange={handleChange} view={view} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={0} p={2}>
                        {view === 'list' ? (
                            <Grid item xs={12}>
                                <Grid container component={Paper} elevation={1}>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                py: 2,
                                                px: 1,
                                                bgcolor: theme.palette.secondary.main,
                                                borderRadius: '6px 6px 0 0',
                                            }}
                                        >
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                {['Imagem', 'Título', 'Descrição', 'Preço', 'Categoria', 'Ações'].map((header, index) => (
                                                    <Grid key={index} item xs={2}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Typography
                                                                variant="h5"
                                                                sx={{
                                                                    color: theme.palette.primary.main,
                                                                    fontSize: { lg: '18px', xs: '14px' },
                                                                    fontWeight: '400',
                                                                }}
                                                            >
                                                                {header}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>
                                    </Grid>

                                    {loading ? (
                                        <Grid item xs={12}>
                                            <Box sx={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Loading />
                                            </Box>
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12} sx={{ borderRadius: '0 0 5px 5px' }}>
                                            {data.length > 0 &&
                                                data.slice((page - 1) * limit, page * limit).map((item, index) => (
                                                    <Box key={index}>
                                                        <TableProducts data={item} onDelete={handleDeleteProductById} toggleVisible={toggleVisible} />
                                                        {index < data.slice((page - 1) * limit, page * limit).length - 1 && (
                                                            <Divider sx={{ borderColor: '#e7e7e7', borderBottomWidth: 1 }} />
                                                        )}
                                                    </Box>
                                                ))}
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        ) : loading ? (
                            <Grid item xs={12}>
                                <Box sx={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Loading />
                                </Box>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <Grid container spacing={4}>
                                    {data.length > 0 &&
                                        data.slice((page - 1) * limit, page * limit).map((item, index) => (
                                            <Grid key={index} item xs={12} sm={6} md={6} lg={4} sx={{ borderRadius: '0 0 5px 5px' }}>
                                                <CardProduct data={item} onDelete={handleDeleteProductById} toggleVisible={toggleVisible} />
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        )}

                        <Grid item xs={12} mt={4}>
                            <Grid container>
                                {data.length > 0 && (
                                    <Grid item xs={12}>
                                        <Paginator count={data.length} limit={limit} setPage={setPage} page={page} />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Produtos;

