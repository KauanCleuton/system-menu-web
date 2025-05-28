"use client";

import { Box, Button, Grid, Modal, Typography, useTheme } from "@mui/material";
import CartOption from "../CardOption";
import { useDispatch, useSelector } from "react-redux";
import ModalAddItemCart from "../ModalCart";
import { closeModal } from "@/store/modalSlice";
import { useEffect, useState, useRef } from "react";
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
    const theme = useTheme();
    const categoryRefs = useRef({});
    const buttonsRefs = useRef({}); // ref para os botões da barra horizontal
    const scrollContainerRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState(null);

    // Efeito para monitorar o scroll vertical e atualizar activeCategory
    useEffect(() => {
        const handleScroll = () => {
            const container = scrollContainerRef.current;
            if (!container) return;

            const containerTop = container.getBoundingClientRect().top;

            let closestCategory = null;
            let closestDistance = Infinity;

            Object.entries(categoryRefs.current).forEach(([category, el]) => {
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const offsetTop = rect.top - containerTop;

                    if (Math.abs(offsetTop) < closestDistance) {
                        closestDistance = Math.abs(offsetTop);
                        closestCategory = category;
                    }
                }
            });

            if (closestCategory && closestCategory !== activeCategory) {
                setActiveCategory(closestCategory);
            }
        };

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, [activeCategory]);

    // Efeito para rolar a barra horizontal para o botão ativo
    useEffect(() => {
        if (activeCategory && buttonsRefs.current[activeCategory]) {
            buttonsRefs.current[activeCategory].scrollIntoView({
                behavior: "smooth",
                inline: "center", // centraliza horizontalmente
                block: "nearest",
            });
        }
    }, [activeCategory]);

    const handleClose = () => {
        dispatch(closeModal());
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productSv.getProducts();
            if (response.data && typeof response.data === "object") {
                const sortedData = {};
                Object.keys(response.data).forEach((categoryName) => {
                    const products = response.data[categoryName];
                    if (Array.isArray(products)) {
                        sortedData[categoryName] = [...products].sort((a, b) => a.price - b.price);
                    } else {
                        sortedData[categoryName] = [];
                    }
                });
                setCategories(sortedData);
            } else {
                setCategories({});
            }
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
                    updatedCategories[newOrder.category].sort((a, b) => a.price - b.price);
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

    const sortedCategoryEntries = Object.entries(categories).sort(([catA, productsA], [catB, productsB]) => {
        const isRefriA = catA.toLowerCase().includes("refri");
        const isRefriB = catB.toLowerCase().includes("refri");

        if (isRefriA && !isRefriB) return 1;
        if (!isRefriA && isRefriB) return -1;

        const avg = (products) => {
            if (!Array.isArray(products) || products.length === 0) return Infinity;
            return products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length;
        };

        return avg(productsA) - avg(productsB);
    });

    const scrollToCategory = (category) => {
        const ref = categoryRefs.current[category];
        const container = scrollContainerRef.current;
        if (ref && container) {
            const containerTop = container.getBoundingClientRect().top;
            const refTop = ref.getBoundingClientRect().top;
            const offset = refTop - containerTop;

            container.scrollTo({
                top: container.scrollTop + offset - 80,
                behavior: "smooth",
            });

            setActiveCategory(category);
        }
    };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                        bgcolor: "black",
                        display: "flex",
                        gap: 1,
                        overflowX: "auto",
                        p: 2,
                        whiteSpace: "nowrap",
                        '&::-webkit-scrollbar': {
                            height: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: '3px',
                        },
                        borderRadius: 1,
                    }}
                >
                    {sortedCategoryEntries.map(([categoryName]) => (
                        <Button
                            key={categoryName}
                            variant="outlined"
                            size="small"
                            onClick={() => scrollToCategory(categoryName)}
                            ref={(el) => (buttonsRefs.current[categoryName] = el)} 
                            sx={{
                                px: 2,
                                flexShrink: 0,
                                whiteSpace: 'nowrap',
                                backgroundColor: activeCategory === categoryName ? theme.palette.primary.main : undefined,
                                color: activeCategory === categoryName ? theme.palette.primary.white : theme.palette.primary.main,
                                borderColor: activeCategory === categoryName ? theme.palette.primary.main : undefined,
                            }}
                        >
                            {categoryName}
                        </Button>
                    ))}
                </Box>

                <Box
                    ref={scrollContainerRef}
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        pb: 0,
                    }}
                >
                    {loading && <Loading />}
                    {sortedCategoryEntries.map(([categoryName, products], index) => (
                        <Grid
                            container
                            key={index}
                            spacing={2}
                            mb={7}
                            ref={(el) => (categoryRefs.current[categoryName] = el)}
                        >
                            <Grid item xs={12}>
                                <Box sx={{ width: "100%", justifyContent: "flex-start", display: "flex" }}>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontSize: 29,
                                            fontWeight: "bold",
                                            color: theme.palette.secondary.main,
                                            mt: 1,
                                        }}
                                    >
                                        {categoryName}
                                    </Typography>
                                </Box>
                            </Grid>

                            {Array.isArray(products) &&
                                products.map((product, idx) => (
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
