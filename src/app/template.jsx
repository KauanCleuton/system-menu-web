'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider, useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { CLOSE_ALERT, SET_ALERT, SET_LOGIN_DATA } from '@/store/actions';
import { Box, colors } from '@mui/material';
// import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { isLoggedIn } from '@/utils/auth';
import theme, { createCustomTheme } from '@/theme';
import store from '@/store';
import Footer from '@/components/Footer';
import SnackBar from '@/components/SnackBar';
import ThemeService from '@/service/theme.service';


const themeSv = new ThemeService()
export default function Template({ children, pageProps }) {


  const [colorsTheme, setColorsTheme] = useState({
    primary: "#FF4D00",
    secondary: "#000"  
  });

  useEffect(() => {
    const domain = window.location.hostname;
    const fetchTheme = async () => {
      try {
        const response = await themeSv.getThemeByDomain(domain);
        const themeData = response[0];
        setColorsTheme({
          primary: themeData.primary && /^#[0-9A-F]{6}$/i.test(themeData.primary) ? themeData.primary : '#FF4D00',
          secondary: themeData.secondary && /^#[0-9A-F]{6}$/i.test(themeData.secondary) ? themeData.secondary : '#000'
        });
      } catch (error) {
        console.error("Erro ao buscar tema:", error);
      }
    };

    fetchTheme();
  }, []);



  const Session = () => {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert);
    useEffect(() => {
      dispatch({ type: SET_LOGIN_DATA });
    }, []);



    return (
      <SnackBar
        open={alert.open}
        onClose={() => dispatch({ type: CLOSE_ALERT })}
        message={alert.message}
        severity={alert.severity}
        type={alert.alertType}
      />
    );
  };




  return (
    <Provider store={store}>
      <ThemeProvider theme={createCustomTheme(colorsTheme.primary, colorsTheme.secondary)}>
        <Session />
        <CssBaseline />
        <Header />
        <Box >
          {children}
        </Box>
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}
