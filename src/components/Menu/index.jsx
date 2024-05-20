"use client"
import { Box, Grid, Typography } from "@mui/material";
import CartOption from "../CardOption";

const Menu = ({ data }) => {
    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {data.map((category, index) => (
                <Grid container key={index} spacing={2}>
                    <Grid item xs={12} mt={2}>
                        <Box sx={{ width: "100%", justifyContent: "flex-start", display: "flex" }}>
                            <Typography variant="h2" sx={{ fontSize: 29, fontWeight: "bold", color: "#000" }}>
                                {category.category}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container spacing={2} rowSpacing={3} alignItems={"center"} justifyContent={"center"}>
                            {category.items.map(item => (
                                <Grid item xs={12} lg={6} md={6} sm={12} key={item.id} >
                                    <CartOption
                                        img={item.photo}
                                        title={item.title}
                                        description={item.description}
                                        price={item.price}
                                        item={item}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
}

export default Menu;
