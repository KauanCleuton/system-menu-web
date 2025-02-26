"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // Removemos a importação de Navigation
import "swiper/css";
import "swiper/css/pagination";
import { Box, Grid, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BannerCard({ data }) {
    const router = useRouter();
    const theme = useTheme();

    console.log(data, '939123')
    const handleSlideClick = (id) => {
        router.push(`/checkout/${id}`);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{ width: "100%", position: "relative"}}>
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{ delay: 2000 }} 
                        style={{ "--swiper-navigation-color": "transparent" }} 
                    >
                        {data.map((banner, index) => (
                            <SwiperSlide key={index}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: { xs: "250px", sm: "250px", md: "250px", lg: "350px" },
                                        position: "relative",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleSlideClick(banner.id)}
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${banner.url.startsWith('/') ? banner.url : `/${banner.url}`}`}
                                        layout="fill"
                                        style={{ objectFit: "cover" }}
                                        alt={`Banner ${index + 1}`}
                                    />
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Grid>
        </Grid>
    );
}
