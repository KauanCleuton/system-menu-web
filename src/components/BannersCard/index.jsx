"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Box, Grid, useTheme, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function BannerCard({ data }) {
    const router = useRouter();
    const theme = useTheme();
    const logo = useSelector(state => state.theme.logo);

    const handleSlideClick = (id) => {
        router.push(`/checkout/${id}`);
    };

    const phoneNumber = "558592985693";

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{ width: "100%", position: "relative" }}>
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ 
                            clickable: true,
                            bulletStyle: {
                                backgroundColor: theme.palette.text.primary
                            }
                        }}
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{ delay: 2000 }}
                    >
                        <SwiperSlide>
                            <Box
                                component="a"
                                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Olá! Quero encomendar salgados!')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    width: "100%",
                                    cursor: 'pointer',
                                    display: 'flex',
                                    backgroundColor: theme.palette.secondary.main,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    px: {
                                        xs: 0,
                                        lg: 2,
                                        md: 2,
                                        sm: 0
                                    },
                                    py: 2
                                }}
                            >
                                <Grid container justifyContent="flex-start" alignItems="center" spacing={0}>
                                    {/* Seção da Logo */}
                                    <Grid item xs={12} md={4} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        position: 'relative'
                                    }}>
                                        <Box sx={{
                                            width: { xs: 100, md: 270 },
                                            height: { xs: 100, md: 250 },
                                            position: 'relative',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            boxShadow: 4,
                                            mb: 2
                                        }}>
                                            <Image
                                                src={logo || theme.palette.primary.logo}
                                                layout="fill"
                                                style={{ objectFit: 'contain'}}
                                                alt="Logo"
                                                priority
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Seção de Textos */}
                                    <Grid item xs={12} md={6} sx={{
                                        textAlign: { xs: 'center', md: 'left' },
                                        color: theme.palette.text.primary
                                    }}>
                                        <Typography variant="h4" sx={{
                                            fontWeight: 700,
                                            fontSize: { xs: '20px', md: '24px' },
                                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                            color: theme.palette.primary.main,
                                            mb: 2
                                        }}>
                                            PROMOÇÃO ESPECIAL!
                                        </Typography>

                                        <Typography variant="h2" sx={{
                                            fontWeight: 900,
                                            mb: 1,
                                            fontSize: { xs: '17px', md: '23px' },
                                            color: theme.palette.primary.white,
                                            lineHeight: 1.2
                                        }}>
                                            Cento de Salgados
                                        </Typography>

                                        <Box sx={{
                                            backgroundColor: theme.palette.secondary.main,
                                            display: 'inline-block',
                                            py: 1,
                                            borderRadius: 3,
                                            boxShadow: 3
                                        }}>
                                            <Typography variant="h1" sx={{
                                                fontWeight: 900,
                                                fontSize: { xs: '17px', md: '25px' },
                                                color: theme.palette.primary.main
                                            }}>
                                                R$ 40,00
                                            </Typography>
                                        </Box>

                                        <Typography variant="h6" sx={{
                                            mb: {xs: 1, md: 4},
                                            fontSize: { xs: '12px', md: '1.1rem' },
                                            maxWidth: 500,
                                            lineHeight: 1.6
                                        }}>
                                            Salgados frescos e crocantes feitos diariamente com ingredientes selecionados!
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.primary.white,
                                                borderRadius: '30px',
                                                fontSize: '14px',
                                                fontWeight: 700,
                                                '&:hover': {
                                                    backgroundColor: theme.palette.background.white,
                                                },
                                                mb: 2
                                            }}
                                        >
                                            PEÇA PELO WHATSAPP
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </SwiperSlide>
                    </Swiper>
                </Box>
            </Grid>
        </Grid>
    );
}