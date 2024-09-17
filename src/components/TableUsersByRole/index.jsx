import { rubik } from "@/theme"
import { Add, CloseOutlined, Delete, Edit } from "@mui/icons-material"
import { Box, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material"
import Link from "next/link"




const TableUsersByRole = ({ data, onDelete, onAdminOrUserAction }) => {
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
                    <Grid item xs={3} lg={2} md={2} sm={3} sx={{display: {lg: 'block', md: 'block', sm: 'none',xs: 'none'}}}>
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
                                {data.idUser}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3} lg={2} md={2} sm={3}>
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
                    <Grid item xs={3} lg={2} md={2} sm={3}>
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
                                {formatPhoneNumber(data.phone)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3} lg={2} md={2} sm={3}>
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
                    <Grid item xs={3} lg={2} md={2} sm={3}>
                        <Grid container direction='row'  justifyContent={{lg: "center", md: 'center', sm: 'flex-end', xs: 'flex-end'}}>
                            <Grid item>
                                <IconButton LinkComponent={Link} href={`/admin/administradores/${data.idUser}`}>
                                    <Edit color="action" sx={{
                                        width: {lg: 25, xs: 12}, height: {lg: 25, xs: 12},
                                        color: theme.palette.background.bgAmareloPrimary
                                    }} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => onDelete(data.idUser)}>
                                    <Delete color="action" sx={{
                                        width: {lg: 25, xs: 12},
                                        height: {lg: 25, xs: 12},
                                        color: theme.palette.error.main
                                    }} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                {data.role === 'USER' ? (
                                    <IconButton onClick={() => onAdminOrUserAction(data.idUser)}>
                                        <Add color="action" sx={{
                                            width: {lg: 25, xs: 12}, height: {lg: 25, xs: 12},
                                            color: theme.palette.primary.main
                                        }} />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={() => onAdminOrUserAction(data.id)}>
                                        <CloseOutlined sx={{ width: {lg: 25, xs: 12}, height: {lg: 25, xs: 12}, color: theme.palette.primary.main }} color="action" />
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