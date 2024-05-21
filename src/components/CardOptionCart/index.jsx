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
            <Grid container justifyContent={"space-between"}  columnSpacing={2}>
                <Grid item xs={3} md={4} lg={3} sm={3}>
                    <Box sx={{ position: "relative", width: "100%", height: { lg: '130px', md: '125px', sm: '120px', xs: '100px' } }}>
                        <Image src={img} layout="fill" alt="Imagem do produto" style={{ objectFit: "cover" }} />
                    </Box>
                </Grid>
                <Grid item xs={9} md={8} lg={9} sm={9}>
                    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", py: 1 }}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: '13px', md: '18px' } }}>{item.title}</Typography>
                            <Typography variant="body1" sx={{ fontSize: { xs: '13px', md: '16px' } }}>{quantity}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: { xs: '13px', md: '16px' } }}>R$ {price}</Typography>
                            <IconButton
                                onClick={() => handleRemoveFromCart(item.id)}
                                sx={{
                                    color: "#fff",
                                    bgcolor: "#000",
                                    borderRadius: '4px',
                                    border: `1px solid #000`,
                                    width: 30,
                                    height: "auto",
                                    mr: 2,
                                    ":hover": {
                                        bgcolor: "transparent",
                                        color: "#000"
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
