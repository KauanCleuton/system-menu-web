import { Box, Grid, Modal, Typography } from "@mui/material";
import CartOption from "../CardOption";
import { useDispatch, useSelector } from "react-redux";
import ModalAddItemCart from "../ModalCart";
import { closeModal } from "@/store/modalSlice";
import { useEffect, useState } from "react";
import productsService from "@/service/products.service";
import { isLoggedIn } from "@/utils/auth";
import Loading from "../Loading";

const Menu = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const { opened, selectedItem, quantity, deliveryDescription } = useSelector((state) => state.modal);
    const [categories, setCategories] = useState([]);

    const handleClose = () => {
        dispatch(closeModal());
    };

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const accessToken = sessionStorage.getItem("accessToken");
            const response = await productsService.getProducts(accessToken);
            setCategories(response.data.dataProducts); // Set products grouped by category
            setLoading(true)
        } catch (error) {
            console.error('Erro ao buscar produtos!', error);
            throw error;
        } finally {
            setLoading(false)
        }

    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const renderProductsByCategory = () => {
        const renderedCategories = [];

        categories.forEach((product) => {
            const categoryName = product.Category?.name || "Sem categoria";

            const existingCategory = renderedCategories.find((category) => category.name === categoryName);

            if (existingCategory) {
                existingCategory.products.push(product);
            } else {
                renderedCategories.push({
                    name: categoryName,
                    products: [product],
                });
            }
        });

        return renderedCategories;
    };

    return loading ? <Loading /> : (
        <>
            <Box sx={{ width: "100%", height: "100%", mb: 2 }}>
                {renderProductsByCategory().map((category, index) => (
                    <Grid container key={index} spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ width: "100%", justifyContent: "flex-start", display: "flex" }}>
                                <Typography variant="h2" sx={{ fontSize: 29, fontWeight: "bold", color: "#000", mt: 1 }}>
                                    {category.name}
                                </Typography>
                            </Box>
                        </Grid>
                        {category.products.map((product, idx) => (
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
                sx={{ overflowY: 'scroll' }}
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
