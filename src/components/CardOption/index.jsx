import { openModal } from "@/store/modalSlice";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useDispatch } from "react-redux";

const CartOption = ({ img, title, description, price, item }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleOpenModal = () => {
        dispatch(openModal(item));
    };

    return (
        <Box
            component={Paper}
            elevation={2}
            sx={{
                cursor: "pointer",
                width: "100%",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "8px",
                overflow: "hidden",
            }}
        >
            <Grid container>
                <Grid item>
                    <Box
                        sx={{
                            position: "relative",
                            width: { lg: '134px', md: '125px', sm: '120px', xs: '100px' },
                            height: { lg: '160px', md: '160px', sm: '150px', xs: '150px' },
                        }}
                    >
                        <Image
                            src={
                                `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/produtos/${item?.idProducts}`
                            }
                            layout="fill"
                            alt={`Imagem do produto: ${title}`}
                            style={{ objectFit: "cover" }}
                        />
                    </Box>
                </Grid>

                <Grid item xs>
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            px: 2,
                            py: 1
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.primary.main,
                                    fontSize: { xs: '13px', md: '18px' },
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: { xs: '13px', md: '16px' } }}
                            >
                                {description}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: "auto",
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: { xs: '13px', md: '16px' },
                                }}
                            >
                                {Number(price).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </Typography>
                            <IconButton
                                onClick={handleOpenModal}
                                sx={{
                                    color: "#fff",
                                    bgcolor: theme.palette.primary.main,
                                    borderRadius: '4px',
                                    width: 36,
                                    height: 36,
                                    ":hover": {
                                        bgcolor: "transparent",
                                        color: theme.palette.primary.main,
                                    },
                                }}
                                aria-label="Adicionar ao carrinho"
                            >
                                <AddShoppingCartOutlined sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CartOption;
