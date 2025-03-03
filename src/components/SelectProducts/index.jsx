import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Typography, TextField, Button, FormControl, OutlinedInput, Select, useTheme } from '@mui/material';
import ProdutosService from '@/service/productsAdmin.service';
import Image from 'next/image';

const MultiProductSelect = ({ value, onChange }) => {
    const [produtos, setProdutos] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const produtosService = new ProdutosService();
    const theme = useTheme()
    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await produtosService.getAllProducts();
                const productsFilter = response.filter((item) => item.quantity > 0);
                setProdutos(response);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    const handleSelectChange = (event) => {
        const selectedIds = event.target.value;
        setSelectedProducts(selectedIds);
    };

    const handleQuantityChange = (productId, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: quantity
        }));
    };

    const handleSaveQuantities = () => {
        const updatedItems = selectedProducts.map(id => {
            const product = produtos.find(prod => prod.idProducts === id);
            return {
                productId: id,
                title: product.title,
                price: product.price,
                quantity: quantities[id] || 0,  // Atualiza a quantidade com o valor inserido ou 0
                image: product.file_url
            };
        });
        onChange(updatedItems);
    };

    return (
        <Box>
            <FormControl fullWidth>
                {/* <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Selecione os Produtos</Typography> */}
                <Select
                    multiple
                    value={selectedProducts}
                    onChange={handleSelectChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => `Selecionar Produtos`}
                    MenuProps={{ PaperProps: { style: { maxHeight: 400 } } }}


                >
                    {produtos.map(product => (
                        <MenuItem key={product.idProducts} value={product.idProducts}>
                            <Box display="flex" alignItems="center" sx={{ display: "flex", justifyContent: "flex-start", width: '100%' }}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: 60,
                                        height: 60,
                                        marginRight: 1,
                                    }}
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/produtos/${product?.idProducts}`}
                                        layout="fill"
                                        alt={`Imagem do produto: ${product.title}`}
                                        style={{ objectFit: "cover", borderRadius: 10 }}
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="body2" style={{ fontWeight: 'bold', color: 'black' }}>
                                        {product.title}
                                    </Typography>
                                    <Typography variant="caption" style={{ color: 'green', fontWeight: "bold" }}>
                                        R$ {product.price.toFixed(2)}
                                    </Typography>
                                </Box>
                                <Typography sx={{ color: 'primary.main' }}>quantidade: {product.quantity}</Typography>

                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, border: `1px solid ${theme.palette.primary.main}`, color: selectedProducts.length === 0 ? 'white' : 'white' }}
                onClick={() => handleSaveQuantities()}
                disabled={selectedProducts.length === 0}

            >
                Salvar Quantidades
            </Button>

            {/* Modal ou campos para editar as quantidades */}
            {selectedProducts.length > 0 && (
                <Box sx={{ mt: 3, height: selectedProducts.length > 0 ? 300 : 0, overflowY: 'scroll', px: 1 }} >
                    {selectedProducts.map(productId => {
                        const product = produtos.find(prod => prod.idProducts === productId);
                        const quantity = quantities[productId] || '';
                        return (
                            <Box key={productId} display="flex" alignItems="center" sx={{ mb: 2, bgcolor: "white", borderRadius: "12px", p: 1 }}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: 60,
                                        height: 60,
                                        marginRight: 1
                                    }}
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/produtos/${product?.idProducts}`}
                                        layout="fill"
                                        alt={`Imagem do produto: ${product.title}`}
                                        style={{ objectFit: "cover", borderRadius: 10 }}
                                    />
                                </Box>
                                <Box flex={1}>
                                    <Typography
                                        variant="body2"
                                        style={{ fontWeight: "bold", color: "black" }} // Cor preta
                                    >
                                        {product.title}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        style={{ color: "green" }} // Cor verde
                                    >
                                        R$ {product.price.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Typography sx={{ color: 'primary.main', mr: 2 }}>quantidade:</Typography>

                                <TextField
                                    size="small"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(productId, e.target.value)}
                                    inputProps={{
                                        min: 0,
                                        style: { color: 'black', backgroundColor: "white" }
                                    }}
                                    sx={{
                                        width: 60,

                                        "& .MuiInputBase-input": {
                                            color: theme.palette.secondary.main
                                        },
                                        "& .MuiFormLabel-root": {
                                            color: theme.palette.secondary.main
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: theme.palette.primary.main
                                            },
                                            "&:hover fieldset": {
                                                borderColor: theme.palette.primary.dark
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: theme.palette.primary.main
                                            }
                                        },
                                        "& .MuiFormHelperText-root": {
                                            color: theme.palette.primary.main
                                        }
                                    }}


                                />
                            </Box>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
};

export default MultiProductSelect;
