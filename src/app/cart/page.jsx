"use client";
import CartOptionCart from "@/components/CardOptionCart";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

const Cart = () => {
    const items = useSelector(state => state.cart.items);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null; // ou um placeholder enquanto está hidratando
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
            }}
        >
            <Container fixed sx={{ py: 12 }}>
                <Grid container spacing={2}>
                    {items.length === 0 ? (
                        <Grid item xs={12}>
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center"
                            }}>
                                <Typography variant="h5">O carrinho está vazio.</Typography>
                            </Box>
                        </Grid>
                    ) : (
                        items.map((item) => (
                            <Grid item xs={12} lg={6} key={`${item.id}-${item.description}`}>
                                <CartOptionCart
                                    img={item.photo}
                                    quantity={item.quantity}
                                    price={item.price}
                                    item={item}
                                    description={item.description}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </Box>
    );
}

export default Cart;
