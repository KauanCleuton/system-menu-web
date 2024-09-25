"use client";
import Loading from "@/app/loading";
import CategoryComponent from "@/components/CategoryComponent";
import Paginator from "@/components/Paginator";
import TableCategory from "@/components/TableCategory";
import CategoryService from "@/service/categories.service";
import { SET_ALERT } from "@/store/actions";
import { AdminPanelSettings, CategoryOutlined, PersonAddOutlined, PersonSearchOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Modal, Paper, TextField, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CategorySv = new CategoryService()

const ProductCategory = () => {
    const [functionStates, setFuncionStates] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [idCategory, setIdCategory] = useState(0)
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const theme = useTheme();
    const limit = 10;
    const [page, setPage] = useState(1);
    const [name, setName] = useState("")

    const getData = async () => {
        try {
            setLoading(true)
            const response = await CategorySv.getAllCategories()
            console.log(response)
            setData(response)
            dispatch({ type: SET_ALERT, message: `${response.length} categorias cadastrados!` })
        } catch (error) {
            console.error("Error ao buscar categorias", error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleDeleteCategoryById = async (id) => {
        try {
            setLoading(true)
            const response = await CategorySv.deleteCategoryById(id)
            dispatch({
                type: SET_ALERT,
                message: response?.message || "Categoria deletada com sucesso!",
                severity: 'success',
                alertType: 'category'
            })
        } catch (error) {
            console.error("Erro ao deletar administrador.", error)
            dispatch({
                type: SET_ALERT,
                message: error.message || 'Erro ao deletar administrador.',
                severity: 'error',
                alertType: 'category'
            })
        }
        finally {
            setLoading(false)
            getData()
        }
    }

    const handleSubmit = async (values) => {
        try {
            const response = await CategorySv.putCategoryById(idCategory, values);
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

    useEffect(() => {
        getData()
    }, [])

    const handleChangeValue = (event) => {
        const { name, value } = event.target
        setName(value)
    }

    const handleSearchByName = async () => {
        try {
            setLoading(true)
            const searchCategory = await CategorySv.getCategoryByName(name)
            setData(searchCategory)
            console.log(searchCategory)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleOpenModal = (id) => {
        setOpenModal(true)
        setIdCategory(id)
        setFuncionStates("edit")
    }
    
    const handleOpenModalCreate = () => {
        setOpenModal(true)
        setFuncionStates("create")
    }
    

    const handleCloseModal = () => {
        setOpenModal(false)
        setIdCategory(0)
        setFuncionStates("")
    }

    return (
        <>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <CategoryComponent
                    functionStates={functionStates}
                    onClose={handleCloseModal}
                    onSubmit={functionStates === 'edit' ? handleSubmit : handleSubmitCreateCategory}
                />
            </Modal>
            <Box sx={{
                width: '100%',
                height: 'auto'
            }}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item lg={8} xs={12}>
                                <TextField
                                    id="search-category"
                                    label="Buscar categoria pelo nome"
                                    placeholder="Buscar categoria pelo nome"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => handleChangeValue(e)}
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
                                        onClick={handleSearchByName}
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
                                        Buscar
                                        <CategoryOutlined sx={{ ml: 1, width: 20, height: 20 }} />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleOpenModalCreate}
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
                                        Nova Categoria
                                        <CategoryOutlined sx={{ ml: 1, width: 20, height: 20 }} />
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={7}>
                            <Grid item xs={12} >
                                <Grid container component={Paper} elevation={1}>
                                    <Grid item xs={12}>
                                        <Box sx={{
                                            width: '100%',
                                            py: 2,
                                            px: 1,
                                            bgcolor: theme.palette.secondary.main,
                                            borderRadius: "6px 6px 0 0"
                                        }} >
                                            <Grid container alignItems={"center"} justifyContent="space-between">
                                                <Grid item xs={3} lg={4} sm={3} md={4} >
                                                    <Box sx={{
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}>
                                                        <Typography variant="h5"
                                                            sx={{
                                                                color: theme.palette.primary.main,
                                                                fontSize: { lg: '18px', xs: '14px' },
                                                                fontWeight: "400",
                                                            }}
                                                        >
                                                            ID
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={3} lg={4} sm={3} md={4} >
                                                    <Box sx={{
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: { lg: "center", xs: 'flex-start' }
                                                    }}>
                                                        <Typography variant="h5"
                                                            sx={{
                                                                color: theme.palette.primary.main,
                                                                fontSize: { lg: '18px', xs: '14px' },
                                                                fontWeight: "400",
                                                            }}
                                                        >
                                                            Nome da Categoria
                                                        </Typography>
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={3} lg={4} sm={3} md={4} >
                                                    <Box sx={{
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: { lg: "center", md: 'center', sm: 'flex-end', xs: 'flex-end' }
                                                    }}>
                                                        <Typography variant="h5"
                                                            sx={{
                                                                color: theme.palette.primary.main,
                                                                fontSize: { lg: '18px', xs: '14px' },
                                                                fontWeight: "400",
                                                            }}
                                                        >
                                                            Ações
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>

                                    {loading ? (
                                        <Grid item xs={12} >
                                            <Box sx={{
                                                width: '100%',
                                                height: '400px',
                                                display: "flex",
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Loading />
                                            </Box>
                                        </Grid>
                                    ) :
                                        <Grid item xs={12} border="1px solid #000" sx={{ borderRadius: '0 0 5px 5px' }}>
                                            {data.length > 0 && (
                                                data.slice((page - 1) * limit, page * limit).map((item, index) => (
                                                    <Box key={index}  >
                                                        <TableCategory data={item} onOpenModal={handleOpenModal} onDelete={handleDeleteCategoryById} />
                                                        {index < data.slice((page - 1) * limit, page * limit).length - 1 && (
                                                            <Divider sx={{ borderColor: "#e7e7e7", borderBottomWidth: 1 }} />
                                                        )}
                                                    </Box>
                                                ))
                                            )}
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    {data.length > 0 && (
                                        <Grid item xs={12}>
                                            <Paginator
                                                count={data.length}
                                                limit={limit}
                                                setPage={setPage}
                                                page={page}
                                            />
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

export default ProductCategory;
