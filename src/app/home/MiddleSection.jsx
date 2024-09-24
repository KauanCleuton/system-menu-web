"use client"
import Menu from "@/components/Menu";
import { Box, Container, Grid, Paper, Typography } from "@mui/material"

const menu = [
    {
        category: 'Hambúrgueres',
        items: [
            {
                id: 'hamburguer_1',
                title: 'Hambúrguer Clássico',
                description: 'Pão, carne bovina, queijo, alface, tomate e maionese.',
                price: 15.21,
                photo: '/img/hamburguer-bg.png'
            },
            {
                id: 'hamburguer_2',
                title: 'Cheeseburguer',
                description: 'Pão, carne bovina, queijo cheddar, alface, tomate e ketchup.',
                price: 17.00,
                photo: '/img/hamburguer-bg.png'
            },
            {
                id: 'hamburguer_3',
                title: 'Bacon Burguer',
                description: 'Pão, carne bovina, queijo, bacon, alface, tomate e molho barbecue.',
                price: 20.00,
                photo: '/img/hamburguer-bg.png'
            }
        ]
    },
    {
        category: 'Pasteis',
        items: [
            {
                id: 'pastel_1',
                title: 'Pastel de Carne',
                description: 'Pastel recheado com carne moída, azeitona e temperos.',
                price: 8.00,
                photo: '/img/hamburguer-bg.png'
            },
            {
                id: 'pastel_2',
                title: 'Pastel de Frango',
                description: 'Pastel recheado com frango desfiado, requeijão e milho.',
                price: 8.00,
                photo: '/img/hamburguer-bg.png'
            },
            {
                id: 'pastel_3',
                title: 'Pastel de Queijo',
                description: 'Pastel recheado com queijo mussarela e orégano.',
                price: 7.00,
                photo: '/img/hamburguer-bg.png'
            },
            {
                id: 'pastel_3',
                title: 'Pastel de Queijo',
                description: 'Pastel recheado com queijo mussarela e orégano.',
                price: 7.00,
                photo: '/img/hamburguer-bg.png'
            }
        ]
    },
    {
        category: 'Bebidas',
        items: [
            {
                id: 'bebida_1',
                title: 'Refrigerante Lata',
                description: 'Lata de refrigerante de 350ml.',
                price: 5.00,
                photo: '/img/hamburguer-bg.png'
            },
            {
                id: 'bebida_2',
                title: 'Suco Natural',
                description: 'Copo de suco natural de laranja.',
                price: 7.00,
                photo: '/img/hamburguer-bg.png'
            },
            {
                id: 'bebida_3',
                title: 'Água Mineral',
                description: 'Garrafa de água mineral de 500ml.',
                price: 3.00,
                photo: '/img/hamburguer-bg.png'
            }
        ]
    },
    {
        category: 'Porções',
        items: [
            {
                id: 'porcao_1',
                title: 'Batata Frita',
                description: 'Porção de batata frita crocante.',
                price: 12.00,
                photo: '/img/hamburguer-bg.png'
            },
            {
                id: 'porcao_2',
                title: 'Mandioca Frita',
                description: 'Porção de mandioca frita dourada.',
                price: 10.00,
                photo: '/img/hamburguer-bg.png'
            },
            {
                id: 'porcao_3',
                title: 'Onion Rings',
                description: 'Porção de anéis de cebola empanados e fritos.',
                price: 15.75,
                photo: '/img/hamburguer1.png'
            }
        ]
    }
];


const MiddleSection = () => {

    return (
        <Box
            sx={{
                width: "100vw",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                py: 2,
            }}
        >
            <Container fixed sx={{ py: '46px'}}>
                <Grid container spacing={'34px'}>
                    <Grid item xs={12} >
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Typography variant="h1"
                                sx={{
                                    fontSize: 34,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "#000000"
                                }}
                            >
                                Conheça nosso menu de opções
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sx={{
                        // height: { lg: 900, md: 900, sm: 700, xs: 'auto' },
                        overflow: "auto"
                    }}>
                        <Menu
                        />
                    </Grid>

                </Grid>
            </Container>
        </Box>
    )
}
export default MiddleSection