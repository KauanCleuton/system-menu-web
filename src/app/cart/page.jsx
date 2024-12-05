"use client";
import CartOptionCart from "@/components/CardOptionCart";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { clearCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const Cart = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const items = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
            setHydrated(true);
    }, [items.length, router]);

    const handleClearCart = () => {
        dispatch(clearCart());
        router.push("/");
    };

    if (!hydrated) {
        return <Loading />;
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                py: 15,
                px: 2,
            }}
        >
            <Container fixed sx={{
                bgcolor: "#fff",
                boxShadow: 1,
                py: 4
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Grid container spacing={2}>
                            {items.map((item) => (
                                <Grid item xs={12} lg={6} md={6} sm={12} key={`${item.idProducts}-${item.description}`}>
                                    <CartOptionCart item={item} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} mb={4}>
                        <Grid container alignItems={"center"} justifyContent={"space-between"} spacing={3}>
                            <Grid item xs={12} >
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: { lg: "flex-start", xs: "center" }
                                }}>
                                    <Typography variant="h3" sx={{ fontSize: { lg: 28, md: 25, sm: 22, xs: 21 }, fontWeight: "bold", color: "#000" }}>
                                        Total do pedido: {items.length !== 0 && `${Number(totalAmount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} >
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}>
                                    <Button component={Link} href="/" variant="contained" sx={{
                                        textTransform: "inherit",
                                        bgcolor: "#000",
                                        border: `1px solid #000`,
                                        color: "#FF4D00",
                                        fontSize: { lg: '16px', xs: '9px' },
                                        ":hover": {
                                            bgcolor: "transparent",
                                            color: "#000"
                                        }
                                    }}>
                                        Comprar Mais
                                    </Button>
                                    <Button
                                        onClick={handleClearCart}
                                        variant="contained"
                                        sx={{
                                            textTransform: "inherit",
                                            bgcolor: "#e01212",
                                            border: `1px solid #e01212`,
                                            fontSize: { lg: '16px', xs: '9px' },
                                            ":hover": {
                                                bgcolor: "transparent",
                                                color: "#e01212"
                                            }
                                        }}>
                                        Limpar Tudo
                                    </Button>
                                    <Button
                                        LinkComponent={Link}
                                        href="/checkout"
                                        variant="contained"
                                        sx={{
                                            textTransform: "inherit",
                                            bgcolor: "#FF4D00",
                                            border: `1px solid #FF4D00`,
                                            fontSize: { lg: '16px', xs: '9px' },
                                            ":hover": {
                                                bgcolor: "transparent",
                                                color: "#FF4D00"
                                            }
                                        }}>
                                        Próximo
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Cart;
