import React, { useEffect } from 'react';
import { Box, Typography, Button, Grid, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cartSlice';

const Finalizado = ({ status }) => {
    const theme = useTheme();
    const router = useRouter()
    const dispatch = useDispatch()



    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(clearCart());
            router.push("/");
        }, 3000);

        return () => clearTimeout(timer);
    }, [dispatch, router]);

    const renderStatusIcon = () => {
        switch (status) {
            case 'finalizado':
                return <CheckCircleIcon style={{ color: 'green', fontSize: 50 }} />;
            case 'cancelado':
                return <CancelIcon style={{ color: 'red', fontSize: 50 }} />;
            case 'pendente':
                return <HourglassEmptyIcon style={{ color: 'orange', fontSize: 50 }} />;
            default:
                return null;
        }
    };

    const renderStatusMessage = () => {
        switch (status) {
            case 'success':
                return 'Seu pedido foi finalizado com sucesso! Agradecemos a sua compra.';
            case 'error':
                return 'Seu pedido foi cancelado. Por favor, tente novamente mais tarde.';
            default:
                return 'Status desconhecido. Por favor, entre em contato com o suporte.';
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%', p: 3, textAlign: 'center' }}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    {renderStatusIcon()}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        {renderStatusMessage()}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Finalizado;
