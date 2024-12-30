"use client";
import Loading from "@/app/loading";
import Paginator from "@/components/Paginator";
import { SET_ALERT, SYNC_THEME_UPDATE } from "@/store/actions";
import { FormControlLabel, IconButton, Switch, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Delete, Edit, LocalShipping, PaletteOutlined, Receipt, SearchOutlined } from "@mui/icons-material";
import Image from "next/image";
import { ThemeService, ThemeServiceNoAuth } from "@/service/theme.service";


const themeSv = new ThemeServiceNoAuth()
const themeSvAuth = new ThemeService()
const Tema = () => {
    const theme = useTheme()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const limit = 5;
    const [page, setPage] = useState(1);
    const sel = useSelector(state => state.theme)
    console.log(sel)
    const dispatch = useDispatch()

    const fetchData = async () => {
        try {
            const themes = await themeSv.getAllThemes()
            setLoading(true)
            setData(themes)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])


    const toggleVisible = async (id) => {
        try {
            setLoading(true)
            setData((prevTheme) =>
                prevTheme.map((themeItem) =>
                    themeItem.id === id
                        ? { ...themeItem, visibleTheme: !themeItem.visibleTheme }
                        : themeItem
                )
            );
            const response = await themeSvAuth.patchToggleVisibleThemeById(id);
            console.log(response, '23821382183821388');

            dispatch({
                type: SET_ALERT,
                message: response.visibleTheme ? 'Tema ativado!' : 'Tema desativado',
                severity: 'success',
                alertType: 'tema',
            });
            dispatch({
                type: SYNC_THEME_UPDATE,
                payload: true,
            });
        } catch (error) {
            dispatch({
                type: SYNC_THEME_UPDATE,
                payload: true,
            });
            setData((prevTheme) =>
                prevTheme.map((themeItem) =>
                    themeItem.id === id
                        ? { ...themeItem, visibleTheme: !themeItem.visibleTheme }
                        : themeItem
                )
            );
            console.error('Erro ao atualizar ao atualizar tema', error);
        }
        finally {
            fetchData()
            setLoading(false)
        }
    };

    const handleDeleteThemeById = async (id) => {
        try {
            setLoading(true)
            const response = await themeSvAuth.deleteThemeById(id)
            console.log(response)
            dispatch({
                type: SET_ALERT,
                message: 'Tema deletado com sucesso!',
                severity: 'success',
                alertType: 'tema'
            })
            dispatch({
                type: SYNC_THEME_UPDATE,
                payload: true,
            });
        } catch (error) {
            console.error("Erro ao deletar tema", error)
            dispatch({
                type: SET_ALERT,
                message: error.message || 'Erro ao deletar tema',
                severity: 'error',
                alertType: 'tema'
            })
        }
        finally {
            setLoading(false)
            fetchData()
        }
    }


    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            py: 2
        }}>
            <Grid container spacing={4} >
                <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item lg={6} xs={6} >
                            <Box sx={{
                                width: '100%',
                                display: "flex",
                                justifyContent: "flex-start"
                            }}>
                                <Typography variant="h4" sx={{
                                    color: theme.palette.secondary.main
                                }} >
                                    Tema
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={6} xs={6}>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: 'flex-end',
                                    gap: 2
                                }}
                            >
                                <Button
                                    variant="contained"
                                    LinkComponent={Link}
                                    href="/admin/theme/new"
                                    sx={{
                                        color: theme.palette.primary.white,
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
                                    Novo tema
                                    <PaletteOutlined sx={{ ml: 1, width: 20, height: 20 }} />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={0} p={0}>
                        <Grid item xs={12}>
                            <Grid container spacing={0} p={0}>
                                {loading ? (
                                    <Grid item xs={12}>
                                        <Box sx={{ width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Loading />
                                        </Box>
                                    </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: '100%' }}>
                                                <TableHead>
                                                    <TableRow>
                                                        {['ID', 'Logo', 'Name', 'Domain', 'Primary', 'Secondary', 'Title', 'Favicon', 'Address', 'Ações'].map((header, index) => (
                                                            <TableCell
                                                                key={index}
                                                                sx={{
                                                                    color: theme.palette.primary.main,
                                                                    fontWeight: 'bold',
                                                                    fontSize: { lg: '14px', xs: '12px' },
                                                                    bgcolor: theme.palette.secondary.main,
                                                                    textAlign: 'center'
                                                                }}
                                                            >
                                                                {header}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {data && data.slice((page - 1) * limit, page * limit).map((item, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '10px' },
                                                                }}
                                                            >
                                                                {item.id}
                                                            </TableCell>

                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '10px' },
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                <Box sx={{ width: 50, height: 50, position: 'relative', background: item.secondary, borderRadius: '100%' }}>
                                                                    {item.logo && (
                                                                        <Image
                                                                            alt="Logo"
                                                                            src={item.logo}
                                                                            layout="fill"
                                                                            style={{ objectFit: 'cover' }}
                                                                        />
                                                                    )}
                                                                </Box>
                                                            </TableCell>

                                                            <TableCell
                                                                align="center"
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '10px', xs: '10px' },
                                                                    wordBreak: 'break-word',
                                                                    textAlign: 'center'
                                                                }}
                                                            >
                                                                {item.nameTheme}
                                                            </TableCell>

                                                            <TableCell
                                                                align="center"
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '10px', xs: '10px' },
                                                                    wordBreak: 'break-word',
                                                                    textAlign: 'center'
                                                                }}
                                                            >
                                                                {item.domain}
                                                            </TableCell>


                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '10px' },
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        backgroundColor: item.primary,
                                                                        color: '#fff',
                                                                        padding: '5px 7px',
                                                                        borderRadius: '4px',
                                                                        textAlign: 'center',
                                                                        fontSize: 12
                                                                    }}
                                                                >
                                                                    {item.primary}
                                                                </Typography>
                                                            </TableCell>

                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '10px', xs: '10px' },
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        backgroundColor: item.secondary,
                                                                        color: '#fff',
                                                                        padding: '3px 0px',
                                                                        borderRadius: '4px',
                                                                        textAlign: 'center',
                                                                        fontSize: 12
                                                                    }}
                                                                >
                                                                    {item.secondary}
                                                                </Typography>
                                                            </TableCell>

                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '10px', xs: '10px' },
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                {item.title}
                                                            </TableCell>

                                                            <TableCell
                                                                align="center"
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '6px' },
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                <Box sx={{ width: 50, height: 50, position: 'relative',  background: item.secondary, borderRadius: '100%' }}>
                                                                    {item.favicon && (
                                                                        <Image
                                                                            alt="Favicon"
                                                                            src={item.favicon}
                                                                            layout="fill"
                                                                            style={{ objectFit: 'cover' }}
                                                                        />
                                                                    )}
                                                                </Box>
                                                            </TableCell>

                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '10px', xs: '8px' },
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                {item.address}
                                                            </TableCell>

                                                            <TableCell align="center"
                                                            >
                                                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: 0 }}>
                                                                    <IconButton
                                                                        LinkComponent={Link}
                                                                        href={`/admin/theme/${item.id}/${item.domain}`}
                                                                        sx={{
                                                                            fontSize: 13,
                                                                        }}
                                                                    >
                                                                        <Edit color="action" />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        onClick={() => handleDeleteThemeById(item.id)}
                                                                        sx={{
                                                                            fontSize: 13,
                                                                        }}
                                                                    >
                                                                        <Delete color="error" />
                                                                    </IconButton>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={item.visibleTheme}
                                                                                onChange={() => toggleVisible(item.id)}
                                                                            />
                                                                        }

                                                                    />
                                                                </Box>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>



                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>

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

export default Tema;
