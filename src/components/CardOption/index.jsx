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
                            width: { lg: '170px', md: '140px', sm: '160px', xs: '140px' },
                            height: { lg: '190px', md: '160px', sm: '160px', xs: '160px' },
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
                        <Box sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: 1,
                            flexDirection:"column"
                        }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.primary.main,
                                    fontSize: { xs: '14px', sm: '17px',md: '20px', lg: '20px' },
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: { lg: '16px', md: '12px', sm: '10px', xs: '11px' } }}
                            >
                                {description}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: { lg: '16px', md: '12px', sm: '10px', xs: '11px' } }}
                            >
                                Quantidade disponível: {item.quantity}
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
                                    fontSize: { lg: '16px', md: '12px', sm: '10px', xs: '11px' },
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
