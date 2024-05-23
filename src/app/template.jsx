"use client"
import Header from "@/components/Header";
import store from "@/store";
import theme from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";


export default function Template ({children}) {
    return (
        <Provider store={store}>
            {/* <ThemeProvider theme={theme}> */}
                <Header />
                {/* <CssBaseline /> */}
                {children}
            {/* </ThemeProvider> */}
        </Provider>
    )
}