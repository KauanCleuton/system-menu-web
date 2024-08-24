import Sidebar from "@/components/SideBarAdmin"

const { Box, Container, Grid, Paper } = require("@mui/material")


const Layout = ({ children }) => {
    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            py: 10,
        }}>
            <Container maxWidth="xl" sx={{
                py: 6
            }}>
                <Grid container spacing={2} >
                    <Grid item lg={3} px={3}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs={12} lg={9} >
                        <Box component={Paper} elevation={1} sx={{
                            width: "100%",
                            p: 2
                        }}>
                            <Grid container >
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