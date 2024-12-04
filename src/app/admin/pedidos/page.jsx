"use client";
import Loading from "@/app/loading";
import CardProduct from "@/components/CardProduct";
import Paginator from "@/components/Paginator";
import TableProducts from "@/components/TableProducts";
import ViewToggleButtons from "@/components/ToggleButton";
import { SET_ALERT } from "@/store/actions";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import OrdersService from "@/service/pedidos.service";
import { Delete, LocalShipping, Receipt } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import SeeProofPix from "@/components/SeeProofPix";


const orderSv = new OrdersService()
const Orders = () => {
    const theme = useTheme()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const limit = 6;
    const [id, setId] = useState(null)
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const [audioLoaded, setAudioLoaded] = useState(false);
    const router = useRouter();
    const audioRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);


    const getData = async () => {
        try {
            const response = await orderSv.getAllOrders()
            setData(response)
            dispatch({ type: SET_ALERT, message: `Total de pedido: ${response.length}`, severity: 'success' })
        } catch (error) {
            console.log('Erro ao buscar os pedidos!', error)
            dispatch({ type: SET_ALERT, message: 'Erro ao buscar todos os pedidos!', severity: 'error' })
        }
        finally {
            setLoading()
        }
    }


    useEffect(() => {
        console.log("213")
        getData();
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/events/admin`);
        eventSource.onmessage = (event) => {
            const newOrder = JSON.parse(event.data);
            setData((prevOrders) => [...prevOrders, newOrder]);

        };
        return () => {
            eventSource.close();
        };
    }, []);


    const handleSearchPedidoById = async () => {
        let dataById = [];
        try {
            const response = await orderSv.getOrderById(id)
            dataById.push(response)
            setData(dataById);
        } catch (error) {
            console.log('Erro ao buscar pedido pelo id', error)
        }
    }

    const handleOrderPutById = async (idPedidos) => {
        try {
            setLoading(true)
            const response = await orderSv.putOrderById(idPedidos)
            getData()
        } catch (error) {
            console.log('Erro ao buscar pedido pelo id', error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalIndex(0);
    };

    const handleOpenModal = (index) => {
        setModalIndex(index);
        setIsModalOpen(true);
    };

    return (
        <>
            <Box sx={{
                width: '100%',
                height: '100%',
                py: 2
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
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
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
                                        onClick={handleSearchPedidoById}
                                    >
                                        Buscar
                                        <SearchOutlinedIcon sx={{ ml: 1, width: 20, height: 20 }} />
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
                    {/* <Grid item xs={12} >
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: "flex-end"
                    }}>
                        <ViewToggleButtons view={view} />
                    </Box>
                </Grid> */}
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
                                                            {['ID', 'Cliente', 'Telefone', 'Data/Hora', 'Status', 'Quantidade', 'Pagamento', 'Total', 'Ações'].map((header, index) => (
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
                                                                    {order.idPedidos}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        color: theme.palette.secondary.main,
                                                                        fontSize: { lg: '12px', xs: '10px' },
                                                                        textAlign: 'center'
                                                                    }}
                                                                >
                                                                    {order.name}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        color: theme.palette.secondary.main,
                                                                        fontSize: { lg: '12px', xs: '10px' },
                                                                    }}
                                                                >
                                                                    {order.phone}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        color: theme.palette.secondary.main,
                                                                        fontSize: { lg: '12px', xs: '10px' },
                                                                        textAlign: 'center',
                                                                    }}
                                                                >
                                                                    {(() => {
                                                                        const date = new Date(order.created_at);
                                                                        const dateStr = date.toLocaleDateString("pt-BR");
                                                                        const timeStr = date.toLocaleTimeString("pt-BR");
                                                                        return (
                                                                            <>
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    component="div"
                                                                                    sx={{
                                                                                        fontWeight: 'bold',
                                                                                        fontSize: { lg: '12px', xs: '10px' },
                                                                                        color: theme.palette.secondary.main,
                                                                                    }}
                                                                                >
                                                                                    {timeStr}
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    component="div"
                                                                                    sx={{
                                                                                        fontSize: { lg: '11px', xs: '9px' },
                                                                                        color: theme.palette.secondary.main,

                                                                                    }}
                                                                                >
                                                                                    {dateStr}
                                                                                </Typography>
                                                                            </>
                                                                        );
                                                                    })()}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        color: theme.palette.secondary.main,
                                                                        fontSize: { lg: '12px', xs: '10px' },
                                                                    }}
                                                                >
                                                                    {order.status}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        color: theme.palette.secondary.main,
                                                                        fontSize: { lg: '12px', xs: '10px' },
                                                                        textAlign: 'center'
                                                                    }}
                                                                >
                                                                    {order.quantity}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        color: theme.palette.secondary.main,
                                                                        fontSize: { lg: '12px', xs: '10px' },
                                                                        textAlign: 'center'
                                                                    }}
                                                                >
                                                                    {order.payment}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        color: theme.palette.secondary.main,
                                                                        fontSize: { lg: '12px', xs: '10px' },
                                                                    }}
                                                                >
                                                                    {parseInt(order.total_price).toLocaleString("pt-BR", {
                                                                        style: "currency",
                                                                        currency: "BRL"
                                                                    })}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        color: theme.palette.secondary.main,
                                                                        fontSize: { lg: '1px', xs: '10px' },
                                                                        display: 'flex',
                                                                        flexDirection: 'row'
                                                                    }}
                                                                >
                                                                    {/* <IconButton
                                                                    // onClick={() => handleDelete(order.id)}
                                                                    color="error"
                                                                   
                                                                >
                                                                    <Delete />
                                                                </IconButton> */}
                                                                    <IconButton
                                                                        onClick={() => handleOpenModal(index)}
                                                                        color="primary"

                                                                    >
                                                                        <Receipt />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        color="warning"
                                                                        onClick={() => handleOrderPutById(order.idPedidos)}
                                                                    >
                                                                        <LocalShipping />
                                                                    </IconButton>
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
            <SeeProofPix close={handleCloseModal} data={data} open={isModalOpen} index={modalIndex} />
        </>

    );
};

export default Orders;
