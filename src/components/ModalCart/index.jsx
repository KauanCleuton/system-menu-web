import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, updateDeliveryDescription, closeModal } from '@/store/modalSlice';
import { addItemToCart } from '@/store/cartSlice';
import { Box, Button, Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import AuthCard from '../Card';
import { CloseOutlined } from '@mui/icons-material';
import Image from 'next/image';

const ModalAddItemCart = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { selectedItem: item, quantity, deliveryDescription } = useSelector(state => state.modal);

    const handleQuantityChange = (newQuantity) => {
        const parsedQuantity = Number(newQuantity);
        if (parsedQuantity > 0) {
            dispatch(updateQuantity(parsedQuantity));
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
            <Grid item>
                <AuthCard>
                    <Grid container alignItems="center" justifyContent="center" spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end"
                            }}>
                                <IconButton onClick={() => dispatch(closeModal())}>
                                    <CloseOutlined sx={{ color: theme.palette.primary.main }} />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} order={2}>
                                <Grid item xs={12} alignItems={"center"}>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        <Box sx={{
                                            position: "relative",
                                            width: "400px",
                                            height: "200px"
                                        }}>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/produtos/${item.idProducts}`}
                                                layout='fill'
                                                alt='foto do pedido'
                                                style={{ borderRadius: "5px", objectFit: 'cover' }}
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
                                    '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: theme.palette.primary.main },
                                        '&:hover fieldset': { borderColor: theme.palette.primary.main },
                                        '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                                        '& input': { color: theme.palette.primary.main },
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
                                        bgcolor: theme.palette.error.main,
                                        ":hover": {
                                            bgcolor: theme.palette.error.main
                                        }
                                    }}
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                >
                                    -
                                </Button>

                                <TextField
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(e.target.value)}
                                    inputProps={{ min: 1 }}
                                    sx={{
                                        mx: 2,
                                        width: 100,
                                        '& input': {
                                            textAlign: 'center'
                                        },
                                        '& .MuiInputLabel-root': { color: theme.palette.primary.main },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: theme.palette.primary.main },
                                            '&:hover fieldset': { borderColor: theme.palette.primary.main },
                                            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                                            '& input': { color: theme.palette.primary.main },
                                        },
                                    }}
                                />

                                <Button
                                    variant='contained'
                                    sx={{
                                        bgcolor: theme.palette.success.main,
                                        ":hover": {
                                            bgcolor: theme.palette.success.main
                                        }
                                    }}
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                >
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
                                    bgcolor: theme.palette.primary.main,
                                    ":hover": {
                                        bgcolor: theme.palette.primary.main
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
