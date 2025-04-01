import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Grid, Box, Container, Menu, MenuItem, Avatar, useScrollTrigger, Modal, Typography, useTheme,styled, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import BadgeCart from '../BadgeCart';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import ModalLogin from '../ModalLogin';
import { SET_LOGIN_MENU } from '@/store/actions';
import Link from 'next/link';
import { extractDataFromSession, isLoggedIn } from '@/utils/auth';
import userService from '@/service/user.service';
import { AccountCircle } from '@mui/icons-material';
import UserMenu from '../MenuProfile';
import SnackBar from '../SnackBar';
import AdminService from "@/service/admin.service"

const adminSv = new AdminService();

const StyledAvatar = styled(Avatar)({
    width: '40px',
    height: '40px',
    cursor: 'pointer'
});

const Header = () => {
    const theme = useTheme()
    const logo = useSelector(state => state.theme.logo)
    const totalItems = useSelector(state => state.cart.totalItems);
    const path = usePathname();
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    // const userData = useSelector(state => state.login.data)
    const [anchorEl, setAnchorEl] = useState(null);
    const loginMenuOpened = useSelector(state => state.login.opened);
    const dispatch = useDispatch();
    const router = useRouter()
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_LOGIN_MENU, opened: true, mode: 'login' });
    };
    const [userData, setUserData] = useState({})
    const handleClose = () => process.env.NODE_ENV !== 'production' && console.log('teste2');

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/")
    };

    const getData = async () => {
        try {
            const response = await adminSv.getUserData()

            setUserData(response)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        if(isLoggedIn()) {
            getData()
        }
    }, [])
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
                        backgroundColor: trigger || path !== '/' ? theme.palette.secondary.main : "transparent",
                        color: trigger || path !== '/' ? theme.palette.primary.white : theme.palette.primary.white,
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
                                        justifyContent: "flex-start",
                                        p: 1
                                    }}>
                                        <Box
                                            component={Link}
                                            href="/"
                                            sx={{
                                                width: "67px",
                                                height: '67px',
                                                position: "relative"
                                            }}
                                        >
                                            <Image
                                                src={logo ? logo : theme.palette.primary.logo}
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
                                        {isLoggedIn() ? (
                                            <>
                                                <IconButton onClick={handleOpenMenu} >
                                                    {userData?.photo_url ? (
                                                        // <StyledAvatar src={userData.photo_url} sx={{width: 40, height: 40, mr: 1}} />
                                                        <Avatar
                                                            src={userData?.photo_url}
                                                            alt={userData?.name || "User Avatar"}
                                                            sx={{ width: {xs: 45, sm: 45, md: 50, lg: 50}, height: {xs: 45, sm: 45, md: 50, lg: 50}, mr: 1,  border: trigger && `2px solid ${theme.palette.primary.main}` }}
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            alt={userData?.name || "User Avatar"}
                                                            sx={{ width: {xs: 45, sm: 45, md: 50, lg: 50}, height: {xs: 45, sm: 45, md: 50, lg: 50}, mr: 1,  border: trigger && `2px solid ${theme.palette.primary.main}`  }}
                                                        >
                                                        {userData?.name ? userData.name.charAt(0).toUpperCase() : null}
                                                        </Avatar>
                                                    )}
                                                    <Typography
                                                        variant='body1'
                                                        sx={{ color: '#fff', display: { xs: "none", lg: "block", md: "block", sm: "block" } }}
                                                    >
                                                        {userData?.name}
                                                    </Typography>
                                                </IconButton>
                                                <UserMenu anchorEl={anchorEl} handleClose={handleCloseMenu} handleLogout={handleLogout} user={userData} />
                                            </>
                                        ) : (
                                            <IconButton onClick={handleLeftDrawerToggle}>
                                                <AccountCircle sx={{
                                                    color: trigger || path !== '/' ? theme.palette.primary.main : "#fff",
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
            <SnackBar />
        </>
    );
};

export default Header;
