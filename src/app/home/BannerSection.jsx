"use client";

import { useState, useEffect } from "react";
import BannerCard from "@/components/BannersCard";
import { Box, Container, Grid } from "@mui/material";
import BannerService from "@/service/banner.service";



const bannerSv = new BannerService()
const BannerSection = () => {
    const [banners, setBanners] = useState([]);


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await bannerSv.getAllBanners()

                setBanners(response)
            } catch (error) {
                console.error(error)
            }
        }

        getData()
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Container fixed>
                <Grid container spacing={"34px"} sx={{
                    mt: 1
                }}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                width: "100%",
                                borderRadius: "10px",
                                overflow: "hidden",
                            }}
                        >
                            {banners.length > 0 && <BannerCard data={banners} />}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BannerSection;
