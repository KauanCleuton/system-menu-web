import { Box, Container, Grid, Typography, IconButton, useTheme } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Instagram, WhatsApp, Email } from "@mui/icons-material";

const Footer = () => {
    const theme = useTheme()
    const updateDateYearCopyright = () => {
        return `© ${new Date().getFullYear()} Vishi Delivery`;
    };

    return (
        <Box sx={{ width: "100vw", bgcolor: 'secondary.main', color: 'primary.main', py: 2 }}>
            <Container fixed>
                <Grid container spacing={{lg: 4, xs: 2}}>
                    {/* Seção de Logotipo */}
                    <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: {lg: '120px', xs: '80px'}, height: {lg: '120px', xs: '80px'}, position: 'relative' }}>
                            <Image
                                alt="Logotipo da Vishi Delivery"
                                src="/img/logo.svg"
                                layout="fill"
                                objectFit="contain"
                            />
                        </Box>
                    </Grid>

                    {/* Seção de Informações de Contato */}
                    <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { lg: 'flex-start', xs: 'center' } }} >
                            <Typography variant="h6" sx={{ mb: 2, fontSize: {lg: '0.875rem', xs: '0.775rem'}, fontWeight: 'bold' }}>
                                Contato
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1, fontSize: {lg: '0.75rem', xs: '0.60rem'} }}>
                                Rua São Cristóvão, 93, Guaiúba, CE
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1, fontSize: {lg: '0.75rem', xs: '0.60rem'} }}>
                                Telefone: <Link href="tel:558592985693" style={{
                                    color: theme.palette.primary.main
                                }}>
                                    (85) 99298-5693
                                </Link>
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1, fontSize: {lg: '0.75rem', xs: '0.60rem'} }}>
                                PIX: {`(85) 99298-5693`}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Seção de Redes Sociais */}
                    <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ mb: 2, fontSize: {lg: '0.875rem', xs: '0.775rem'}, fontWeight: 'bold' }}>
                                Siga-nos
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <IconButton
                                    component={Link}
                                    target="_blank"
                                    href="https://www.instagram.com/vishidelivery"
                                    sx={{ color: 'primary.main' }}
                                >
                                    <Instagram />
                                </IconButton>
                                <IconButton
                                    component={Link}
                                    target="_blank"
                                    href="https://wa.me/558592985693" // Substitua pelo link do WhatsApp
                                    sx={{ color: 'primary.main' }}
                                >
                                    <WhatsApp />
                                </IconButton>
                                <IconButton
                                    component={Link}
                                    target="_blank"
                                    href="mailto:kauancleuton733@gmail.com"
                                    sx={{ color: 'primary.main' }}
                                >
                                    <Email />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={3} sx={{ textAlign: 'center'}}>
                        <Typography variant="h6" sx={{ mb: 1, fontSize: { lg: '0.875rem', xs: '0.775rem' }, fontWeight: 'bold' }}>
                            Desenvolvido Por
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: { lg: '0.75rem', xs: '0.60rem' }, color: 'primary.main' }}>
                            Kauan Cleuton
                            <br />
                            Software Developer FullStack
                            <br />
                            <Link href="https://instagram.com/kauan.cleuton" target="_blank" passHref style={{ color: 'primary.main', textDecoration: 'none', fontWeight: 'bold' }}>
                                @kauan.cleuton
                            </Link>
                        </Typography>
                    </Grid>
                    {/* Seção de Copyright */}
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center', borderTop: '1px solid', borderColor: 'primary.main', pt: 2 }}>
                            <Typography variant="body2" sx={{ fontSize: {lg: '0.75rem', xs: '0.60rem'}, color: 'primary.main' }}>
                                {updateDateYearCopyright()}
                                <br />
                                <Link href="https://instagram.com/kauan.cleuton" target="_blank" passHref style={{ color: 'primary.main', textDecoration: 'none', fontWeight: 'bold' }}>
                                    Desenvolvido por Kauan Cleuton
                                </Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
