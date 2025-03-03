import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Typography, TextField, Select, FormControl, OutlinedInput } from '@mui/material';
import ProdutosService from '@/service/productsAdmin.service';

const MultiProductSelect = ({ value, onChange }) => {
    const [produtos, setProdutos] = useState([]);
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

        const updatedItems = selectedIds.map((id) => {
            const existingItem = value.find(item => item.productId === id);
            const product = produtos.find(prod => prod.idProducts === id);
            return existingItem ? existingItem : {
                productId: id,
                title: product.title,
                price: product.price,
                quantity: 0,  // Inicializa a quantidade como 0
                image: product.file_url
            };
        });

        onChange(updatedItems);
    };

    const handleQuantityChange = (productId, quantity) => {
        const updatedItems = value.map(item =>
            item.productId === productId
                ? { ...item, quantity: quantity === '' ? '' : Math.max(0, Number(quantity)) }  // Evita valores negativos
                : item
        );
        onChange(updatedItems);
    };

    const renderOption = (product) => {
        const selectedItem = value.find(item => item.productId === product.idProducts);
        const quantity = selectedItem ? selectedItem.quantity : '';

        return (
            <MenuItem key={product.idProducts} value={product.idProducts}>
                <Box display="flex" alignItems="center" width="100%">
                    <img src={product.file_url} alt={product.title} style={{ width: 40, height: 40, marginRight: 10, borderRadius: 4 }} />
                    <Box flex={1}>
                        <Typography variant="body2" sx={{ color: "black", fontWeight: "bold" }}>
                            {product.title}
                        </Typography>
                        <Typography variant="caption" color="gray" sx={{ fontWeight: "bold" }}>
                            R$ {product.price.toFixed(2)}
                        </Typography>
                    </Box>
                    <TextField
                        size="small"
                        type="number"
                        value={quantity}  
                        onChange={(e) => handleQuantityChange(product.idProducts, e.target.value)}
                        inputProps={{
                            min: 0,
                            style: { color: 'black' }
                        }}
                        sx={{ width: 60, ml: 1 }}
                    />
                </Box>
            </MenuItem>
        );
    };

    return (
        <FormControl fullWidth>
            <Select
                multiple
                value={value.map(item => item.productId)}
                onChange={handleSelectChange}
                input={<OutlinedInput />}
                renderValue={() => 'Selecionar Produtos'}
                MenuProps={{ PaperProps: { style: { maxHeight: 400 } } }}
            >
                {produtos.map(renderOption)}
            </Select>
        </FormControl>
    );
};

export default MultiProductSelect;
