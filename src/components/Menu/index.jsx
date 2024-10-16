import { Box, Grid, Modal, Typography } from "@mui/material";
import CartOption from "../CardOption";
import { useDispatch, useSelector } from "react-redux";
import ModalAddItemCart from "../ModalCart";
import { closeModal } from "@/store/modalSlice";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import ProductsService from "@/service/products.service";


const productSv = new ProductsService()

const Menu = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { opened, selectedItem, quantity, deliveryDescription } = useSelector((state) => state.modal);
    const [categories, setCategories] = useState({});

    const handleClose = () => {
        dispatch(closeModal());
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productSv.getProducts();
            if (response.data && response.data) {
                setCategories(response.data);
            } else {
                setCategories({});
            }
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos!', error);
            setCategories({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <Box sx={{ width: "100%", height: "100%", mb: 2 }}>
                {categories && Object.keys(categories).map((categoryName, index) => (
                    <Grid container key={index} spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ width: "100%", justifyContent: "flex-start", display: "flex" }}>
                                <Typography variant="h2" sx={{ fontSize: 29, fontWeight: "bold", color: "#000", mt: 1 }}>
                                    {categoryName}
                                </Typography>
                            </Box>
                        </Grid>
                        {categories[categoryName].map((product, idx) => (
                            <Grid item xs={12} lg={6} md={6} sm={12} key={idx}>
                                <CartOption
                                    img={product.file_url}
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    item={product}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Box>
            <Modal
                open={opened}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ width: "100vw" }}
            >
                <ModalAddItemCart
                    item={selectedItem}
                    quantity={quantity}
                    deliveryDescription={deliveryDescription}
                />
            </Modal>
        </>
    );
};

export default Menu;
