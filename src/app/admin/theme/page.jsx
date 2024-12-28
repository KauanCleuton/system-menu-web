"use client";
import Loading from "@/app/loading";
import CardProduct from "@/components/CardProduct";
import Paginator from "@/components/Paginator";
import TableProducts from "@/components/TableProducts";
import ViewToggleButtons from "@/components/ToggleButton";
import { SET_ALERT } from "@/store/actions";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FormControlLabel, IconButton, Switch, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import OrdersService from "@/service/pedidos.service";
import { Delete, Edit, LocalShipping, PaletteOutlined, Receipt, SearchOutlined } from "@mui/icons-material";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import SeeProofPix from "@/components/SeeProofPix";
import Image from "next/image";
import { ThemeServiceNoAuth } from "@/service/theme.service";


const themeSv = new ThemeServiceNoAuth()
const Tema = () => {
    const theme = useTheme()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const limit = 6;
    const [page, setPage] = useState(1);
    const sel = useSelector(state => state.theme)
    console.log(sel)


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
                                                    {data && data.map((order, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '10px' },
                                                                }}
                                                            >
                                                                {order.id}
                                                            </TableCell>

                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '10px' },
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                <Box sx={{ width: 40, height: 40, position: 'relative' }}>
                                                                    {order.logo && (
                                                                        <Image
                                                                            alt="Logo"
                                                                            src={order.logo}
                                                                            layout="fill"
                                                                            style={{ objectFit: 'cover' }}
                                                                        />
                                                                    )}
                                                                </Box>
                                                            </TableCell>

                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '10px' },
                                                                }}
                                                            >
                                                                {order.nameTheme}
                                                            </TableCell>

                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '10px' },
                                                                }}
                                                            >
                                                                {order.domain}
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
                                                                        backgroundColor: order.primary,
                                                                        color: '#fff',
                                                                        padding: '5px 7px',
                                                                        borderRadius: '4px',
                                                                        textAlign: 'center',
                                                                        fontSize: 12
                                                                    }}
                                                                >
                                                                    {order.primary}
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
                                                                        backgroundColor: order.secondary,
                                                                        color: '#fff',
                                                                        padding: '3px 0px',
                                                                        borderRadius: '4px',
                                                                        textAlign: 'center',
                                                                        fontSize: 12
                                                                    }}
                                                                >
                                                                    {order.secondary}
                                                                </Typography>
                                                            </TableCell>

                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '10px' },
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                {order.title}
                                                            </TableCell>

                                                            <TableCell
                                                            align="center"
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '6px' },
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                <Box sx={{ width: 40, height: 40, position: 'relative' }}>
                                                                    {order.favicon && (
                                                                        <Image
                                                                            alt="Favicon"
                                                                            src={order.favicon}
                                                                            layout="fill"
                                                                            style={{ objectFit: 'cover' }}
                                                                        />
                                                                    )}
                                                                </Box>
                                                            </TableCell>

                                                            <TableCell
                                                                sx={{
                                                                    color: theme.palette.secondary.main,
                                                                    fontSize: { lg: '12px', xs: '6x' },
                                                                    textAlign: 'center',
                                                                }}
                                                            >
                                                                {order.address}
                                                            </TableCell>

                                                            <TableCell align="center"
                                                            >
                                                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: 0 }}>
                                                                    <IconButton
                                                                        LinkComponent={Link}
                                                                        href={`/admin/theme/${order.id}`}
                                                                        sx={{
                                                                            fontSize: 13,
                                                                        }}
                                                                    >
                                                                        <Edit color="action" />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        // onClick={() => onDelete(item.idProducts)}
                                                                        sx={{
                                                                            fontSize: 13,
                                                                        }}
                                                                    >
                                                                        <Delete color="error" />
                                                                    </IconButton>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Switch
                                                                                checked={order.visibleTheme}
                                                                            // onChange={() => toggleVisible(item.idProducts)}
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
