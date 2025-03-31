"use client"
import BadgeCart from "@/components/BadgeCart"
import { PermIdentityOutlined } from "@mui/icons-material"
import { Box, Container, Grid, IconButton, Typography, useTheme } from "@mui/material"
import Image from "next/image"
import { useSelector } from "react-redux"

const TopSection = () => {
    const logo = useSelector(state => state.theme.logo)
    const address = useSelector(state => state.theme.address)
    const name = useSelector(state => state.theme.name)
    const theme = useTheme()
    return (
        <Box
            sx={{
                width: "100vw",
                height: { xs: 330, sm: 350, md: 380, lg: 506 },
                position: "relative",
                overflow: 'hidden',
                py: { lg: 2, xs: 7 },
                mt: -8,
                zIndex: -1,
                "&::before": {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `linear-gradient(
                        rgba(14, 14, 14, 0.626), 
                        #23212117
                      ),
                      url(/img/bg.svg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 50%',
                    transform: 'scaleX(-1)',
                }
            }}
        >
            <Box sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                py: { lg: 16, xs: 2 },
            }}>
                <Container
                    fixed
                    sx={{
                        display: "flex",
                        justifyContent: 'center',
                        height: "100%",
                        [theme.breakpoints.only('xs')]: {
                            p: 0
                        }
                    }}
                >
                    <Grid container >
                        <Grid item xs={12}>
                            <Grid container spacing={'1px'}>
                                <Grid item xs={12} >
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        <Box
                                            sx={{
                                                width: { lg: '200px', md: "140px", sm: '120px', xs: '110px' },
                                                height: { lg: '190px', md: "140px", sm: '120px', xs: '110px' },
                                                position: "relative",
                                                borderRadius:'100%'
                                            }}
                                        >
                                            <Image
                                                alt="Image do hamburguer"
                                                src={ logo ? logo : theme.palette.primary.logo}
                                                style={{ cursor: 'pointer', objectFit: "contain", borderRadius: "50%" }}
                                                layout="fill"
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} container spacing={'16px'}>
                                    <Grid item xs={12} >
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Typography sx={{ textAlign: "center", 
                                                fontSize: { lg: 35, md: 26, sm: 24, xs: 20 }, fontWeight: 'bold', color: "#fff" 
                                                }} >
                                                {name ? name : 'Vishi Delivery'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Typography sx={{ textAlign: "center", fontSize: { lg: 16, md: 14, sm: 12, xs: 11 }, fontWeight: '500', color: "#fff" }} >
                                                {address ? address : 'Rua São Cristóvão - 93, Santo Antônio, Guaiúba - CE'}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                                <Typography
                                                    sx={{
                                                        py: '10px',
                                                        px: '8px',
                                                        borderRadius: '4px',
                                                        display: "flex",
                                                        // bgcolor: '#54CC0A',
                                                        bgcolor: theme.palette.primary.main,
                                                        fontSize: { lg: 16, md: 14, sm: 12, xs: 9 },
                                                        fontWeight: 'bold',
                                                        color: "#fff",
                                                        justifyContent: "center",

                                                    }}
                                                >
                                                     Todos os dias – 17h às 00h
                                                </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Container>
            </Box>

        </Box>
    )
}

export default TopSection