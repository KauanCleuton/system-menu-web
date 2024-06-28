import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, Box, useScrollTrigger } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import BadgeCart from '../BadgeCart';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
    const totalItems = useSelector(state => state.cart.totalItems);
    const path = usePathname();
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: trigger || path !== '/' ? "#000000" : "transparent",
                color: trigger || path !== '/' ? "#fff" : "#fff",
                transition: "background-color 0.3s, color 0.3s"
            }}
        >
            <Toolbar>
                <Grid container alignItems="center" justifyContent={"space-between"}>
                    <Grid item sx={{ textAlign: 'center' }}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-start"
                        }}>
                            <Box
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
                            <IconButton>
                                <AccountCircleIcon sx={{
                                    color: trigger || path !== '/' ? "#FF4D00" : "#fff",
                                }} />
                            </IconButton>
                            <BadgeCart totalItems={totalItems} />
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
