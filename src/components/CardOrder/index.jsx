import React from 'react';
import { Grid, Typography, Button, Box, useTheme } from "@mui/material";
import RouteIcon from '@mui/icons-material/Route'; // ícone de rota

const CardOrder = ({ data, handleRouterOrder, setData }) => {
    const theme = useTheme()
    const { User, address, total_price, status, created_at, phone} = data;
    console.log(data, '921391239219')

    return (
        <Box sx={{
            width: "100%",
            border: `2px solid ${theme.palette.primary.main}`,
            p: 2,
            borderRadius: '8px',
            boxShadow: 1,
            cursor: 'pointer'
        }}>
            <Grid container direction="row" flexWrap='wrap' alignItems='center' justifyContent='space-between' spacing={2}>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>Nome do cliente:</Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>{User.name}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>Endereço de entrega:</Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>{address}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>Valor total do pedido:</Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>R$ {total_price.toFixed(2)}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>Status atual do pedido:</Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>{status}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>Hora do pedido:</Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>{created_at}</Typography>
                </Grid>
                <Grid item container alignItems="center" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRouterOrder}
                        startIcon={<RouteIcon />}
                    >
                        Finalizar Pedido
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CardOrder;
