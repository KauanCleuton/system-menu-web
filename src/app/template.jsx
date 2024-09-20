'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider, useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { CLOSE_ALERT, SET_ALERT, SET_LOGIN_DATA } from '@/store/actions';
import { Box } from '@mui/material';
// import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { isLoggedIn } from '@/utils/auth';
import theme from '@/theme';
import store from '@/store';
import Footer from '@/components/Footer';
import SnackBar from '@/components/SnackBar';

export default function Template({ children, pageProps }) {
  console.log(pageProps)
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
        type={alert.type}
      />
    );
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
