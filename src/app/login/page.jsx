"use client"
import AuthLogin from "@/components/ModalLogin/components/AuthLogin"
import AuthRegister from "@/components/ModalLogin/components/AuthRegister"
import AuthForgotPassword from "@/components/ModalLogin/components/AuthResetPassword"
import VerifyToken from "@/components/ModalLogin/components/VerifyToken"
import { ResetPassword } from "@/service/auth.service"
import { SET_LOGIN_MENU } from "@/store/actions"
import { Box, Container, Grid } from "@mui/material"
import Image from "next/image"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Login = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.login.mode);
    const setMode = (mode) => dispatch({ type: SET_LOGIN_MENU, mode: mode });
    const [phone, setPhone] = useState("")

    return (
        <Box sx={{
            width: "100%",
            bgcolor: "#343434ac",
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 5
        }}>


            <Container fixed>
                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        width: { xs: 350, lg: 475 },
                        height: 'auto',
                        p: 2,
                        bgcolor: "#121212",
                        boxShadow: 1,
                        borderRadius: '12px'
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <Box sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Box sx={{
                                        width: 150,
                                        height: 150,
                                        position: "relative"
                                    }}>
                                        <Image
                                            src="/img/logo.svg"
                                            style={{
                                                objectFit: "cover"
                                            }}
                                            layout="fill"
                                            alt="Logo Vishi Delivery"
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>

                                {mode === 'login' && <AuthLogin setMode={setMode} />}
                                {mode === 'register' && <AuthRegister setMode={setMode} />}
                                {mode === 'forgotPassword' && <AuthForgotPassword setPhone={setPhone} setMode={setMode} />}
                                {mode === 'verifyToken' && <VerifyToken setMode={setMode} />}
                                {mode === 'resetPassword' && <ResetPassword setMode={setMode} phone={phone} />}

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container >
        </Box >
    )
}

export default Login
