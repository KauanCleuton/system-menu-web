"use client";
import Loading from "@/app/loading";
import CardProduct from "@/components/CardProduct";
import Paginator from "@/components/Paginator";
import TableProducts from "@/components/TableProducts";
import ViewToggleButtons from "@/components/ToggleButton";
import { SET_ALERT } from "@/store/actions";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Orders = () => {
    const theme = useTheme()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const limit = 6;
    const [name, setName] = useState("")
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const [view, setView] = useState('list');

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            p: 2
        }}>
            <Grid container spacing={4} >
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
                                    // onClick={handleSearchByName}
                                >
                                    Buscar
                                    <SearchOutlinedIcon sx={{ ml: 1,width: 20, height: 20 }} />
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
                                    <ControlPointIcon sx={{ ml: 1, width: 20, height: 20 }} />
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
                        <ViewToggleButtons view={view} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={0} p={0}>
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
                                                {['ID', 'Cliente', 'Observação','Tipo de Pagamento ', 'Total a Pagar' ].map((header, index) => (
                                                    <Grid key={index} item xs={2}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Typography
                                                                variant="h5"
                                                                sx={{
                                                                    color: theme.palette.primary.main,
                                                                    fontSize: { lg: '14px', xs: '14px' },
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

export default Orders;
