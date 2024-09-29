"use client"
import Sidebar from "@/components/SideBarAdmin"
import { Box, Container, Grid, Paper, useTheme } from "@mui/material"


const Layout = ({ children }) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                width: "100vw",
                height: '100%',
                py: 12,
                display: "flex",
                mb: 5,
                paddingRight: '14px',
                paddingBottom: '300px'
            }}>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={3} md={12}>
                        <Box sx={{
                            // maxWidth: "320px",
                            width: "100%",
                            // height: "900px",
                            display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
                            // background: theme.palette.primary.main,

                        }}>
                            <Grid item xs={12} >
                                <Sidebar />
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={9} md={12}>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                // bgcolor: { lg: "#09e653", xs: "transparent" },
                                height: '100%',
                                p: 2,
                                borderRadius: '10px',
                                boxShadow: 2,
                            }}
                        >

                            {children}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Layout