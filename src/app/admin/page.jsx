"use client"
import FilterValuesByOptions from '@/components/FilterValuesByOptions'
import { useTheme, Typography, Divider, Paper, FormControl, Autocomplete, TextField, FormHelperText, Button } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TransactionsService from '@/service/transactions.service'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import { useDispatch } from 'react-redux'
import Paginator from '@/components/Paginator'
import TableTransactions from '@/components/TableTransactions'
import { Formik, Form, Field } from 'formik';
import { SET_ALERT } from '@/store/actions'
import AsaasService from '@/service/asaas.service'

const transactionsSv = new TransactionsService()


const asaasSv = new AsaasService()
const Caixa = () => {
    const theme = useTheme()
    const [loading, setLoading] = useState(false)
    const [dataTransactions, setDataTransactions] = useState({
        saldoAtual: 0,
        totalTransactions: 0
    })

    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const limit = 10;
    const [page, setPage] = useState(1);
    const [name, setName] = useState("")

    const getData = async () => {
        try {
            setLoading(true)
            // const responseSaldo = await transactionsSv.getTransactionsSummary()
            const responseAll = await transactionsSv.getAllTransactions()

            const responseSaldo = await asaasSv.getBalance()
            const responseAllBilling = await asaasSv.getAllBillings()
            setData(responseAll)
            const totalTransactions = responseAllBilling.length;
            setDataTransactions(state => ({
                ...state,
                saldoAtual: responseSaldo.balance,
                totalTransactions: totalTransactions
            }))
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    const [pesquisaPor, setPesquisaPor] = useState('');
    const [campoValor, setCampoValor] = useState('');
    const [erro, setErro] = useState('');



    const validarCampo = (valor) => {
        if (!valor) {
            return 'Este campo é obrigatório';
        }

        // if (pesquisaPor === 'id' && isNaN(valor)) {
        //     return 'ID deve ser um número';
        // }

        if (pesquisaPor === 'data' && !/\d{4}-\d{2}-\d{2}/.test(valor)) {
            return 'Data deve estar no formato YYYY-MM-DD';
        }

        if (pesquisaPor === 'mes' && (valor < 1 || valor > 12)) {
            return 'Mês deve ser entre 1 e 12';
        }

        if (pesquisaPor === 'ano' && (valor < 1900 || valor > 2100)) {
            return 'Ano inválido';
        }

        if (pesquisaPor === 'semana' && (valor < 1 || valor > 52)) {
            return 'Semana deve ser entre 1 e 52';
        }

        return '';
    };

    const searchOptions = [
        // { label: 'ID', value: 'id' },
        { label: 'Data Específica', value: 'data' },
        { label: 'Mês', value: 'mes' },
        { label: 'Ano', value: 'ano' },
        { label: 'Semana', value: 'semana' }
    ];

    const handleSubmit = async (values) => {
        const { pesquisaPor, campoValor } = values;

        if (!pesquisaPor || !campoValor) {
            console.error('Campos obrigatórios não preenchidos!');
            dispatch({ type: SET_ALERT, message: 'Campos obrigatórios não preenchidos!' });
            return;
        }

        try {
            switch (pesquisaPor) {
                // case 'id':
                //     const idResponse = await transactionsSv.getTransactionsById(campoValor);
                //     console.log('Resultado por ID:', idResponse);
                //     setData(idResponse);
                //     break;

                case 'data':
                    const dataResponse = await transactionsSv.getTransactionsByDay(campoValor);
                    console.log('Resultado por data:', dataResponse);
                    setData(dataResponse);
                    break;

                case 'mes':
                    const mesResponse = await transactionsSv.getTransactionsByMonth(campoValor);
                    console.log('Resultado por mês:', mesResponse);
                    setData(mesResponse);
                    break;

                case 'ano':
                    const anoResponse = await transactionsSv.getTransactionsByYear(campoValor);
                    console.log('Resultado por ano:', anoResponse);
                    setData(anoResponse);
                    break;

                case 'semana':
                    const semanaResponse = await transactionsSv.getTransactionsByWeek(campoValor);
                    console.log('Resultado por semana:', semanaResponse);
                    setData(semanaResponse);
                    break;

                default:
                    console.error(`Opção de pesquisa inválida: ${pesquisaPor}`);
                    break;
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            dispatch({ type: SET_ALERT, message: `Erro ao buscar por ${pesquisaPor}` });
        }
    };

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
        }}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
                        {/* Card para o Total de Transações */}
                        <Grid item xs={6}>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',  // Centralizando o conteúdo dentro do Box
                                px: 2,
                                py: 3,
                                height: 200,
                                borderRadius: 5,
                                background: theme.palette.secondary.main,
                            }}>
                                <Grid container alignItems="center" justifyContent="center" gap={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" sx={{
                                            color: theme.palette.primary.main,
                                            textAlign: 'center',
                                            fontSize: 33
                                        }}>
                                            Total de transações
                                        </Typography>
                                    </Grid>
                                    {loading ? (
                                        <Grid item xs={12} container justifyContent="center" alignItems="center">
                                            <Box sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center', // Centralizando o loading
                                                alignItems: 'center',
                                                height: '60px'// Garantir que ocupa toda a altura do Box
                                            }}>
                                                <Loading />
                                            </Box>
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12}>
                                            <Typography variant="h3" sx={{
                                                color: theme.palette.primary.white,
                                                textAlign: 'center',
                                            }}>
                                                {dataTransactions.totalTransactions}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        </Grid>

                        {/* Card para o Saldo Atual */}
                        <Grid item xs={6}>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                px: 2,
                                py: 3,
                                height: 200,
                                borderRadius: 5,
                                background: theme.palette.secondary.main,
                            }}>
                                <Grid container alignItems="center" justifyContent="center" gap={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" sx={{
                                            color: theme.palette.primary.main,
                                            textAlign: 'center',
                                            fontSize: 33
                                        }}>
                                            Saldo Atual
                                        </Typography>
                                    </Grid>
                                    {loading ? (
                                        <Grid item xs={12} container justifyContent="center" alignItems="center">
                                            <Box sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center', // Centralizando o loading
                                                alignItems: 'center',
                                                height: '60px' // Garantir que ocupa toda a altura do Box
                                            }}>
                                                <Loading />
                                            </Box>
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12}>
                                            <Typography variant="h3" sx={{
                                                color: theme.palette.primary.white,
                                                textAlign: 'center',
                                            }}>
                                                {Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                }).format(dataTransactions.saldoAtual)}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                    <FilterValuesByOptions />
                </Grid> */}
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            pesquisaPor: '',
                            campoValor: '', 
                        }}
                        onSubmit={handleSubmit}>
                        {({ values, setFieldValue, errors, touched }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={values.pesquisaPor ? 6 : 12}>
                                        <FormControl fullWidth margin="normal">
                                            <Field name="pesquisaPor">
                                                {({ field, form }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        onChange={(event, newValue) => {
                                                            setFieldValue('pesquisaPor', newValue ? newValue.value : '');
                                                            setFieldValue('campoValor', ''); 
                                                        }}
                                                        options={searchOptions}
                                                        getOptionLabel={(option) => option.label}
                                                        value={searchOptions.find(option => option.value === values.pesquisaPor) || null}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Procurar por"
                                                                variant="outlined"
                                                                fullWidth
                                                                error={form.touched.pesquisaPor && Boolean(form.errors.pesquisaPor)}
                                                                helperText={form.touched.pesquisaPor && form.errors.pesquisaPor}
                                                            />
                                                        )}
                                                        sx={{
                                                            "& .MuiInputBase-input": {
                                                                color: theme.palette.secondary.main, 
                                                            },
                                                            "& .MuiFormLabel-root": {
                                                                color: theme.palette.secondary.main, 
                                                            },
                                                            "& .MuiOutlinedInput-root": {
                                                                "& fieldset": {
                                                                    borderColor: (theme) => theme.palette.primary.main, 
                                                                },
                                                                "&:hover fieldset": {
                                                                    borderColor: (theme) => theme.palette.primary.dark,
                                                                },
                                                                "&.Mui-focused fieldset": {
                                                                    borderColor: (theme) => theme.palette.primary.main,
                                                                },
                                                            },
                                                        }}
                                                        renderOption={(props, option) => (
                                                            <Box {...props} sx={{ color: (theme) => theme.palette.primary.main }}>
                                                                {option.label}
                                                            </Box>
                                                        )}
                                                    />
                                                )}
                                            </Field>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal" error={touched.campoValor && Boolean(errors.campoValor)}>
                                            {values.pesquisaPor && (
                                                <Field name="campoValor">
                                                    {({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            label={
                                                                // values.pesquisaPor === 'id' ? 'ID' :
                                                                    values.pesquisaPor === 'data' ? 'Data (YYYY-MM-DD)' :
                                                                        values.pesquisaPor === 'mes' ? 'Mês' :
                                                                            values.pesquisaPor === 'ano' ? 'Ano' :
                                                                                values.pesquisaPor === 'semana' ? 'Semana' : ''
                                                            }
                                                            type={
                                                                values.pesquisaPor === 'data' ? 'date' :
                                                                    values.pesquisaPor === 'ano' || values.pesquisaPor === 'mes' || values.pesquisaPor === 'semana' ? 'number' : 'text'
                                                            }
                                                            value={values.campoValor}
                                                            onChange={(e) => setFieldValue('campoValor', e.target.value)}
                                                            variant="outlined"
                                                            fullWidth
                                                            sx={{
                                                                "& .MuiInputBase-input": {
                                                                    color: theme.palette.secondary.main, 
                                                                },
                                                                "& .MuiFormLabel-root": {
                                                                    color: theme.palette.secondary.main, 
                                                                },
                                                                "& .MuiOutlinedInput-root": {
                                                                    "& fieldset": {
                                                                        borderColor: (theme) => theme.palette.primary.main,
                                                                    },
                                                                    "&:hover fieldset": {
                                                                        borderColor: (theme) => theme.palette.primary.dark, 
                                                                    },
                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: (theme) => theme.palette.primary.main,
                                                                    },
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                            <FormHelperText>{touched.campoValor && errors.campoValor}</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    {/* Botão de envio */}
                                    <Grid item xs={12} sm={12}>
                                        <Box sx={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: "flex-end"
                                        }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                sx={{ marginTop: '2px', px: 8 }}
                                            >
                                                Buscar
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={7}>
                        <Grid item xs={12} >
                            <Grid container component={Paper} elevation={1}>
                                <Grid item xs={12}>
                                    <Box sx={{
                                        width: '100%',
                                        py: 2,
                                        px: 1,
                                        bgcolor: theme.palette.secondary.main,
                                        borderRadius: "6px 6px 0 0"
                                    }} >
                                        <Grid container alignItems={"center"} justifyContent="space-between">

                                            <Grid item xs={2} lg={2} sm={2} md={2}>
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: { lg: "center", xs: 'flex-start' }
                                                }}>
                                                    <Typography variant="h5"
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontSize: { lg: '18px', xs: '14px' },
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        Data
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2} lg={2} sm={2} md={2}>
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}>
                                                    <Typography variant="h5"
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontSize: { lg: '18px', xs: '14px' },
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        Categoria
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2} lg={2} sm={2} md={2}>
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}>
                                                    <Typography variant="h5"
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontSize: { lg: '18px', xs: '14px' },
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        Pagamento
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2} lg={2} sm={2} md={2}>
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}>
                                                    <Typography variant="h5"
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontSize: { lg: '18px', xs: '14px' },
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        Telefone
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2} lg={2} sm={2} md={2}>
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}>
                                                    <Typography variant="h5"
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontSize: { lg: '18px', xs: '14px' },
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        Total
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={2} lg={2} sm={2} md={2}>
                                                <Box sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: { lg: "center", md: 'center', sm: 'flex-end', xs: 'flex-end' }
                                                }}>
                                                    <Typography variant="h5"
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            fontSize: { lg: '18px', xs: '14px' },
                                                            fontWeight: "400",
                                                        }}
                                                    >
                                                        Ações
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>

                                {loading ? (
                                    <Grid item xs={12} >
                                        <Box sx={{
                                            width: '100%',
                                            height: '400px',
                                            display: "flex",
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Loading />
                                        </Box>
                                    </Grid>
                                ) :
                                    <Grid item xs={12} border={`1px solid ${theme.palette.secondary.main}`} sx={{ borderRadius: '0 0 5px 5px' }}>
                                        {data.length > 0 && (
                                            data.slice((page - 1) * limit, page * limit).map((item, index) => (
                                                <Box key={index}  >
                                                    <TableTransactions data={item} />
                                                    {index < data.slice((page - 1) * limit, page * limit).length - 1 && (
                                                        <Divider sx={{ borderColor: "#e7e7e7", borderBottomWidth: 1 }} />
                                                    )}
                                                </Box>
                                            ))
                                        )}
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                {data.length > 0 && (
                                    <Grid item xs={12}>
                                        <Paginator
                                            count={data.length}
                                            limit={limit}
                                            setPage={setPage}
                                            page={page}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Caixa
