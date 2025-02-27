import { useState } from 'react';
import { Box, Grid, Typography, Button, FormControl, IconButton, InputAdornment, TextField, FormHelperText, useTheme, selectClasses } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { CloseOutlined, Groups, DriveFileRenameOutline } from '@mui/icons-material';
import * as Yup from 'yup';
import SelecionarItensModal from '../../components/SelecionarItensModal'; // Importando o modal separado

const validationSchema = Yup.object({
    mesaId: Yup.number().required('Campo obrigatório'),
    num_pessoas: Yup.number().required('Campo obrigatório'),
    selectedItems: Yup.object()
});

const PedidosMesasComponent = ({ data, onSubmit, functionStates, onClose }) => {
    const theme = useTheme();
    const [selectedItems, setSelectedItems] = useState([]);
    const [openItemModal, setOpenItemModal] = useState(false);
    

    const handleOpenItemModal = () => setOpenItemModal(true);
    const handleCloseItemModal = () => setOpenItemModal(false);

    const handleSelectItem = (product) => {
        const productId = product.idProducts;
        const productQuantity = quantities[productId] || 1; // Pega a quantidade selecionada ou usa 1 como padrão
    
        // Adiciona o item ao array
        const updatedItems = [...selectedItems, {
            id: productId,
            quantity: productQuantity,
            price: product.price,
            title: product.title, // Inclui o 'title' também
        }];
    
        setSelectedItems(updatedItems); // Atualiza o estado
        onSelectItem(updatedItems); // Chama a função onSelectItem passando os itens atualizados
    };
    
    

    return (
        <>
            {/* Modal separado */}
            <SelecionarItensModal
    open={openItemModal}
    onClose={handleCloseItemModal}
    onSelectItem={handleSelectItem}
    selectedItems={selectedItems} // Passando selectedItems como prop
    setSelectedItems={setSelectedItems} // Passando setSelectedItems como prop
/>



            <Box sx={{
                maxWidth: 500,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: '#141414',
                boxShadow: 24,
                borderRadius: '10px',
            }}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={onClose} sx={{ color: theme.palette.primary.main }}>
                                <CloseOutlined sx={{ width: 36, height: 36 }} />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' color='primary' sx={{ textAlign: 'center' }}>
                            {functionStates === 'create' ? 'Cadastrar Nova Mesa' : 'Editar Mesa'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} px={2} mt={2}>
                        <Formik
                            initialValues={{
                                num_pessoas: "",
                                mesaId: "",
                                selectedItems: []
                            }}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Field name="num_pessoas">
                                                        {({ field }) => (
                                                            <FormControl fullWidth error={Boolean(errors.num_pessoas && touched.num_pessoas)}>
                                                                <TextField
                                                                    {...field}
                                                                    id="num_pessoas"
                                                                    type="number"
                                                                    label="Num Pessoas"
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                <Groups sx={{ color: theme.palette.primary.main, width: 17, height: 17 }} />
                                                                            </InputAdornment>
                                                                        ),
                                                                    }}
                                                                    sx={{
                                                                        "& .MuiInputBase-input": { color: theme.palette.primary.white },
                                                                        "& .MuiFormLabel-root": { color: theme.palette.primary.white },
                                                                        "& .MuiOutlinedInput-root fieldset": { borderColor: theme.palette.primary.main },
                                                                    }}
                                                                />
                                                                {errors.num_pessoas && touched.num_pessoas && (
                                                                    <FormHelperText>{errors.num_pessoas}</FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Field name="mesaId">
                                                        {({ field }) => (
                                                            <FormControl fullWidth error={Boolean(errors.mesaId && touched.mesaId)}>
                                                                <TextField
                                                                    {...field}
                                                                    id="mesaId"
                                                                    label="Mesa"
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                <DriveFileRenameOutline sx={{ color: theme.palette.primary.main, width: 17, height: 17 }} />
                                                                            </InputAdornment>
                                                                        ),
                                                                    }}
                                                                    sx={{
                                                                        "& .MuiInputBase-input": { color: theme.palette.primary.white },
                                                                        "& .MuiFormLabel-root": { color: theme.palette.primary.white },
                                                                        "& .MuiOutlinedInput-root fieldset": { borderColor: theme.palette.primary.main },
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <Button variant="outlined" onClick={handleOpenItemModal} sx={{ color: theme.palette.primary.main }}>
                                                            Selecionar Itens
                                                        </Button>
                                                        <Box mt={1}>
                                                            {selectedItems.length > 0 ? (
                                                                selectedItems.map((item, index) => (
                                                                    <Typography key={index} variant="body1" color="primary">
                                                                        {item.title} - {item.quantity}
                                                                    </Typography>
                                                                ))
                                                            ) : (
                                                                <Typography variant="body2" color="gray">Nenhum item selecionado</Typography>
                                                            )}
                                                        </Box>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} mt={2}>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                >
                                    Criar Pedido
                                </Button>
                            </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default PedidosMesasComponent;