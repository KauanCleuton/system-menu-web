"use client";
import CartOptionCart from "@/components/CardOptionCart";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { clearCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

const Cart = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const items = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        if(items.length === 0) {
            router.push("/")
        }
        setHydrated(true);
    }, []);


    const handleClearCart = () => {
        dispatch(clearCart())
        router.push("/")
    }
    if (!hydrated) {
        return null; // ou um placeholder enquanto está hidratando
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: 'flex',
                justifyContent: "center",
                alignItems: "flex-start",
                py: 12,
                px: 2
            }}
        >
            <Grid container spacing={2}>
                {items.length === 0 ?
                    <Grid item xs={12}>
                        <Box sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center"
                        }}>
                            <Typography variant="h3" sx={{fontSize: {lg: 43, md: 39, sm: 32, xs: 27}}}>O carrinho está vazio.</Typography>
                        </Box>
                    </Grid>
                    :
                    <>
                        <Grid item xs={12} >
                            <Container fixed sx={{ py: 4, height: {lg: 500, md: 500, sm: 500, xs: 440}, overflow: "auto" }} component={Paper} elevation={1}>
                                <Grid container spacing={2}>

                                    {items.map((item) => (
                                        <Grid item xs={12} lg={6} md={6} sm={12} key={`${item.id}-${item.description}`}>
                                            <CartOptionCart
                                                img={item.photo}
                                                quantity={item.quantity}
                                                price={item.price}
                                                item={item}
                                                description={item.description}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>
                        </Grid>
                        <Grid item xs={12} >
                            <Container fixed component={Paper} elevation={1} sx={{ py: 2 }}>
                                <Grid container alignItems={"center"} justifyContent={"space-between"} spacing={3}>
                                    <Grid item xs={12} md={8} lg={8} sm={12} >
                                        <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "flex-start"
                                        }}>
                                            <Typography variant="h3" sx={{ fontSize: {lg: 28, md: 25, sm: 22, xs: 21}, fontWeight: "bold" }}>
                                                Total do pedido: {items.length !== "0" && `R$ ${Number(totalAmount).toFixed(2)}`}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4} lg={4} sm={12}>
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            width: "100%",
                                        }}>
                                            <Button component={Link} href="/" variant="contained" sx={{
                                                textTransform: "inherit",
                                                bgcolor: "#000",
                                                border: `1px solid #000`,
                                                fontSize: {lg: '16px', xs: '9px'},
                                                ":hover": {
                                                    bgcolor: "transparent",
                                                    color: "#000"
                                                }
                                            }}>
                                                Voltar
                                            </Button>
                                            <Button
                                                onClick={handleClearCart}
                                                variant="contained"
                                                sx={{
                                                    textTransform: "inherit", bgcolor: "#e01212",
                                                    border: `1px solid #e01212`,
                                                    fontSize: {lg: '16px', xs: '9px'},
                                                    ":hover": {
                                                        bgcolor: "transparent",
                                                        color: "#e01212"
                                                    }
                                                }}>
                                                Limpar Tudo
                                            </Button>
                                            <Button component={Link} href="/" variant="contained" sx={{
                                                textTransform: "inherit",
                                                bgcolor: "#060f4c",
                                                border: `1px solid #060f4c`,
                                                fontSize: {lg: '16px', xs: '9px'},
                                                ":hover": {
                                                    bgcolor: "transparent",
                                                    color: "#060f4c"
                                                }
                                            }}>
                                                Próximo
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </>
                }
            </Grid>

        </Box>
    );
}

export default Cart;
