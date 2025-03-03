import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Typography, TextField, Button, FormControl, OutlinedInput, Select } from '@mui/material';
import ProdutosService from '@/service/productsAdmin.service';

const MultiProductSelect = ({ value, onChange }) => {
    const [produtos, setProdutos] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const produtosService = new ProdutosService();

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
                <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Selecione os Produtos</Typography>
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
                            <Box display="flex" alignItems="center" sx={{display:"flex",justifyContent:"space-between"}}>
                                <img 
                                    src={product.file_url} 
                                    alt={product.title} 
                                    style={{ width: 40, height: 40, marginRight: 10, borderRadius: 4 }} 
                                />
                                <Box>
                                    <Typography variant="body2" style={{ fontWeight: 'bold', color: 'black' }}>
                                        {product.title}
                                    </Typography>
                                    <Typography variant="caption" style={{ color: 'green',fontWeight:"bold" }}>
                                        R$ {product.price.toFixed(2)}
                                    </Typography>
                                </Box>
                               
                            </Box>
                            <Typography sx={{bgcolor:"black",textAlign:"right"}}>Quantidade</Typography>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }} 
                onClick={() => handleSaveQuantities()}
                disabled={selectedProducts.length === 0}
            >
                Salvar Quantidades
            </Button>

            {/* Modal ou campos para editar as quantidades */}
            {selectedProducts.length > 0 && (
                <Box sx={{ mt: 3 }}>
                    {selectedProducts.map(productId => {
                        const product = produtos.find(prod => prod.idProducts === productId);
                        const quantity = quantities[productId] || '';
                        return (
                            <Box key={productId} display="flex" alignItems="center" sx={{ mb: 2,bgcolor:"white",borderRadius:"12px",p:1 }}>
                                <img 
                                    src={product.file_url} 
                                    alt={product.title} 
                                    style={{ width: 40, height: 40, marginRight: 10, borderRadius: 4 }} 
                                />
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
                                <Typography sx={{color:"black"}}>quantidade: </Typography>
                                <TextField
                                    size="small"
                                    type="number"
                                    value={quantity}  
                                    onChange={(e) => handleQuantityChange(productId, e.target.value)}
                                    inputProps={{
                                        min: 0,
                                        style: { color: 'black',backgroundColor:"white" }
                                    }}
                                    sx={{ width: 60 }}
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
