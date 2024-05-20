import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, Box, useScrollTrigger } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import BadgeCart from '../BadgeCart';
import { usePathname } from 'next/navigation';

const Header = () => {
    const totalItems = useSelector(state => state.cart.totalItems);
    const path = usePathname();
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: trigger || path !== '/' ? "#e8e8e8" : "transparent",
                color: trigger || path !== '/' ? "#001928" : "#fff",
                transition: "background-color 0.3s, color 0.3s"
            }}
        >
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item xs={11} sx={{ textAlign: 'center' }}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-start"
                        }}>
                            <Typography variant="h6" component="div">
                                Seu Logo
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end"
                        }}>
                            <IconButton>
                                <AccountCircleIcon sx={{
                                    color: trigger || path !== '/' ? "#001928" : "#fff",
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
