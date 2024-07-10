import React from 'react';
import { Menu, MenuItem, Box, Avatar, Tooltip, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AccountCircle } from '@mui/icons-material';
import Link from 'next/link';

const UserMenu = ({ anchorEl, handleClose, handleLogout, user}) => {


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
                        backgroundColor: '#000000', // Cor de fundo preta
                        color: '#FF4D00', // Cor do texto laranja
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
                <Link href="/profile" passHref>
                    <MenuItem onClick={handleClose} sx={{ color: '#FF4D00', px: 3 }}>Perfil</MenuItem>
                </Link>
                <MenuItem onClick={() => {
                    handleLogout()
                    handleClose()
                }} sx={{ color: '#FF4D00', px: 3 }}>Sair</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;
