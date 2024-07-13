import React, { useState } from 'react';
import Link from 'next/link';
import { Drawer, Box, Grid, IconButton, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const routesComponent = [
    { title: "Dashboard", icon: <DashboardIcon sx={{ width: 20, height: 20 }} />, route: "/admin" },
    { title: "Administradores", icon: <AdminPanelSettingsIcon sx={{ width: 20, height: 20 }} />, route: "/admin/administradores" },
    { title: "Usuários", icon: <PeopleIcon sx={{ width: 20, height: 20 }} />, route: "/admin/usuarios" },
    { title: "Categorias", icon: <CategoryIcon sx={{ width: 20, height: 20 }} />, route: "/admin/categorias" },
    { title: "Pedidos", icon: <ShoppingCartIcon sx={{ width: 20, height: 20 }} />, route: "/admin/pedidos" },
    { title: "Produtos", icon: <InventoryIcon sx={{ width: 20, height: 20 }} />, route: "/admin/produtos" },
    { title: "Entregador", icon: <LocalShippingIcon sx={{ width: 20, height: 20 }} />, route: "/admin/entregador" },
];

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? drawerWidth : 60,
                flexShrink: 0,
                py: 3,
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
                transition: 'width 0.3s',
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : 60,
                    boxSizing: 'border-box',
                    backgroundColor: '#000000',
                    color: '#FFFFFF'
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2 }}>
                <IconButton onClick={handleDrawerToggle} sx={{ color: '#FF4D00', p: 0 }}>
                    <MenuIcon />
                </IconButton>
            </Box>
            <Box sx={{ overflow: 'auto', height: { lg: 'calc(100% - 64px)', } }}>
                <Grid container direction="column">
                    {routesComponent.map((route, index) => (
                        <Link href={route.route} key={index} passHref>
                            <Grid
                                item
                                container
                                alignItems="center"
                                sx={{
                                    padding: 2,
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    color: '#FF4D00',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <Grid item>
                                    {route.icon}
                                </Grid>
                                {open && (
                                    <Grid item sx={{ marginLeft: 2 }}>
                                        <Typography>{route.title}</Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Link>
                    ))}
                </Grid>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
