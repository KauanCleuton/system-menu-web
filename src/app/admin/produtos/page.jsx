"use client";
import Loading from "@/app/loading";
import CardProduct from "@/components/CardProduct";
import Notification from "@/components/Notification";
import Paginator from "@/components/Paginator";
import TableProducts from "@/components/TableProducts";
import TableUsersByRole from "@/components/TableUsersByRole";
import ViewToggleButtons from "@/components/ToggleButton";
import VerticalToggleButtons from "@/components/ToggleButton";
import AdminService from "@/service/admin.service";
import { NotificationsAdmin } from "@/service/notifications.service";
import ProductsSv from "@/service/productsAdmin.service";
import { SET_ALERT } from "@/store/actions";
import { AdminPanelSettings, ControlPoint, Inventory, PersonAddOutlined, PersonSearchOutlined, SearchOffOutlined, SearchOutlined, WarningAmber } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductSv = new ProductsSv()

const notificationSv = new NotificationsAdmin()
const Produtos = () => {
    const theme = useTheme()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const limit = 6;
    const [name, setName] = useState("")
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const [view, setView] = useState('list');

    const handleChange = (nextView) => {
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
            console.log(response, '23821382183821388');

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

    const [openModal, setOpenModal] = useState(false)

    const handleCloseModal = () => {
        setOpenModal(!openModal)
    }

    const handleSubmitCreateNotification = async (values) => {
        try {

            console.log(values)
            const response = await notificationSv.createNotification(values);
            console.log(response.message);
            dispatch({ type: SET_ALERT, message: response.message, severity: "success", alertType: "notification" });
            setOpenModal(false)
            setLoading(true)
        } catch (error) {
            console.error("Error ao criar notificação!", error);
            dispatch({ type: SET_ALERT, message: error.message, severity: "error", alertType: "notification" });
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Notification
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitCreateNotification}
                />
            </Modal>
            <Box sx={{
                width: '100%',
                height: '100%',
                p: 2
            }}>
                <Grid container spacing={4} >
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    id="search-admin"
                                    label="Buscar produto pelo name"
                                    placeholder="Buscar produto pelo name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                    sx={{
                                        "& .MuiInputBase-input": {
                                            color: theme.palette.secondary.main
                                        },
                                        "& .MuiFormLabel-root": {
                                            color: theme.palette.secondary.main
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
                                            color: theme.palette.primary.main
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: { xs: 'center', lg: 'flex-end' },
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
                                            // px: 3
                                        }}
                                        onClick={handleSearchByName}
                                    >
                                        Buscar
                                        <SearchOutlined sx={{ ml: 1, width: 20, height: 20 }} />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => setOpenModal(!openModal)}
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
                                        Criar notificação
                                        <WarningAmber sx={{ ml: 1, width: 20, height: 20 }} />
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
                                        <ControlPoint sx={{ ml: 1, width: 20, height: 20 }} />
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
                            <ViewToggleButtons handleChange={handleChange} view={view} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={0} p={0}>
                            {view === 'list' ? (
                                <Grid item xs={12}>
                                    <Grid container component={Paper} elevation={1}>
                                        {loading ? (
                                            <Grid item xs={12} >
                                                <Box sx={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Loading />
                                                </Box>
                                            </Grid>
                                        ) : (
                                            <Grid item xs={12} >
                                                {/* {data.length > 0 &&
                                                data.slice((page - 1) * limit, page * limit).map((item, index) => (
                                                    <TableProducts
                                                        key={index}
                                                        data={item}
                                                        onDelete={handleDeleteProductById}
                                                        toggleVisible={toggleVisible}
                                                    />
                                                ))} */}
                                                <TableProducts
                                                    // key={index}
                                                    data={data}
                                                    onDelete={handleDeleteProductById}
                                                    toggleVisible={toggleVisible}
                                                    page={page}
                                                    limit={limit}
                                                />

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
        </>
    );
};

export default Produtos;
