"use client"
import Menu from "@/components/Menu";
import { Box, Container, Grid, Paper, Typography, useTheme } from "@mui/material"



const MiddleSection = () => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                py: 2,
            }}
        >
            <Container fixed sx={{ py: '46px', paddingBottom: '60px'}}>
                <Grid container spacing={'34px'}>
                    <Grid item xs={12} >
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Typography variant="h1"
                                sx={{
                                    fontSize: 34,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: theme.palette.secondary.main
                                }}
                            >
                                Conheça nosso menu de opções
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sx={{
                        height: '100%',
                        overflow: "auto",
                        paddingBottom: '50px'
                    }}>
                        <Menu
                        />
                    </Grid>

                </Grid>
            </Container>
        </Box>
    )
}
export default MiddleSection