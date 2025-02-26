import { rubik } from "@/theme"
import { Add, CloseOutlined, Delete, Edit } from "@mui/icons-material"
import { Box, Divider, FormControlLabel, Grid, IconButton, Switch, Typography, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

const TableTransactions = ({ data, onDelete }) => {
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
        <Grid item xs={12} container px={1} py={1} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    {/* Data */}
                    <Grid item xs={2.4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 700, textAlign: 'center', color: theme.palette.text.secondary }}>
                            {new Date(data.createdAt).toLocaleDateString()}
                        </Typography>
                    </Grid>

                    {/* Category */}
                    <Grid item xs={2.4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.text.secondary }}>
                            {data.category}
                        </Typography>
                    </Grid>

                    {/* Payment Method */}
                    <Grid item xs={2.4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.text.secondary }}>
                            {data.paymentMethod}
                        </Typography>
                    </Grid>

                    {/* Phone Number */}
                    <Grid item xs={2.4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.text.secondary }}>
                            {formatPhoneNumber(data.customerPhone)}
                        </Typography>
                    </Grid>

                    {/* Amount */}
                    <Grid item xs={2.4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.text.secondary }}>
                            {parseFloat(data.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography>
                    </Grid>

                    {/* Actions */}
                    {/* <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                            <Grid item>
                                <IconButton LinkComponent={Link} href={`/admin/transactions/${data.idCaixa}`}>
                                    <Edit color="action" sx={{ width: { lg: 25, xs: 20 }, height: { lg: 25, xs: 20 }, color: theme.palette.background.bgAmareloPrimary }} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => onDelete(data.idProducts)}>
                                    <Delete color="action" sx={{ width: { lg: 25, xs: 20 }, height: { lg: 25, xs: 20 }, color: theme.palette.error.main }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TableTransactions
