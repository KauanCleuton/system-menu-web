import React from 'react';
import Link from 'next/link';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Novo ícone para "Caixa"
import { usePathname } from 'next/navigation';
import { Person, PersonOutline } from '@mui/icons-material';

const routesComponent = [
    { title: "Dashboard", icon: <DashboardIcon sx={{ width: 20, height: 20 }} />, route: "/admin" },
    // { title: "Caixa", icon: <AttachMoneyIcon sx={{ width: 20, height: 20 }} />, route: "/admin/caixa" }, 
    { title: "Administradores", icon: <AdminPanelSettingsIcon sx={{ width: 20, height: 20 }} />, route: "/admin/administradores" },
    { title: "Usuários", icon: <PeopleIcon sx={{ width: 20, height: 20 }} />, route: "/admin/usuarios" },
    { title: "Categorias", icon: <CategoryIcon sx={{ width: 20, height: 20 }} />, route: "/admin/categorias" },
    { title: "Pedidos", icon: <ShoppingCartIcon sx={{ width: 20, height: 20 }} />, route: "/admin/pedidos" },
    { title: "Produtos", icon: <InventoryIcon sx={{ width: 20, height: 20 }} />, route: "/admin/produtos" },
    { title: "Entregador", icon: <LocalShippingIcon sx={{ width: 20, height: 20 }} />, route: "/admin/entregador" },
    { title: "Perfil Administrador", icon: <Person sx={{ width: 20, height: 20 }} />, route: "/admin/perfil" },
];

const Sidebar = () => {
    const theme = useTheme()
    const path = usePathname()

    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 1,
                borderRadius: '10px',
                overflow: 'hidden',
            }}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} >
                    {routesComponent.map((route, index) => (
                        <Link href={route.route} key={index} passHref>
                            <Grid
                                item
                                container
                                alignItems="center"
                                sx={{
                                    px: 2,
                                    py: 1,
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    color: path === route.route ? theme.palette.secondary.main : theme.palette.primary.main,
                                    fontWeight: path === route.route ? 700 : 500,
                                    transition: 'transform 0.2s',
                                    borderBottom: index < routesComponent.length - 1 && "1px solid #e7e7e7",
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        transformOrigin: 'center', // Centraliza o efeito de scale
                                        color: '#141414',
                                    },
                                    overflow: 'hidden', // Previne transbordamento
                                }}
                            >
                                <Grid item>
                                    {route.icon}
                                </Grid>
                                <Grid item sx={{ marginLeft: 2 }}>
                                    <Typography>{route.title}</Typography>
                                </Grid>
                            </Grid>
                        </Link>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Sidebar;
