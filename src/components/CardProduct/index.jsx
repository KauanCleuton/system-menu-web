import * as React from 'react';
import { Typography, IconButton, Grid, FormControlLabel, Switch, useMediaQuery, useTheme, Box, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

const CardProduct = ({ data, onDelete, toggleVisible }) => {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const theme = useTheme();

    return (
        <Grid container spacing={2} component={Paper} elevation={4} py={2} sx={{ cursor: "pointer", bgcolor: "#fcfcfc", borderRadius: '10px' }}>
            <Grid item xs={12}>
                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Box
                        sx={{
                            height: '123px',
                            width: '200px',
                            position: 'relative',
                        }}

                    >
                        <Image layout='fill' src={data.file_url} alt="Foto do Produto" style={{ objectFit: 'cover', borderRadius: '10px' }} />
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h6" color='primary' textAlign='center' >
                        Título: {data.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" color='secondary' textAlign='center' >
                        Descrição: {data.description}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" color='secondary' textAlign='center' >
                        Preço: {parseInt(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" color='secondary' textAlign='center' >
                        Categoria: {data.Category.name}
                    </Typography>
                </Grid>
                
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <IconButton LinkComponent={Link} href={`/admin/produtos/${data.idProducts}`}>
                            <Edit sx={{
                                width: { lg: 25, xs: 20 },
                                height: { lg: 25, xs: 20 },
                                color: theme.palette.background.bgAmareloPrimary
                            }} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => onDelete(data.idProducts)}>
                            <Delete sx={{
                                width: { lg: 25, xs: 20 },
                                height: { lg: 25, xs: 20 },
                                color: theme.palette.error.main
                            }} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={<Switch size={isSmallScreen ? 'small' : 'medium'} checked={data.isVisible} onChange={() => toggleVisible(data.idProducts)} />}
                        // label={data.isVisible ? 'Visível' : 'Invisível'}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CardProduct;
