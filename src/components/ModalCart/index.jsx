import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, updateDeliveryDescription, closeModal } from '@/store/modalSlice';
import { addItemToCart } from '@/store/cartSlice';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import AuthCard from '../Card';
import { CloseOutlined } from '@mui/icons-material';
import Image from 'next/image';

const ModalAddItemCart = () => {
    const dispatch = useDispatch();
    const { selectedItem: item, quantity, deliveryDescription } = useSelector(state => state.modal);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity(newQuantity));
        }
    };

    const handleDescriptionChange = (e) => {
        dispatch(updateDeliveryDescription(e.target.value));
    };

    const handleAddToCart = () => {
        dispatch(addItemToCart({ ...item, quantity, deliveryDescription }));
        dispatch(closeModal());
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
            <Grid item >
                <AuthCard>
                    <Grid container alignItems="center" justifyContent="center" spacing={2}>
                        <Grid item xs={12} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end"
                            }}>
                                <IconButton onClick={() => dispatch(closeModal())}>
                                    <CloseOutlined sx={{ color: "#FF4D00" }} />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} order={2} >
                                <Grid item xs={12} alignItems={"center"}>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        <Box sx={{
                                            position: "relative",
                                            width: "120px",
                                            height: "120px"
                                        }}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/produtos/${item.idProducts}`}
                                                layout='fill'
                                                alt='foto do pedido'
                                                style={{ borderRadius: "5px" }}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} order={1}>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        <Typography variant="h6">{item.title}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Observação"
                                sx={{
                                    '& .MuiInputLabel-root': { // Estilo para o label
                                        color: '#FF4D00',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { // Estilo para o outline
                                            borderColor: '#FF4D00',
                                        },
                                        '&:hover fieldset': { // Estilo para o outline no hover
                                            borderColor: '#FF4D00',
                                        },
                                        '&.Mui-focused fieldset': { // Estilo para o outline quando o campo está focado
                                            borderColor: '#FF4D00',
                                        },
                                        '& input': { // Estilo para o texto de entrada
                                            color: '#FF4D00',
                                        },
                                    },
                                }}
                                fullWidth
                                value={deliveryDescription}
                                onChange={handleDescriptionChange}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                            <Box sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Button
                                    variant='contained'
                                    sx={{
                                        bgcolor: "#D32727",
                                        ":hover": {
                                            bgcolor: "#D32727"
                                        }
                                    }}
                                    onClick={() => handleQuantityChange(quantity - 1)}>
                                    -
                                </Button>
                                <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                                <Button
                                    variant='contained'
                                    sx={{
                                        bgcolor: "#156124",
                                        ":hover": {
                                            bgcolor: "#156124"
                                        }
                                    }}
                                    onClick={() => handleQuantityChange(quantity + 1)}>
                                    +
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                sx={{
                                    mb: 3,
                                    mt: 3,
                                    textTransform: "inherit",
                                    bgcolor: "#FF4D00",
                                    ":hover": {
                                        bgcolor: "#FF4D00"
                                    }
                                }}
                                onClick={handleAddToCart}
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Adicionar ao carrinho
                            </Button>
                        </Grid>
                    </Grid>
                </AuthCard>
            </Grid>
        </Grid>
    );
};

export default ModalAddItemCart;
