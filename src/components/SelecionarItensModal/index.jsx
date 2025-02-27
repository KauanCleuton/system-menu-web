import { useState, useEffect } from 'react';
import { Modal, Box, Typography, useTheme, Button, Paper, TextField } from '@mui/material';
import ProductsSv from '@/service/productsAdmin.service';

const SelecionarItensModal = ({ open, onClose, onSelectItem, selectedItems, setSelectedItems }) => {
    const theme = useTheme();
    const [groupedProducts, setGroupedProducts] = useState({});
    const [quantities, setQuantities] = useState({}); // Para controlar as quantidades digitadas
    const ProdutosModel = new ProductsSv();
   


    // Fetch products data
    useEffect(() => {
        ProdutosModel.getAllProducts().then((data) => {
            const filteredData = data.filter((product) => product.quantity > 1); // Filtra produtos com quantidade > 1
            const grouped = filteredData.reduce((acc, product) => {
                const categoryName = product.Category?.name || 'Sem Categoria'; // Agrupa por categoria
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
        const productQuantity = quantities[productId] || 1; // Pega a quantidade selecionada ou usa 1 como padrão
    
        // Verifica se o produto já existe nos itens selecionados
        const existingItemIndex = selectedItems.findIndex(item => item.id === productId);
    
        if (existingItemIndex !== -1) {
            // Se o produto já existe, apenas substitua a quantidade
            const updatedItems = [...selectedItems];
            updatedItems[existingItemIndex].quantity = productQuantity; // Substitui a quantidade
            setSelectedItems(updatedItems); // Atualiza o estado com a nova quantidade
            onSelectItem(updatedItems); // Chama a função onSelectItem passando os itens atualizados
        } else {
            // Se o produto não existe, adicione um novo item à lista
            const updatedItems = [...selectedItems, {
                id: productId,
                quantity: productQuantity,
                price: product.price,
                title: product.title, // Inclui o 'title'
            }];
            setSelectedItems(updatedItems); // Atualiza o estado
            onSelectItem(updatedItems); // Chama a função onSelectItem passando os itens atualizados
        }
    };
    

    useEffect(() => {
        console.log("Itens selecionados:", selectedItems); // Verifique se os itens são passados corretamente
    }, [selectedItems]);

    const handleQuantityChange = (productId, e) => {
        const newQuantity = e.target.value; // Obtém o novo valor da quantidade como string

        // Permite que o valor seja apagado completamente ou seja um número válido maior que 0
        if (newQuantity === '' || (!isNaN(newQuantity) && newQuantity >= 1)) {
            setQuantities(prev => ({ ...prev, [productId]: newQuantity })); // Atualiza o estado com o novo valor
        }
    };




    return (
        <Modal open={open} onClose={onClose}>
            <Box
                component={Paper}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '25%',
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
                    Selecione os Produtos
                </Typography>

                {Object.keys(groupedProducts).map((category) => (
                    <Box key={category} sx={{ marginBottom: 3 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2, color: theme.palette.primary.main }}>
                            {category}
                        </Typography>

                        <ul style={{ listStyleType: 'none', padding: 0, backgroundColor: theme.palette.secondary.main }}>
                            {groupedProducts[category].map((product) => (
                                <li
                                    key={product.idProducts}
                                    style={{ marginBottom: '10px', padding: '10px', backgroundColor: theme.palette.secondary.main, borderRadius: '8px' }}
                                >
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                                        {product.title} - {product.quantity} disponíveis
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                                        R${product.price.toFixed(2)}
                                    </Typography>

                                    <TextField
                                        type="number"
                                        label="Quantidade"
                                        value={quantities[product.idProducts] || ''}  // Usa valor vazio quando não há quantidade
                                        onChange={(event) => handleQuantityChange(product.idProducts, event)}
                                        sx={{ marginTop: 1, bgcolor: "gray" }}
                                        min="1"
                                    />

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleSelectItem(product)}
                                        sx={{ marginTop: 1 }}
                                    >
                                        Adicionar
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </Box>
                ))}
            </Box>
        </Modal>
    );
};

export default SelecionarItensModal;
