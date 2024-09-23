"use client";
import Loading from "@/app/loading";
import Paginator from "@/components/Paginator";
import TableProducts from "@/components/TableProducts";
import TableUsersByRole from "@/components/TableUsersByRole";
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
    const limit = 10;
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const getData = async () => {
        try {
            setLoading(true)
            const produtos = await ProductSv.getAllProducts()
            setData(produtos)
            console.log(produtos)
            dispatch({type: SET_ALERT, message: produtos.length > 0 ? produtos.length : produtos.message, severity: 'success', type: 'category'})
        } catch (error) {
            console.error("Erro ao buscar produtos", error)
        }
        finally {
            setLoading(false)
        }
    }
 
    const handleToggle = async (id) => {
        try {
          const response = await ProductSv.patchProductsById(id);
          dispatch({type: SET_ALERT, message: response.message, severity: 'success', type: 'user'})
        } catch (error) {
          console.error('Erro ao atualizar a visibilidade do produto', error);
        }
      };
    

    useEffect(() => {
        getData()
    }, [])

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
                                    }}
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
                                            {/* <Grid item sx={{ display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' } }} >
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
                                            </Grid> */}
                                            <Grid item xs={2} lg={2} md={2} sm={2} >
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
                                                        Imagem
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2} lg={2} md={2} sm={2} >
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
                                                        Título
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2} lg={2} md={2} sm={2} >
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
                                                        Descrição
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2} lg={2} md={2} sm={2} >
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
                                                        Preço
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2} lg={2} md={2} sm={2} >
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
                                                        Categoria
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2} lg={2} md={2} sm={2} >
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
                                                    <TableProducts data={item} toggleVisible={handleToggle} />
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
    );
};

export default Produtos;

