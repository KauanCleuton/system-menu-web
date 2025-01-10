import React, { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cartSlice';

const Finalizado = ({ status }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        // Limpa o carrinho e redireciona após 3 segundos para "/"
        const timer = setTimeout(() => {
            dispatch(clearCart());
            router.push("/");
        }, 3000);

        return () => clearTimeout(timer);
    }, [dispatch, router]);

    const renderStatusIcon = () => {
        switch (status) {
            case 'success':
                return <CheckCircleIcon style={{ color: 'green', fontSize: 80 }} />; 
            case 'pending':
                return <HourglassEmptyIcon style={{ color: 'orange', fontSize: 80 }} />;
            case 'error':
                return <CancelIcon style={{ color: 'red', fontSize: 80 }} />;
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
                    <Typography variant="h3" gutterBottom sx={{
                        color: 'primary.secondary'
                    }}>
                        {renderStatusMessage()}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Finalizado;
