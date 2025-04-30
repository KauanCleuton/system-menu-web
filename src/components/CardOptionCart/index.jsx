import { removeItemFromCart } from "@/store/cartSlice";
import { AddShoppingCartOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";

const CartOptionCart = ({ item }) => {
    const dispatch = useDispatch();
    const theme = useTheme()

    const handleRemoveFromCart = (id) => {
        dispatch(removeItemFromCart(id));
        console.log(id)
    };

    const handleOpenModal = () => {
        dispatch(openModal(item));
    };

    return (
        <Paper elevation={2} sx={{
            cursor: "pointer", mb: 2,
            width: "100%",
            backgroundColor: theme.palette.secondary.main,
        }}>
            <Grid container >
                <Grid item>
                    <Box
                        sx={{
                            position: "relative",
                            width: { lg: '150px', md: '150px', sm: '120px', xs: '120px' },
                            height: { lg: '150px', md: '150px', sm: '120px', xs: '120px' },
                        }}
                    >
                        <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/produtos/${item.idProducts}`} layout="fill" alt="Imagem do produto" style={{ objectFit: "cover", borderRadius: "5px 0 0 5px" }} />
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box sx={{ width: "100%", height: '100%',px: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", py: 1 }}>
                        <Box sx={{
                            width: "100%"
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: '20px', md: '18px' }, color: theme.palette.primary.main }}>{item.title}</Typography>
                            <Typography variant="body1" sx={{ fontSize: { xs: '13px', md: '16px' } }}>Observação: {item.deliveryDescription}</Typography>
                            <Typography variant="body1" sx={{ fontSize: { xs: '13px', md: '16px' } }}>Quantidade: {item.quantity}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: { xs: '13px', md: '16px' } }}>
                                {Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Typography>
                            <Box>
                             <IconButton
                                                                onClick={handleOpenModal}
                                                                sx={{
                                                                    color: "#fff",
                                                                    bgcolor: theme.palette.primary.main,
                                                                    borderRadius: '4px',
                                                                    mr:1,
                                                                    width: {lg: 36, md: 36, sm: 26, xs: 26},
                                                                    height: {lg: 36, md: 36, sm: 26, xs: 26},
                                                                    ":hover": {
                                                                        bgcolor: "transparent",
                                                                        color: theme.palette.primary.main,
                                                                    },
                                                                }}
                                                                aria-label="Adicionar ao carrinho"
                                                            >
                                                                <AddShoppingCartOutlined sx={{ fontSize: {lg: 18, md: 18, sm: 14, xs: 14} }} />
                                                            </IconButton>
                            <IconButton
                                onClick={() => handleRemoveFromCart(item.idProducts)}
                                sx={{
                                    color: "#fff",
                                    bgcolor: theme.palette.primary.main,
                                    borderRadius: '4px',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    width: {lg: 36, md: 36, sm: 26, xs: 26},
                                    height: {lg: 36, md: 36, sm: 26, xs: 26},
                                    mr: 0,
                                    ":hover": {
                                        bgcolor: "transparent",
                                        color: theme.palette.primary.main
                                    }
                                }}
                            >
                                <DeleteOutlineOutlined sx={{ fontSize: 14 }} />
                            </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CartOptionCart;
