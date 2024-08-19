import { removeItemFromCart } from "@/store/cartSlice";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";

const CartOptionCart = ({ item }) => {
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        dispatch(removeItemFromCart(id));
        console.log(id)
    };

    return (
        <Paper elevation={2} sx={{
            cursor: "pointer", mb: 2,
            width: "100%",
            backgroundColor: "#000000",
            py: 1,
        }}>
            <Grid container >
                <Grid item xs="auto">
                    <Box sx={{ position: "relative", width: { lg: '130px', md: '125px', sm: '120px', xs: '100px' }, height: { lg: '100%', md: '125px', sm: '120px', xs: '116px' } }}>
                        <Image src={item.file_url} layout="fill" alt="Imagem do produto" style={{ objectFit: "cover", borderRadius: "5px 0 0 5px" }} />
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box sx={{ width: "100%", height: "100%", px: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", py: 0 }}>
                        <Box sx={{
                            width: "100%"
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: '13px', md: '18px' }, color: "#FF4D00" }}>{item.title}</Typography>
                            <Typography variant="body1" sx={{ fontSize: { xs: '13px', md: '16px' } }}>Observação: {item.deliveryDescription}</Typography>
                            <Typography variant="body1" sx={{ fontSize: { xs: '13px', md: '16px' } }}>Quantidade: {item.quantity}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: { xs: '13px', md: '16px' } }}>
                                {Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Typography>
                            <IconButton
                                onClick={() => handleRemoveFromCart(item.idProducts)}
                                sx={{
                                    color: "#fff",
                                    bgcolor: "#FF4D00",
                                    borderRadius: '4px',
                                    border: `1px solid #FF4D00`,
                                    width: 30,
                                    height: "auto",
                                    mr: 2,
                                    ":hover": {
                                        bgcolor: "transparent",
                                        color: "#FF4D00"
                                    }
                                }}
                            >
                                <DeleteOutlineOutlined sx={{ fontSize: 14 }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CartOptionCart;
