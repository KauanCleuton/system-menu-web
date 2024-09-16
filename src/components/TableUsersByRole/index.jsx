import { rubik } from "@/theme"
import { Add, CloseOutlined, Delete, Edit } from "@mui/icons-material"
import { Box, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material"
import Link from "next/link"




const TableUsersByRole = ({ data, onDelete, onAdminOrUserAction }) => {
    const theme = useTheme()
    return (
        <Grid item xs={12} container px={1} py={1}>
            <Grid item xs={12}>
                <Grid container alignItems={"center"} justifyContent="space-between">
                    <Grid item xs={2}>
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
                                {data.id}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
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
                                {data.name}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
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
                                {data.phone}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
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
                                {data.role}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container spacing={1} justifyContent="flex-end">
                            <Grid item>
                                <IconButton LinkComponent={Link} href={`/admin/administradores/${data.id}`}>
                                    <Edit color="action" sx={{
                                        width: 25, height: 25,
                                        color: theme.palette.background.bgAmareloPrimary
                                    }} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => onDelete(data.id)}>
                                    <Delete color="action" sx={{
                                        width: 25,
                                        height: 25,
                                        color: theme.palette.error.main
                                    }} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                {data.role === 'USER' ? (
                                    <IconButton onClick={() => onAdminOrUserAction(data.id)}>
                                        <Add color="action" sx={{
                                            width: 25, height: 25,
                                            color: theme.palette.primary.main
                                        }} />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => onAdminOrUserAction(data.id)}>
                                        <CloseOutlined sx={{ width: 25, height: 25, color: theme.palette.primary.main }} color="action" />
                                    </IconButton>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TableUsersByRole