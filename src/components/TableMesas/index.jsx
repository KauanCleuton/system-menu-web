import { rubik } from "@/theme"
import { Add, CloseOutlined, Delete, Edit } from "@mui/icons-material"
import { Box, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material"
import Link from "next/link"




const TableMesas = ({ data, onDelete, onOpenModal }) => {
    const theme = useTheme()
    return (
        <Grid item xs={12} container px={1} py={1}>
            <Grid item xs={12}>
                <Grid container alignItems={"center"} justifyContent="space-between">
                    <Grid item xs={2} lg={2} sm={2} md={2} >
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
                                {data.idMesa}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} lg={2} sm={2} md={2}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: {lg: "center", xs: 'flex-start'}
                        }}>
                            <Typography
                                variant="body1"
                                sx={{

                                    fontSize: { lg: '12px', xs: '10px' },
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary
                                }}
                            >
                                {data.name}
                            </Typography>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={2} lg={2} sm={2} md={2}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: {lg: "center", xs: 'flex-start'}
                        }}>
                            <Typography
                                variant="body1"
                                sx={{

                                    fontSize: { lg: '12px', xs: '10px' },
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary
                                }}
                            >
                                {data.status}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={3} lg={3} sm={3} md={3}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: {lg: "center", xs: 'flex-start'}
                        }}>
                            <Typography
                                variant="body1"
                                sx={{

                                    fontSize: { lg: '12px', xs: '10px' },
                                    fontWeight: 700,
                                    color: theme.palette.text.secondary
                                }}
                            >
                                {data.capacity}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={2} lg={2} sm={2} md={2}>
                        <Grid container direction='row' justifyContent={{lg: "center", md: 'center', sm: 'flex-end', xs: 'flex-end'}}>
                            <Grid item>
                                <IconButton onClick={() => onOpenModal(data.idMesa,data)}> 
                                    <Edit color="action" sx={{
                                        width: {lg: 25, xs: 12}, height: {lg: 25, xs: 12},
                                        color: theme.palette.background.bgAmareloPrimary
                                    }} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => onDelete(data.idMesa)}>
                                    <Delete color="action" sx={{
                                        width: {lg: 25, xs: 12},
                                        height: {lg: 25, xs: 12},
                                        color: theme.palette.error.main
                                    }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TableMesas