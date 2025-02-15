"use client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { CLOSE_ALERT, SET_ALERT, SET_THEME, SYNC_THEME, SYNC_THEME_UPDATE } from "@/store/actions";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import store from "@/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SnackBar from "@/components/SnackBar";
import { createCustomTheme } from "@/theme";
import { ThemeServiceNoAuth } from "@/service/theme.service";
import { NotificationsUser } from "@/service/notifications.service";

const themeSv = new ThemeServiceNoAuth();
const notificationSv = new NotificationsUser()


function AppTemplate({ children }) {
  const [colorsTheme, setColorsTheme] = useState({
    primary: "#FF4D00",
    secondary: "#000",
  });
  const themeUpdate = useSelector((state) => state.themeUpdate.themeUpdated);

  const favicon = useSelector((state) => state.theme.favicon);
  const title = useSelector((state) => state.theme.title);
  const [notifications, setNotifications] = useState([])

  const dispatch = useDispatch();

  const fetchThemeOnLoad = async () => {
    try {
      const domain = window.location.hostname;
      const response = await themeSv.getThemeByDomain(domain);
      const themeData = response.find((item) => item.visibleTheme === true);
      if (themeData) {
        setColorsTheme({
          primary:
            themeData.primary && /^#[0-9A-F]{6}$/i.test(themeData.primary)
              ? themeData.primary
              : "#FF4D00",
          secondary:
            themeData.secondary && /^#[0-9A-F]{6}$/i.test(themeData.secondary)
              ? themeData.secondary
              : "#000",
        });
        dispatch({ type: SET_THEME, payload: themeData });
        dispatch({
          type: "SYNC_THEME_UPDATE",
          payload: false,
        });
      } else {
        console.error("Nenhum tema visível encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar tema:", error);
    }
  };

  const fetchThemeOnUpdate = async () => {
    try {
      const domain = window.location.hostname;
      const response = await themeSv.getThemeByDomain(domain);
      const themeData = response.find((item) => item.visibleTheme === true);

      console.log("Atualizando tema:", themeData);

      if (themeData) {
        setColorsTheme({
          primary:
            themeData.primary && /^#[0-9A-F]{6}$/i.test(themeData.primary)
              ? themeData.primary
              : "#FF4D00",
          secondary:
            themeData.secondary && /^#[0-9A-F]{6}$/i.test(themeData.secondary)
              ? themeData.secondary
              : "#000",
        });

        dispatch({ type: SET_THEME, payload: themeData });

        dispatch({
          type: SYNC_THEME_UPDATE,
          payload: false,
        });
      } else {
        console.error("Nenhum tema visível encontrado.");
      }
    } catch (error) {
      console.error("Erro ao atualizar tema:", error);
    }
  };

  useEffect(() => {
    fetchThemeOnLoad();
  }, [dispatch]);

  useEffect(() => {
    if (themeUpdate) {
      fetchThemeOnUpdate();
    }
  }, [themeUpdate, dispatch]);

  const Session = () => {
    const alert = useSelector((state) => state.alert);

    useEffect(() => {
      dispatch({ type: "SET_LOGIN_DATA" });
    }, [dispatch]);

    return (
      <SnackBar
        open={alert.open}
        onClose={() => dispatch({ type: CLOSE_ALERT })}
        message={alert.message}
        severity={alert.severity}
        type={alert.alertType}
        timeStamp={alert.timeStamp}
      />
    );
  };

  
  const fetchNotifications = async () => {
    try {
      const response = await notificationSv.getNotification();
  
      if (response.length > 0) {
        const audio = new Audio('/notification.mp3');
        audio.play();
  
        // Atualizar o estado da notificação
        dispatch({
          type: SET_ALERT,
          message: response[0].message,
          timestamp: response[0].timestamp,
          alertType: 'notification',
        });
  
        console.log(response[0].message, '2391239129');
        setNotifications(response); 
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  };
  
  
  useEffect(() => {
    fetchNotifications();
    
    const interval = setInterval(fetchNotifications, 20000);
    return () => clearInterval(interval);
  }, []);




  return (
    <ThemeProvider theme={createCustomTheme(colorsTheme.primary, colorsTheme.secondary)}>
      <Head>
        <title>{title ? title : "Vishi Delivery"}</title>
        <link rel="icon" href={favicon ? `${favicon}?v=${Date.now()}` : "https://avatars.githubusercontent.com/u/113728447?v=4"} />
      </Head>
      <Session />
      <CssBaseline />
      <Header />
      <Box>{children}</Box>
      <Footer />
    </ThemeProvider>
  );
}

export default function Template({ children, pageProps }) {
  return (
    <Provider store={store}>
      <AppTemplate>{children}</AppTemplate>
    </Provider>
  );
}
