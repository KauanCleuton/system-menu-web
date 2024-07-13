"use client"
import { Box, Container, Grid, Paper, useTheme } from "@mui/material"
import { useState } from "react"
import Sidebar from "@/components/SideBarAdmin"


const Layout = ({ children }) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                bgcolor: "#141414"
            }}>
            <Container fixed maxWidth="lg">
                <Grid container >
                    <Grid item xs={"auto"}>
                        <Box sx={{
                            maxWidth: "320px",
                            width: "100%",
                            display: { lg: "flex", md: "flex", sm: "none", xs: "none" },

                        }}>
                            <Grid item xs={12} >
                                <Sidebar />
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                py: 3
                            }}
                        >

                            <Grid item xs={12} >
                                {children}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Layout