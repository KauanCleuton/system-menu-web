"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Container, Paper, Typography, Button, Grid, Box } from '@mui/material';
import customAxios from '@/service/middleware';
import { isLoggedIn } from '@/utils/auth';
import { useRouter } from 'next/navigation';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [audioLoaded, setAudioLoaded] = useState(false);
    const router = useRouter();
    const audioRef = useRef(null);

    useEffect(() => {
        if (!isLoggedIn()) {
            // router.push('/');
            console.log("213")
        } else {
            fetchOrders();

            // Carrega o áudio quando o componente é montado
            const audio = new Audio('/audio-newOrder.mp3');
            audioRef.current = audio;

            audio.oncanplaythrough = () => {
                setAudioLoaded(true);
            };

            // Conecta ao Server-Sent Events
            const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/events/admin`);
            eventSource.onmessage = (event) => {
                const newOrder = JSON.parse(event.data);
                setOrders((prevOrders) => [...prevOrders, newOrder]);
                handlePlaySound()
                if (audioLoaded) {
                    audioRef.current.play().catch((error) => {
                        console.error('Erro ao tocar o som de notificação:', error);
                    });
                } else {
                    console.error('Áudio não carregado corretamente');
                }
            };

            return () => {
                eventSource.close();
            };
        }
    }, [router, audioLoaded]);

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

    const handlePlaySound = () => {
        if (audioLoaded && audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error('Erro ao tocar o som manualmente:', error);
            });
        } else {
            console.error('Áudio não está carregado ainda.');
        }
    };

    return (
        <Box sx={{
            width: '100%',
            height: "100%",
            py: 3,
        }}>
            <Container fixed sx={{ py: 7, paddingBottom: "120px" }}>
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
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePlaySound}
                    disabled={!audioLoaded}
                >
                    Test Notification Sound
                </Button>
            </Container>
        </Box>
    );
};

export default OrderList;
