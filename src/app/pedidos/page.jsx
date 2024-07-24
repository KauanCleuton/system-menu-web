"use client";

import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Button, Grid } from '@mui/material';
import customAxios from '@/service/middleware'; // Certifique-se de que este axios personalizado está configurado corretamente
import { isLoggedIn } from '@/utils/auth';
import { useRouter } from 'next/navigation';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push('/');
        } else {
            fetchOrders();

            const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/events`);
            eventSource.onmessage = (event) => {
                const newOrder = JSON.parse(event.data);
                setOrders((prevOrders) => [...prevOrders, newOrder]);
            };

            return () => {
                eventSource.close();
            };
        }
    }, [router]);

    const fetchOrders = async () => {
        const accessToken = sessionStorage.getItem("accessToken");
        try {
            const response = await customAxios.get('/orders', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await customAxios.put(`/orders/${orderId}`, { status: newStatus });
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <Container fixed sx={{ py: 7 }}>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>
            {orders.map((order) => (
                <Paper key={order.id} style={{ padding: 16, marginBottom: 16 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography sx={{ color: "red" }} variant="h6">
                                Order #{order.id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ color: "red" }}>
                                Title: {order.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ color: "red" }}>
                                Total Price: ${order.total_price}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ color: "red" }}>
                                Observation: {order.observation}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ color: "red" }}>
                                Status: {order.status}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => updateOrderStatus(order.id, 'completed')}
                            >
                                Mark as Completed
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Container>
    );
};

export default OrderList;
