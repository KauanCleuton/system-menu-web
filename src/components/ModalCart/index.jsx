import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, updateDeliveryDescription, closeModal } from '@/store/modalSlice';
import { addItemToCart } from '@/store/cartSlice';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import AuthCard from '../Card';

const ModalAddItemCart = ({ item, quantity, deliveryDescription }) => {
    const dispatch = useDispatch();

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
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item  >
                <AuthCard>
                    <Grid container spacing={2} alignItems="center" justifyContent="center" py={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6">{item.title}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button onClick={() => handleQuantityChange(quantity - 1)}>-</Button>
                            <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                            <Button onClick={() => handleQuantityChange(quantity + 1)}>+</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Delivery Description"
                                fullWidth
                                value={deliveryDescription}
                                onChange={handleDescriptionChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={handleAddToCart}
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Add to Cart
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={() => dispatch(closeModal())}
                                variant="outlined"
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </AuthCard>
            </Grid>
        </Grid>

    );
};

export default ModalAddItemCart;
