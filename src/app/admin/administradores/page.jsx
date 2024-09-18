"use client";
import Loading from "@/app/loading";
import Paginator from "@/components/Paginator";
import TableUsersByRole from "@/components/TableUsersByRole";
import AdminService from "@/service/admin.service";
import { SET_ALERT } from "@/store/actions";
import { AdminPanelSettings, PersonAddOutlined, PersonSearchOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, TextField, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AdminSv = new AdminService()

const Administradores = () => {
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
            const response = await AdminSv.getAllAdmins()
            console.log(response)
            setData(response)
            dispatch({ type: SET_ALERT, message: `${response.length} administradores cadastrados!` })
        } catch (error) {
            console.error("Error ao buscar administradores", error)
        }
        finally {
            setLoading(false)
        }
    }
    const handleBackAdminById = async (id) => {
        try {
            setLoading(true)
            const response = await AdminSv.putBackAdminById(id)
            dispatch({
                type: SET_ALERT,
                message: response.message,
                severity: 'success',
                type: 'user'
            })
        } catch (error) {
            console.error("Erro ao remover papel de administrador.", error)
            dispatch({
                type: SET_ALERT,
                message: error.message || 'Erro ao remover papel de administrador.',
                severity: 'error',
                type: 'user'
            })
        }
        finally {
            setLoading(false)
            getData()
        }
    }
    const handleDeleteAdminById = async (id) => {
        try {
            setLoading(true)
            const response = await AdminSv.deleteAdminById(id)
            dispatch({
                type: SET_ALERT,
                message: response.message,
                severity: 'success',
                type: 'user'
            })
        } catch (error) {
            console.error("Erro ao deletar administrador.", error)
            dispatch({
                type: SET_ALERT,
                message: error.message || 'Erro ao deletar administrador.',
                severity: 'error',
                type: 'user'
            })
        }
        finally {
            setLoading(false)
            getData()
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleChangeValue = (event) => {
        const { name, value } = event.target
        setName(value)
    }

    const handleSearchByName = async () => {
        let user = []
        try {
            setLoading(true)
            const searchUser = await AdminSv.getSearchUserByName(name)
            // user.push(searchUser)
            setData(searchUser)
            console.log(searchUser)
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Grid container spacing={2} direction='column'> {/* Ajuste no espaçamento geral */}
            <Grid item >
                <Grid container spacing={1} alignItems="center"> {/* Reduzi o espaçamento interno */}
                    <Grid item lg={8} xs={12}>
                        <TextField
                            id="search-admin"
                            label="Buscar Admin pelo nome"
                            placeholder="Buscar Admin pelo nome"
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
                                <PersonSearchOutlined sx={{ ml: 1, width: 20, height: 20 }} />
                            </Button>
                            <Button
                                variant="contained"
                                LinkComponent={Link}
                                href="/admin/administradores/adicionar-admin"
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
                                Novo Admin
                                <PersonAddOutlined sx={{ ml: 1, width: 20, height: 20 }} />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item >
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
                                        <Grid item xs={3} lg={2} sm={3} md={2} sx={{ display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' } }} >
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
                                        <Grid item xs={3} lg={2} sm={3} md={2} >
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
                                                    Name
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3} lg={2} sm={3} md={2} >
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
                                                    Telefone
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3} lg={2} sm={3} md={2} >
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
                                                    Cargo
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3} lg={2} sm={3} md={2} >
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
                                                <TableUsersByRole data={item} onAdminOrUserAction={handleBackAdminById} onDelete={handleDeleteAdminById} />
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
    );
};

export default Administradores;

