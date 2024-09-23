import { rubik } from "@/theme"
import { Add, CloseOutlined, Delete, Edit } from "@mui/icons-material"
import { Box, Divider, FormControlLabel, Grid, IconButton, Switch, Typography, useTheme } from "@mui/material"
import Image from "next/image"
import Link from "next/link"




const TableProducts = ({ data, onDelete, onAdminOrUserAction, toggleVisible }) => {
    const theme = useTheme()

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

                                    fontSize: { lg: '12px', xs: '10px' },
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
                                width: 70,
                                height: 70,
                                position: 'relative'
                            }}>
                                <Image src={data.file_url} alt="Imagem do produto" layout="fill" style={{
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
                                    color: theme.palette.text.secondary
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

                                    fontSize: { lg: '12px', xs: '10px' },
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary
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

                                    fontSize: { lg: '12px', xs: '10px' },
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary
                                }}
                            >
                                {parseInt(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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

                                    fontSize: { lg: '12px', xs: '10px' },
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary
                                }}
                            >
                                {data.Category.name}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} lg={2} md={2} sm={2}>
                        <Grid container direction='row' >
                            <Grid item xs={4}>
                                <IconButton LinkComponent={Link} href={`/admin/produtos/${data.idProducts}`}>
                                    <Edit color="action" sx={{
                                        width: { lg: 25, xs: 12 }, height: { lg: 25, xs: 12 },
                                        color: theme.palette.background.bgAmareloPrimary
                                    }} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton onClick={() => onDelete(data.idUser)}>
                                    <Delete color="action" sx={{
                                        width: { lg: 25, xs: 12 },
                                        height: { lg: 25, xs: 12 },
                                        color: theme.palette.error.main
                                    }} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={<Switch checked={data.isVisible} onChange={() => toggleVisible(data.idProducts)} />}
                                    label={data.isVisible ? 'Visível' : 'Invisível'}
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