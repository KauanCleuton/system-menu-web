import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, FormControl, IconButton, InputAdornment, TextField, FormHelperText, Select, MenuItem, useTheme } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { CloseOutlined, Groups, DriveFileRenameOutline } from '@mui/icons-material';
import * as Yup from 'yup';
import SelecionarItensModal from '../../components/SelecionarItensModal'; // Importando o modal separado
import MesasService from '@/service/mesas.service';
import ProdutosService from '@/service/productsAdmin.service';
import MultiProductSelect from '@/components/SelectProducts';

const validationSchema = Yup.object({
    mesaId: Yup.number().required('Campo obrigatório'),
    num_pessoas: Yup.number().required('Campo obrigatório'),
    itens: Yup.array()
});

const PedidosMesasComponent = ({ data, onSubmit, functionStates, onClose }) => {
    const produtosService = new ProdutosService()
    const MesasModal = new MesasService()
    const theme = useTheme();
    const [itens, setitens] = useState([]);
    const [openItemModal, setOpenItemModal] = useState(false);

    // Manter o num_pessoas e mesaId fora do Formik, para que eles não sejam resetados ao adicionar um item
    const [numPessoas, setNumPessoas] = useState(data ? data.num_pessoas : "");
    const [mesaId, setMesaId] = useState(data ? data.mesaId : "");
    const [mesas, setMesas] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const getMesas = async () => {
        try {
            const response = await MesasModal.getAllMesas()
            const response2 = await produtosService.getAllProducts()
            setProdutos(response2)
            setMesas(response); // Armazenando as mesas no estado
        } catch (error) {
            console.log('Erro ao buscar as mesas!', error);
        }
    };

    useEffect(() => {
        if (data) {
            setitens(data.itens || []);
            setNumPessoas(data.num_pessoas || "");
            setMesaId(data.mesaId || "");
        }
        getMesas(); // Buscar as mesas assim que o componente for carregado
    }, [data]);

    const handleOpenItemModal = () => setOpenItemModal(true);
    const handleCloseItemModal = () => setOpenItemModal(false);

    const handleSelectItem = (product, quantity) => {
        const productId = product.idProducts;

        // Certifique-se de que quantity seja um número
        const quantityNumber = Number(quantity); // Converte para número

        setitens((previtens) => {
            const updatedItems = previtens.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: quantityNumber } // Atualiza a quantidade convertida
                    : item
            );

            if (!updatedItems.find((item) => item.productId === productId)) {
                updatedItems.push({
                    productId: productId,
                    quantity: quantityNumber, // A quantidade já está como número
                    price: product.price,
                    title: product.title
                });
            }

            return updatedItems;
        });
    };


    const handleSubmit = (values) => {
        const dataToSubmit = {
            ...values,
            num_pessoas: Number(values.num_pessoas), // Converte para número
            mesaId: Number(values.mesaId), // Converte para número
            itens: itens
        };
        console.log(itens, "itennnsss");


        onSubmit(dataToSubmit); // Passando os dados convertidos
    };

    return (
        <>
            <SelecionarItensModal
                open={openItemModal}
                onClose={handleCloseItemModal}
                onSelectItem={handleSelectItem}
                itens={itens}
                setitens={setitens}
            />

            <Box
                sx={{
                    maxWidth: 500,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: '#141414',
                    boxShadow: 24,
                    borderRadius: '10px',
                }}
            >
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
                                num_pessoas: numPessoas,
                                mesaId: mesaId,
                                itens: itens,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                        >
                            {({ errors, touched, setFieldValue }) => (
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
                                                                    value={numPessoas}
                                                                    onChange={(e) => setNumPessoas(e.target.value)}
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
                                                                    select // Habilita o modo de seleção
                                                                    label="Mesa"
                                                                    value={mesaId} // Use o estado local para o valor
                                                                    onChange={(e) => {
                                                                        const selectedMesaId = e.target.value;
                                                                        setMesaId(selectedMesaId); // Atualiza o estado local com o ID da mesa
                                                                        setFieldValue("mesaId", selectedMesaId); // Passa para o Formik
                                                                    }}
                                                                    SelectProps={{
                                                                        native: false, // Usando o select personalizado do MUI, que permite estilização
                                                                        MenuProps: {
                                                                            PaperProps: {
                                                                                style: {
                                                                                    backgroundColor: '#f0f0f0', // Cor de fundo do menu
                                                                                    color: 'black', // Cor do texto dentro do menu
                                                                                }
                                                                            }
                                                                        }
                                                                    }}
                                                                    sx={{
                                                                        "& .MuiInputBase-input": {
                                                                            color: theme.palette.primary.white, // Cor do texto dentro do campo
                                                                        },
                                                                        "& .MuiFormLabel-root": {
                                                                            color: theme.palette.primary.white, // Cor do rótulo
                                                                        },
                                                                        "& .MuiOutlinedInput-root fieldset": {
                                                                            borderColor: theme.palette.primary.main, // Cor da borda
                                                                        },
                                                                        "&:hover .MuiOutlinedInput-root fieldset": {
                                                                            borderColor: theme.palette.primary.main, // Cor da borda quando o campo é focado
                                                                        },
                                                                    }}
                                                                >
                                                                    {mesas.map((mesa) => (
                                                                        <MenuItem key={mesa.idMesa} value={mesa.idMesa}>
                                                                            {mesa.name} - {mesa.capacity} pessoas
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                                {errors.mesaId && touched.mesaId && (
                                                                    <FormHelperText>{errors.mesaId}</FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                </Grid>


                                                <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <Typography variant="body2" color="primary" gutterBottom>
                                                            Selecionar Produtos
                                                        </Typography>
                                                        <MultiProductSelect
                                                            value={itens}
                                                            onChange={setitens}
                                                        />
                                                        <Box mt={2}>
                                                            {/* Exibe os itens selecionados */}
                                                            {itens.length > 0 ? (
                                                                itens.map((item, index) => (
                                                                    <Typography key={index} variant="body1" color="primary">
                                                                        {item.title ?? 'Produto não encontrado'} - Quantidade: {item.quantity}
                                                                    </Typography>

                                                                ))
                                                            ) : (
                                                                <Typography variant="body1" color="gray">
                                                                    Nenhum produto selecionado
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </FormControl>
                                                </Grid>
                                                {/* <Grid item xs={12}>
                                                    <FormControl fullWidth>
                                                        <Button variant="outlined" onClick={handleOpenItemModal} sx={{ color: theme.palette.primary.main }}>
                                                            Selecionar Itens
                                                        </Button>
                                                        <Box mt={1}>
                                                            {itens.length > 0 ? (
                                                                itens.map((item, index) => (
                                                                    <Typography key={index} variant="body1" color="primary">
                                                                        {item.title} - {item.quantity}
                                                                    </Typography>
                                                                ))
                                                            ) : (
                                                                <Typography variant="body2" color="gray">Nenhum item selecionado</Typography>
                                                            )}
                                                        </Box>
                                                    </FormControl>
                                                </Grid> */}

                                                <Grid item xs={12} mt={2}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        fullWidth
                                                        sx={{
                                                            marginBottom:5
                                                        }}
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
