import { Box, Button, Container, FormControl, FormHelperText, Grid, IconButton, InputLabel, Stack, TextField, Typography, useTheme } from "@mui/material"
import { CloseOutlined, CloseRounded } from "@mui/icons-material";
import Image from "next/image";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN_MENU, SET_MENU } from "@/store/actions";
import AuthCard from "../Card";
import AuthLogin from "./components/AuthLogin";



const ModalLogin = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const mode = useSelector((state) => state.login.mode);
    //const [mode, setMode] = useState('login');
    const setMode = (mode) => dispatch({ type: SET_LOGIN_MENU, mode: mode });
    const closeModal = () => dispatch({ type: SET_LOGIN_MENU, opened: false });

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item  >
                <AuthCard >
                    <Grid container  alignItems="center" justifyContent="center">
                        <Grid item xs={12} >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        mt: '5px'
                                    }}>
                                        <IconButton
                                            onClick={closeModal}
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                color: '#FF4D00'
                                            }}>
                                            <CloseOutlined sx={{ fontSize: 35 }} />
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{
                                        width: 160, height: 160, position: 'relative',
                                    }}>
                                        <Image
                                            src={`/img/logo.svg`}
                                            alt="EADY"
                                            layout="fill"
                                            objectFit="contain"
                                            style={{cursor: "pointer"}}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            {mode === 'login' && <AuthLogin modal setMode={setMode} />}
                            {/* {mode === 'register' && <AuthRegister modal setMode={setMode} />}
                            {mode === 'forgotPassword' && <AuthForgotPassword modal setMode={setMode} />} */}
                        </Grid>
                        {/* <Grid item xs={12} mb={{ xs: 4, md: 8 }}>
                            <AuthSocialButtons />
                        </Grid> */}
                    </Grid>
                </AuthCard>
            </Grid>
        </Grid>
    )
}

export default ModalLogin