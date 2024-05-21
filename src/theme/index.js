import { Roboto, Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import palette from './palette';

export const roboto = Inter({
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette,
  //palette: {
  //  primary: {
  //    main: '#002147',
  //  },
  //  secondary: {
  //    main: '#FFB606',
  //  },
  //  cian: {
  //    main: '#59d9f8',
  //  },
  //  error: {
  //    main: '#ff1744',
  //  },
  //  orange: { main: '#ff9b30' },
  //  background: {
  //    header: '#ff9b30',
  //  },
  //  texta: {
  //    main: 'rgba( 0, 0, 0, 0.7)',
  //  },
  //  text: {
  //    primary: 'rgba(255, 255, 255, 1)', // White text for dark backgrounds
  //    secondary: 'rgba( 0, 0, 0, 0.7 )', // Black text for light backgrounds
  //    light: 'rgba(0, 33, 71, 1)',
  //  },
  //},
  typography: {
    h1: {
      color: '#FFFFFF',
      fontSize: '145px',
      fontWeight: '900',
      textShadow: '0px 3.86px 3.86px rgba(0, 0, 0, 0.25)',
    },
    h2: {
      color: '#FFFFFF',
      fontSize: '52px',
      fontWeight: '700',
      textShadow: '0px 3.86px 3.86px rgba(0, 0, 0, 0.25)',
    },
    h3: {
      color: '#FFFFFF',
      fontSize: '36px',
      fontWeight: '700',
      textShadow: '0px 3.86px 3.86px rgba(0, 0, 0, 0.25)',
    },
    h4: {
      color: '#FFFFFF',
      fontSize: '36px',
      fontWeight: '600',
    },
    h5: {
      color: 'rgba(0, 33, 71, 1)',
      fontSize: '28px',
      fontWeight: '600',
    },
    //h4: {
    //  color: 'rgba(18, 25, 38, 1)',
    //  lineHeight: 1.2,
    //  fontWeight: 700,
    //  fontSize: '1.5rem',
    //},
    card: {
      color: '#FFFFFF',
      fontSize: '25px',
      fontWeight: '900',
      textShadow: '0px 3.86px 3.86px rgba(0, 0, 0, 0.25)',
    },
    card2: {
      color: '#FFFFFF',
      fontSize: '16px',
      fontWeight: '300',
    },
    table: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      fontSize: '0.7rem',
    },

    h7: {
      fontSize: '0.9rem',
      lineHeight: '1.1rem',
      color: '#FFFFFF',
      fontWeight: '300',
    },
    tooltip: {
      color: 'rgba( 0, 0, 0, 0.7 )',
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
    },
    subtitle: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
    subtitle1: {
      fontSize: '0.7rem',
      lineHeight: '1rem',
      color: 'rgba( 0, 0, 0, 0.5 )',
    },
    body: {
      fontSize: '1.125rem',
      color: 'rgba( 255, 255, 255, 0.9 )',
    },

    body1: {
      fontSize: '0.8rem',
      //color: 'rgba( 255, 255, 255, 0.7 )',
    },
    footerMenu: {
      fontSize: '0.8rem',
      //color: 'rgba( 255, 255, 255, 0.7 )',
    },
    titleLogin: {
      fontSize: '2.125rem',
    },
    subtitleLogin: {
      fontSize: '1rem'
    },
    logo: {
      fontSize: '0.8rem',
      //color: 'rgba( 255, 255, 255, 0.7 )',
    },
    body2: {
      fontSize: '1.125rem',
      color: 'rgba( 255, 255, 255, 0.9 )',
      textShadow: '0px 3.86px 3.86px rgba(0, 0, 0, 0.25)',
    },
    h8: {
      fontSize: '1.2rem',
      fontWeight: '500',
      color: 'rgba(18, 25, 38, 0.9)',
    },
    navbarlink: {
      textDecorationLine: 'inherit',
      color: '#FFFFFF',
      textTransform: 'uppercase',
    },
    link: {
      fontSize: '0.8rem',
      color: palette.text.link,
      textDecorationLine: 'inherit',
      cursor: 'pointer',
    },
    fontFamily: roboto.style.fontFamily,
  },
});
// theme.components = componentStyleOverrides(theme);

export default theme;
