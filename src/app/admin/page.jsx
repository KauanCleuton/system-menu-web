"use client"
import React, { useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/utils/auth';

const Dashboard = () => {
    const router = useRouter()
    const saldo = 15000;
    const totalPedidosDia = 15;
    const totalPedidosSemana = 80;
    const totalPedidosMes = 300;

    // Dados fictícios para lista de pedidos
    const pedidos = [
        { id: 1, cliente: 'João', status: 'Pendente' },
        { id: 2, cliente: 'Maria', status: 'Em andamento' },
        { id: 3, cliente: 'José', status: 'Entregue' },
        { id: 4, cliente: 'Ana', status: 'Pendente' },
        { id: 5, cliente: 'Pedro', status: 'Entregue' },
    ];

    useEffect(() => {
        if(!isLoggedIn()) {
            router.push("/")
        }
    }, [])


    return (
        <Box sx={{ p: 2 }}>
            {/* Valores do caixa */}
            <Paper elevation={3} sx={{ p: 2, mb: 2, backgroundColor: '#000000', color: '#FFFFFF' }}>
                <Typography variant="h5" gutterBottom>
                    Valores do Caixa
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Saldo: R$ {saldo.toFixed(2)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Total de Pedidos no Dia: {totalPedidosDia}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Total de Pedidos na Semana: {totalPedidosSemana}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Total de Pedidos no Mês: {totalPedidosMes}
                </Typography>
            </Paper>

            {/* Lista de pedidos */}
            <Paper elevation={3} sx={{ p: 2, backgroundColor: '#000000', color: '#FFFFFF' }}>
                <Typography variant="h5" gutterBottom>
                    Lista de Pedidos
                </Typography>
                {pedidos.map((pedido) => (
                    <Paper key={pedido.id} sx={{ p: 2, mb: 2 }}>
                        <Typography variant="body1" gutterBottom>
                            Cliente: {pedido.cliente}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Status: {pedido.status}
                        </Typography>
                        <Button variant="contained" color="primary">
                            Atualizar Status
                        </Button>
                    </Paper>
                ))}
            </Paper>
        </Box>
    );
};

export default Dashboard;
