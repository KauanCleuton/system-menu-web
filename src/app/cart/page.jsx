"use client";
import CartOptionCart from "@/components/CardOptionCart";
import { Box, Button, Container, Grid, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { clearCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const Cart = () => {
    const theme = useTheme()
    const dispatch = useDispatch();
    const router = useRouter();
    const items = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount);


    console.log(totalAmount, '1293821382183812323', items,'128321838123832821328')

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
                py: 14,
                px: 2,
                mb: 40
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
                                    <Typography variant="h3" sx={{ fontSize: { lg: 28, md: 25, sm: 22, xs: 21 }, fontWeight: "bold", color: theme.palette.secondary.main }}>
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
                                        bgcolor: theme.palette.secondary.main,
                                        border: `1px solid ${theme.palette.secondary.main}`,
                                        color: theme.palette.primary.main,
                                        fontSize: { lg: '16px', xs: '9px' },
                                        ":hover": {
                                            bgcolor: "transparent",
                                            color: theme.palette.secondary.main
                                        }
                                    }}>
                                        Comprar Mais
                                    </Button>
                                    <Button
                                        onClick={handleClearCart}
                                        variant="contained"
                                        sx={{
                                            textTransform: "inherit",
                                            bgcolor: theme.palette.primary.red,
                                            border: `1px solid ${theme.palette.primary.red}`,
                                            fontSize: { lg: '16px', xs: '9px' },
                                            ":hover": {
                                                bgcolor: "transparent",
                                                color: theme.palette.primary.red
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
                                            bgcolor: theme.palette.primary.main,
                                            border: `1px solid ${theme.palette.primary.main}`,
                                            fontSize: { lg: '16px', xs: '9px' },
                                            ":hover": {
                                                bgcolor: "transparent",
                                                color: theme.palette.primary.main
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
