import { openModal } from "@/store/modalSlice";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";

const CartOption = ({ img, title, description, price, item }) => {
    const dispatch = useDispatch();
    const theme = useTheme()

    const handleOpenModal = () => {
        dispatch(openModal(item));
    };

    return (
        <Box component={Paper} elevation={2} sx={{
            cursor: "pointer",
            width: "100%",
            backgroundColor: "#000000",
        }}>
            <Grid container p={0} >
                <Grid item xs={4} md={4} lg={3} sm={3}>
                    <Box sx={{ position: "relative", width: { lg: '134px', md: '125px', sm: '120px', xs: '100px' }, height: { lg: '134px', md: '125px', sm: '120px', xs: '116px' } }}>
                        <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/produtos/${item.idProducts}`} layout="fill" alt="Imagem do produto" style={{ objectFit: "cover", borderRadius: '5px 0 0 5px' }} />
                    </Box>
                </Grid>
                <Grid item xs={8} md={8} lg={9} sm={9}>
                    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: '7px', py: 1 }}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main, fontSize: { xs: '13px', md: '18px' } }}>{title}</Typography>
                            <Typography variant="body1" sx={{ fontSize: { xs: '13px', md: '16px' } }}>{description}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: { xs: '13px', md: '16px' } }}>
                                {Number(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Typography>
                            <IconButton
                                onClick={handleOpenModal}
                                sx={{
                                    color: "#fff",
                                    bgcolor: theme.palette.primary.main,
                                    borderRadius: '4px',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    width: 30,
                                    height: "auto",
                                    mr: 2,
                                    ":hover": {
                                        bgcolor: "transparent",
                                        color: theme.palette.primary.main
                                    }
                                }}
                            >
                                <AddShoppingCartOutlined sx={{ fontSize: 14 }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CartOption;
