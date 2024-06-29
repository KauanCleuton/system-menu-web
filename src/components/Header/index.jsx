import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, Box, useScrollTrigger, Modal, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import BadgeCart from '../BadgeCart';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import ModalLogin from '../ModalLogin';
import { SET_LOGIN_MENU } from '@/store/actions';
import Link from 'next/link';

const Header = () => {
    const totalItems = useSelector(state => state.cart.totalItems);
    const path = usePathname();
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    const [drawerOpen, setDrawerOpen] = useState(false)
    // const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const loginMenuOpened = useSelector((state) => state.login.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_LOGIN_MENU, opened: true, mode: 'login' });
    };
    const handleClose = () => process.env.NODE_ENV !== 'production' && console.log('teste2');
    
    return (
        <>
            <Modal
                open={loginMenuOpened}
                onClose={handleClose}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                            <Grid item >
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}>
                                    <IconButton onClick={handleLeftDrawerToggle}>
                                        <AccountCircleIcon sx={{
                                            color: trigger || path !== '/' ? "#FF4D00" : "#fff",
                                        }} />
                                    </IconButton>
                                    <BadgeCart totalItems={totalItems} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>

                </AppBar>
            </Box>
        </>
    );
};

export default Header;
