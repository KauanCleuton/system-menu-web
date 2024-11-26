"use client"
import FilterValuesByOptions from '@/components/FilterValuesByOptions'
import { useTheme, Typography, Divider, Paper } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TransactionsService from '@/service/transactions.service'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import { useDispatch } from 'react-redux'
import Paginator from '@/components/Paginator'
import TableTransactions from '@/components/TableTransactions'
import Combining from '@/components/graf'


const transactionsSv = new TransactionsService()

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
            const responseSaldo = await transactionsSv.getTransactionsSummary()
            const responseAll = await transactionsSv.getAllTransactions()
            setData(responseAll)
            const totalTransactions = responseAll.length;
            setDataTransactions(state => ({
                ...state,
                saldoAtual: responseSaldo.saldoAtual,
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
                
                                            <Grid item xs={3} lg={2} sm={3} md={2} >
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
                                            <Grid item xs={3} lg={2} sm={3} md={2} >
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
                                            <Grid item xs={3} lg={2} sm={3} md={2} >
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
                                            <Grid item xs={3} lg={2} sm={3} md={2} >
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
                                            <Grid item xs={3} lg={2} sm={3} md={2} >
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
                                            <Grid item xs={3} lg={2} sm={3} md={2} >
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
                                    <Grid item xs={12} border="1px solid #000" sx={{ borderRadius: '0 0 5px 5px' }}>
                                        {data.length > 0 && (
                                            data.slice((page - 1) * limit, page * limit).map((item, index) => (
                                                <Box key={index}  >
                                                    <TableTransactions data={item}  />
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
