import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Grid, Box, Container, Menu, MenuItem, Avatar, useScrollTrigger, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import BadgeCart from '../BadgeCart';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import ModalLogin from '../ModalLogin';
import { SET_LOGIN_MENU } from '@/store/actions';
import Link from 'next/link';
import { isLoggedIn } from '@/utils/auth';
import userService from '@/service/user.service';
import { AccountCircle } from '@mui/icons-material';
import UserMenu from '../MenuProfile';

const Header = () => {
    const totalItems = useSelector(state => state.cart.totalItems);
    const path = usePathname();
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    const [userData, setUserData] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const loginMenuOpened = useSelector(state => state.login.opened);
    const dispatch = useDispatch();

    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_LOGIN_MENU, opened: true, mode: 'login' });
    };

    const handleClose = () => process.env.NODE_ENV !== 'production' && console.log('teste2');

    const handleLogout = () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        window.location.reload();
    };

    const fetchUserData = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const response = await userService.getUser(accessToken);
            setUserData(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuário logado!', error);
            throw error;
        }
    };

    useEffect(() => {
        if (isLoggedIn()) {
            fetchUserData();
        }
    }, []);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Modal
                open={loginMenuOpened}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    height: "100vh",
                    overflowY: "auto"
                }}
            >
                <ModalLogin />
            </Modal>
            <Box>
                <AppBar
                    elevation={4}
                    position={trigger ? 'fixed' : 'absolute'}
                    sx={{
                        width: '100vw',
                        backgroundColor: trigger || path !== '/' ? "#000000" : "transparent",
                        color: trigger || path !== '/' ? "#fff" : "#fff",
                        transition: "background-color 0.3s, color 0.3s"
                    }}
                >
                    <Container fixed>
                        <Toolbar disableGutters>
                            <Grid container alignItems="center" justifyContent={"space-between"}>
                                <Grid item sx={{ textAlign: 'center' }}>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-start"
                                    }}>
                                        <Box
                                            component={Link}
                                            href="/"
                                            sx={{
                                                width: "74px",
                                                height: '74px',
                                                position: "relative"
                                            }}
                                        >
                                            <Image
                                                src="/img/logo.svg"
                                                alt="Logo do Site"
                                                layout='fill'
                                                style={{ objectFit: "cover" }}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-end"
                                    }}>
                                        {userData ? (
                                            <>
                                                <IconButton onClick={handleOpenMenu}>
                                                    <Avatar
                                                        src={userData?.photo_url || "https://github.com/KauanCleuton.png"}
                                                        alt={userData?.name || "User Avatar"}
                                                        sx={{ width: 32, height: 32, mr: 1 }}
                                                    />
                                                    <Typography variant='body1' sx={{ color: '#fff' }}>
                                                        {userData?.name}
                                                    </Typography>
                                                </IconButton>
                                                <UserMenu anchorEl={anchorEl} handleClose={handleCloseMenu} handleLogout={handleLogout} />
                                            </>
                                        ) : (
                                            <IconButton onClick={handleLeftDrawerToggle}>
                                                <AccountCircle sx={{
                                                    color: trigger || path !== '/' ? "#FF4D00" : "#fff",
                                                }} />
                                            </IconButton>
                                        )}
                                        <BadgeCart totalItems={totalItems} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </>
    );
};

export default Header;
