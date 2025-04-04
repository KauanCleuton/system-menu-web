import { Box, Grid, Modal, Typography, useTheme } from "@mui/material";
import CartOption from "../CardOption";
import { useDispatch, useSelector } from "react-redux";
import ModalAddItemCart from "../ModalCart";
import { closeModal } from "@/store/modalSlice";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import ProductsService from "@/service/products.service";
import { useRouter } from "next/navigation";

const productSv = new ProductsService();

const Menu = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { opened, selectedItem, quantity, deliveryDescription } = useSelector((state) => state.modal);
    const [categories, setCategories] = useState({}); 
    const router = useRouter();
    const theme = useTheme()
    const handleClose = () => {
        dispatch(closeModal());
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productSv.getProducts();
            if (response.data && typeof response.data === "object") {
                setCategories(response.data);
            } else {
                setCategories({});
            }
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos!", error);
            setCategories({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();

        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/events/admin`);
        eventSource.onmessage = (event) => {
            const newOrder = JSON.parse(event.data);

            setCategories((prevCategories) => {
                const updatedCategories = { ...prevCategories };
                if (newOrder.category) {
                    updatedCategories[newOrder.category] = [
                        ...(updatedCategories[newOrder.category] || []),
                        newOrder,
                    ];
                }
                return updatedCategories;
            });
        };

        const interval = setInterval(() => {
            fetchProducts();
        }, 30000);

        return () => {
            eventSource.close();
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Box sx={{ width: "100%", height: "100%", mb: 2 }}>
                {loading && <Loading />}
                {categories &&
                    Object.keys(categories).map((categoryName, index) => (
                        <Grid container key={index} spacing={2}>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        justifyContent: "flex-start",
                                        display: "flex",
                                    }}
                                >
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontSize: 29,
                                            fontWeight: "bold",
                                            color:theme.palette.secondary.main,
                                            mt: 1,
                                        }}
                                    >
                                        {categoryName}
                                    </Typography>
                                </Box>
                            </Grid>
                            {Array.isArray(categories[categoryName]) &&
                                categories[categoryName].map((product, idx) => (
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