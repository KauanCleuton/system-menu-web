import { createTheme } from '@mui/material/styles'; // Certifique-se de importar createTheme
import { Roboto, Inter } from 'next/font/google';

export const roboto = Inter({
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});

export const createCustomTheme = (primaryColor, secondaryColor) => {
  return createTheme({
    palette: {
      primary: {
        main: primaryColor,
        light: 'rgba(238,238,238,0.933)',
        headerText: 'rgba(255, 255, 255, 1)',
        white: "#fff",
        logo: "/img/logo.svg",
        red: "#e01212"
      },
      secondary: {
        main: secondaryColor,
        light: '#EF9900',
        headerText: '#FF4D00',
      },
      cian: {
        main: '#59d9f8',
      },
      error: {
        main: '#ff1744',
      },
      success: {
        main: "#156124"
      },
      orange: { main: '#ff9b30' },
      background: {
        header: '#ff9b30',
        bgAmareloPrimary: "#FFB606",
        bgIconFacebook: "linear-gradient(180deg, #18ACFE 0%, #0163E0 99.7%)",
        bgIconApple: "#283544",
        bgLogin: "linear-gradient(132.03deg, #FF4D00 12.31%, #024796 90.86%)",
        bgPrimary: "#FF4D00"
      },
      texta: {
        main: 'rgba( 0, 0, 0, 0.7)',
      },
      text: {
        primary: 'rgba(255, 255, 255, 1)', // White text for dark backgrounds
        secondary: 'rgba( 0, 0, 0, 0.7 )', // Black text for light backgrounds
        light: 'rgba(0, 33, 71, 1)',
        link: '#FF4D00',
        amareloSaber: "#FFB606",
        azulSaber: "#FF4D00"
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
  });
};
