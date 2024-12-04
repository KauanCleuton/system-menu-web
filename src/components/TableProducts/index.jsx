import { rubik } from "@/theme"
import { Add, CloseOutlined, Delete, Edit } from "@mui/icons-material"
import { Box, Divider, FormControlLabel, Grid, IconButton, Switch, Typography, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image"
import Link from "next/link"




const TableProducts = ({ data, onDelete, onAdminOrUserAction, toggleVisible }) => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };
    return (
        <Grid item xs={12} container px={1} py={1}>
            <Grid item xs={12}>
                <Grid container alignItems={"center"} justifyContent="space-between">
                    {/* <Grid item sx={{ display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' } }}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary
                                }}
                            >
                                {data.idProducts}
                            </Typography>
                        </Box>
                    </Grid> */}
                    <Grid item xs={2} lg={2} md={2} sm={2}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: { lg: "center", xs: 'center' }
                        }}>
                            <Box sx={{
                                width: {xs: 35, lg: 70},
                                height: {xs: 35, lg: 70},
                                position: 'relative'
                            }}>
                                <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}${data.file_url}`} alt="Imagem do produto" layout="fill" style={{
                                    objectFit: 'contain',
                                }} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} sm={2}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: 'center'
                        }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary,
                                    wordBreak: 'break-all',      
                                    overflowWrap: 'break-word', 
                                    whiteSpace: 'normal',
                                    width: '9ch',
                                    textAlign: 'center',
fontSize: {xs: 10, lg: 16}

                                }}
                            >
                                {data.title}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} sm={2}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary,
                                    wordBreak: 'break-all',      
                                    overflowWrap: 'break-word', 
                                    whiteSpace: 'normal',
                                    width: '12ch',
                                    textAlign: "center",
fontSize: {xs: 10, lg: 16}

                                }}
                            >
                                {data.description}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} sm={2}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary,
fontSize: {xs: 10, lg: 16}

                                }}
                            >
                                {parseFloat(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} sm={2}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary,
fontSize: {xs: 10, lg: 16}

                                }}
                            >
                                {data.Category.name}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} sm={2}>
                        <Grid container direction='row' justifyContent='center' alignItems='center' >
                            <Grid item xs={4}>
                                <IconButton LinkComponent={Link} href={`/admin/produtos/${data.idProducts}`}>
                                    <Edit color="action" sx={{
                                        width: { lg: 25, xs: 20 }, height: { lg: 25, xs: 20 },
                                        color: theme.palette.background.bgAmareloPrimary
                                    }} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton onClick={() => onDelete(data.idProducts)}>
                                    <Delete color="action" sx={{
                                        width: { lg: 25, xs: 20 },
                                        height: { lg: 25, xs: 20 },
                                        color: theme.palette.error.main
                                    }} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={<Switch size={isSmallScreen ? 'small' : 'large'}  checked={data.isVisible} onChange={() => toggleVisible(data.idProducts)} />}
                                    // label={data.isVisible ? 'Visível' : 'Invisível'}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TableProducts