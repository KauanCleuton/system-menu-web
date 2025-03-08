import React, { useEffect } from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cartSlice';

const Finalizado = ({ status }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Navegando para a página inicial...");
            dispatch(clearCart());
            localStorage.removeItem("paymentId")
            router.push("/");
        }, 5000);

        return () => clearTimeout(timer);
    }, [dispatch, router]);

    const renderStatusIcon = () => {
        switch (status) {
            case 'success':
                return <CheckCircleIcon style={{ color: 'green', width: 140, height: 140 }} />;
            case 'pending':
                return <HourglassEmptyIcon style={{ color: 'orange', width: 140, height: 140 }} />;
            case 'error':
                return <CancelIcon style={{ color: 'red', width: 140, height: 140 }} />;
            default:
                return null;
        }
    };

    const renderStatusMessage = () => {
        switch (status) {
            case 'success':
                return (
                    <>
                        Pagamento confirmado com sucesso! Estamos preparando o seu pedido.
                        <br />
                        Em breve, você receberá uma notificação quando o pedido estiver pronto.
                    </>
                );
            case 'pending':
                return 'Pagamento pendente. Estamos aguardando a confirmação. Por favor, aguarde.';
            case 'error':
                return 'Falha no pagamento. Tente novamente ou entre em contato com o suporte.';
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
                    <Typography
                        gutterBottom
                        sx={{
                            color: theme.palette.primary.main,
                            fontSize: { lg: 30, md: 27, sm: 23, xs: 15 },
                        }}
                    >
                        {renderStatusMessage()}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Finalizado;
