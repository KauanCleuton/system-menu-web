import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, FormControl, IconButton, InputAdornment, TextField, FormHelperText, Select, MenuItem, useTheme, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { CloseOutlined, Groups, DriveFileRenameOutline } from '@mui/icons-material';
import * as Yup from 'yup';
import SelecionarItensModal from '../../components/SelecionarItensModal'; // Importando o modal separado
import MesasService from '@/service/mesas.service';

const validationSchema = Yup.object({
    mesaId: Yup.number().required('Campo obrigatório'),
    num_pessoas: Yup.number().required('Campo obrigatório'),
    itens: Yup.array(),
    status: Yup.string().required('Campo obrigatório'),
    status_payment: Yup.boolean().required('Campo obrigatório'),
    method_payment: Yup.string().required('Campo obrigatório'),
});

const PedidosMesasEditComponent = ({ data, onSubmit, functionStates, onClose }) => {
    const MesasModal = new MesasService()
    const theme = useTheme();
    const [itens, setitens] = useState([]);
    const [openItemModal, setOpenItemModal] = useState(false);

    // Manter o num_pessoas e mesaId fora do Formik, para que eles não sejam resetados ao adicionar um item
    const [numPessoas, setNumPessoas] = useState(data ? data.num_pessoas : "");
    const [mesaId, setMesaId] = useState(data ? data.mesaId : "");
    const [mesas, setMesas] = useState([]);
    const [statusPayment, setStatusPayment] = useState(false);
    const [methodPayment, setMethodPayment] = useState("");
    const [status, setStatus] = useState("");

    const getMesas = async () => {
        try {
            const response = await MesasModal.getAllMesas()
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
            setStatus(data.status || "");
            setStatusPayment(data.status_payment || "");
            setMethodPayment(data.method_payment || "");
        }
        console.log(data,"dataaaaaaaaaaa");
        
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
                        Editar Pedido Mesa
                        </Typography>
                    </Grid>
                    <Grid item xs={12} px={2} mt={2}>
                        <Formik
                            initialValues={{
                                num_pessoas: numPessoas,
                                mesaId: mesaId,
                                itens: itens,
                                status:status,
                                status_payment:statusPayment,
                                method_payment:methodPayment
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

                                                <Grid item xs={6}>
                                                    <Field name="status">
                                                        {({ field }) => (
                                                            <FormControl fullWidth error={Boolean(errors.status && touched.status)}>
                                                                <TextField
                                                                    {...field}
                                                                    id="status"
                                                                    type="string"
                                                                    label="status"
                                                                    value={status}
                                                                    onChange={(e) => setStatus(e.target.value)}
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
                                                                {errors.status && touched.status && (
                                                                    <FormHelperText>{errors.status}</FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        )}
                                                    </Field>
                                                </Grid>

                                                <Grid item xs={6}>
    <Field name="status_payment">
        {({ field }) => (
            <FormControl fullWidth error={Boolean(errors.status_payment && touched.status_payment)}>
                <FormLabel id="status_payment_label">Status de Pagamento</FormLabel>
                <RadioGroup
                    aria-labelledby="status_payment_label"
                    name="status_payment"
                    value={statusPayment ? "true" : "false"}  // Usando strings para facilitar a comparação
                    onChange={(e) => setStatusPayment(e.target.value === "true")}  // Atualizando como booleano
                    row
                >
                    <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Pago"
                    />
                    <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="Pendente"
                    />
                </RadioGroup>
                {errors.status_payment && touched.status_payment && (
                    <FormHelperText>{errors.status_payment}</FormHelperText>
                )}
            </FormControl>
        )}
    </Field>
</Grid>


                                                <Grid item xs={12}>
                                                    <Field name="method_payment">
                                                        {({ field }) => (
                                                            <FormControl fullWidth error={Boolean(errors.status && touched.status)}>
                                                                <TextField
                                                                    {...field}
                                                                    id="method_payment"
                                                                    type="string"
                                                                    label="method_payment"
                                                                    value={methodPayment}
                                                                    onChange={(e) => setMethodPayment(e.target.value)}
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
                                                                {errors.method_payment && touched.method_payment && (
                                                                    <FormHelperText>{errors.method_payment}</FormHelperText>
                                                                )}
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
                                                </Grid>

                                                <Grid item xs={12} mt={2}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        fullWidth
                                                    >
                                                        Editar Pedido
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

export default PedidosMesasEditComponent;
