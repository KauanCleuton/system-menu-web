"use client";
import { Box, Grid, Modal, Typography } from "@mui/material";
import CartOption from "../CardOption";
import { useDispatch, useSelector } from "react-redux";
import ModalAddItemCart from "../ModalCart";
import { closeModal } from "@/store/modalSlice";

const Menu = ({ data }) => {
    const dispatch = useDispatch();
    const { opened, selectedItem, quantity, deliveryDescription } = useSelector((state) => state.modal);

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <Box sx={{ width: "100%", height: "100%", mb:2 }}>
            {data.map((category, index) => (
                <Grid container key={`${category.category}-${index}`} spacing={2}>
                    <Grid item xs={12} mt={2}>
                        <Box sx={{ width: "100%", justifyContent: "flex-start", display: "flex" }}>
                            <Typography variant="h2" sx={{ fontSize: 29, fontWeight: "bold", color: "#000" }}>
                                {category.category}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} rowSpacing={3} alignItems={"center"} justifyContent={"center"}>
                            {category.items.map((item) => (
                                <Grid item xs={12} lg={6} md={6} sm={12} key={`${item.id}-${item.title}`}>
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
            <Modal
                open={opened}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ overflowY: 'scroll' }}
            >
                <ModalAddItemCart
                    item={selectedItem}
                    quantity={quantity}
                    deliveryDescription={deliveryDescription}
                />
            </Modal>
        </Box>
    );
};

export default Menu;
