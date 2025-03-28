import React from 'react';
import { Menu, MenuItem, Box, Avatar, Tooltip, IconButton, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AccountCircle } from '@mui/icons-material';
import Link from 'next/link';

const UserMenu = ({ anchorEl, handleClose, handleLogout, user}) => {

    const role = localStorage.getItem("role")
    const theme = useTheme()
    return (
        <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings" sx={{display: {xs: "flex", lg: "none"}}}>
                <IconButton onClick={handleClose} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src={user?.photo_url || "https://github.com/KauanCleuton.png"} />
                </IconButton>
            </Tooltip> */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        mt: 6,
                        backgroundColor: theme.palette.secondary.main, // Cor de fundo preta
                        color: theme.palette.primary.main, // Cor do texto laranja
                        width: '200px', // Defina o tamanho do menu aqui
                    }
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Link href={role === 'ADMIN' ? "/perfil" : "/perfil"} passHref>
                {/* <Link href={role === 'ADMIN' ? "/admin/perfil" : "/perfil"} passHref>*/}
                {/* ESSE É O CERTO TROQUEI SO PRA TESTAR */}
                    <MenuItem onClick={handleClose} sx={{ color: theme.palette.primary.main, px: 3 }}>Perfil</MenuItem>
                </Link>
                <MenuItem onClick={() => {
                    handleLogout()
                    handleClose()
                }} sx={{ color: theme.palette.primary.main, px: 3 }}>Sair</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;
