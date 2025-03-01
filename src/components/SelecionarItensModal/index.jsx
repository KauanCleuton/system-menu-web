import { useState, useEffect } from 'react';
import { Modal, Box, Typography, useTheme, Button, Paper, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductsSv from '@/service/productsAdmin.service';
import Image from "next/image";

const SelecionarItensModal = ({ open, onClose, onSelectItem, selectedItems, setSelectedItems,data }) => {
    const theme = useTheme();
    const [groupedProducts, setGroupedProducts] = useState({});
    const [quantities, setQuantities] = useState({});
    const ProdutosModel = new ProductsSv();
    

    // Fetch products data
    useEffect(() => {
        ProdutosModel.getAllProducts().then((data) => {
            const filteredData = data.filter((product) => product.quantity > 1);
            const grouped = filteredData.reduce((acc, product) => {
                const categoryName = product.Category?.name || 'Sem Categoria';
                if (!acc[categoryName]) {
                    acc[categoryName] = [];
                }
                acc[categoryName].push(product);
                return acc;
            }, {});


            setGroupedProducts(grouped);

        });
    }, []);

    const handleSelectItem = (product) => {
        const productId = product.idProducts;
        const productQuantity = quantities[productId] || 1;
        onSelectItem(product, productQuantity);
        console.log(data,"dataa dos itens");
        
    };

    const handleQuantityChange = (productId, e) => {
        const newQuantity = e.target.value;
        if (newQuantity === '' || (!isNaN(newQuantity) && newQuantity >= 1)) {
            setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
        }
    };

    useEffect(() => {
    const initialQuantities = {};

    if (Array.isArray(data)) {
        data.forEach(item => {
            initialQuantities[item.productId] = item.quantity;
        });
    }

    setQuantities(initialQuantities);
}, [data]);


    return (
        <Modal open={open} onClose={onClose}>
            <Box
                component={Paper}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: 400,
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
                    Selecione os Produtos
                </Typography>

                {Object.keys(groupedProducts).map((category) => (
                    <Box key={category} sx={{ marginBottom: 2 }}>
                        <Typography variant="h6" sx={{ marginBottom: 1, color: theme.palette.primary.main }}>
                            {category}
                        </Typography>

                        {groupedProducts[category].map((product) => (
                            <Box
                                key={product.idProducts}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 1,
                                    padding: '8px',
                                    backgroundColor: theme.palette.secondary.main,
                                    borderRadius: '8px',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: { lg: '80px', md: '140px', sm: '160px', xs: '130px' },
                                        height: { lg: '70px', md: '180px', sm: '170px', xs: '160px' },
                                    }}
                                >
                                    <Image
                                        src={
                                            `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/produtos/${product?.idProducts}`
                                        }
                                        layout="fill"
                                        alt={`Imagem do produto: ${product.title}`}
                                        style={{ objectFit: "cover" }}
                                    />
                                </Box>

                                <Typography variant="body1" sx={{ color: 'white' }}>
                                    {product.title}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
    type="number"
    value={quantities[product.idProducts] || ''}
    onChange={(e) => handleQuantityChange(product.idProducts, e)}
    sx={{ width: '60px', marginRight: 1, bgcolor: "white" }}
    min="1"
    InputProps={{
        style: {
            color: "black",
            fontWeight: "bold"
        }
    }}
/>


                                    <IconButton
                                        color="black"
                                        onClick={() => handleSelectItem(product)}
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            '&:hover': { backgroundColor: theme.palette.primary.dark },
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        </Modal>
    );
};

export default SelecionarItensModal;
