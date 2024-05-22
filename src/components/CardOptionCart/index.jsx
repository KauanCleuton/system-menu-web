import { removeItemFromCart } from "@/store/cartSlice";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";

const CartOptionCart = ({ img, quantity, price, item, description }) => {
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        dispatch(removeItemFromCart(id));
    };

    return (
        <Paper elevation={2} sx={{ cursor: "pointer", mb: 2 }}>
            <Grid container >
                <Grid item xs={12} >
                    <Grid container justifyContent={"space-between"} columnSpacing={2}>
                        <Grid item xs={4} md={3} lg={3} sm={3}>
                            <Box sx={{ position: "relative", width: "100%", height: { lg: '130px', md: '125px', sm: '120px', xs: '100px'} }}>
                                <Image src={img} layout="fill" alt="Imagem do produto" style={{ objectFit: "cover", borderRadius: "5px 0 0 5px"}} />
                            </Box>
                        </Grid>
                        <Grid item xs={8} md={9} lg={9} sm={9}>
                            <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", py: 1 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: '13px', md: '18px' } }}>{item.title}</Typography>
                                    <Typography variant="body1" sx={{ fontSize: { xs: '13px', md: '16px' } }}>{item.deliveryDescription}</Typography>
                                    <Typography variant="body1" sx={{ fontSize: { xs: '13px', md: '16px' } }}>Quantidade: {quantity}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: { xs: '13px', md: '16px' } }}>R$ {Number(price * quantity).toFixed(2)}</Typography>
                                    <IconButton
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        sx={{
                                            color: "#fff",
                                            bgcolor: "#e01212",
                                            borderRadius: '4px',
                                            border: `1px solid #e01212`,
                                            width: 30,
                                            height: "auto",
                                            mr: 2,
                                            ":hover": {
                                                bgcolor: "transparent",
                                                color: "#e01212"
                                            }
                                        }}
                                    >
                                        <DeleteOutlineOutlined sx={{ fontSize: 14 }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default CartOptionCart;
