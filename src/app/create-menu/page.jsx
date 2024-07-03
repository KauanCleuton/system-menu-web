"use client"
import { AccountCircle } from "@mui/icons-material"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"

const AddOptions = () => {
    const [itemUploadImage, setItemUploadImage] = useState(null)
    const [data, setData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        photoBase64: ""
    })
    const [message, setMessage] = useState(null)

    const handleUploadImage = (event) => {
        const files = event.target.files[0]

        if (files) {
            const fileReader = new FileReader()
            fileReader.onloadend = () => {
                const fileResult = fileReader.result
                setData((state) => ({ ...state, photoBase64: fileReader.result.split(',')[1] }))
                setItemUploadImage(fileResult)
            }
            fileReader.readAsDataURL(files)
        }
    }

    const handleChangeGetValue = (event) => {
        const { name, value } = event.target
        setData(state => ({ ...state, [name]: value }))
    }

    const handleSendItem = async () => {
        console.log(data)
        try {
            const response = await axios.post("http://localhost:3333/api/options", data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            setMessage("Produto adicionado com sucesso!")
            console.log(response.data)
        } catch (error) {
            setMessage("Erro ao adicionar um produto")
            console.error("Erro ao adicionar um produto", error)
        }
    }

    return (
        <Box sx={{
            width: "100%",
            height: "100vh",
            px: 2
        }}>
            <Container maxWidth="md" fixed sx={{ py: 15 }}>
                <Grid container spacing={3}>
                    <Grid xs={12} >
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Typography variant="h3" fontSize={40} sx={{ color: "#141414" }} >Adicionar Produto</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} >
                                        <Box sx={{
                                            width: "100%",
                                            justifyContent: "center",
                                            display: "flex"
                                        }}>
                                            <Box sx={{
                                                position: "relative",
                                                width: "150px",
                                                height: "150px"
                                            }}>
                                                {itemUploadImage ? <Image layout="fill" src={itemUploadImage} style={{ objectFit: "cover" }} alt="foto do produto" /> : <AccountCircle sx={{ width: "150px", height: "150px", color: "red" }} />}
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            type="file"
                                            onChange={handleUploadImage}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <Grid container spacing={2}>
                                    <Grid item xs={6} >
                                        <TextField
                                            fullWidth
                                            name="title"
                                            value={data.title}
                                            onChange={handleChangeGetValue}
                                            variant="outlined"
                                            label="Nome do Produto"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Categoria"
                                            type="text"
                                            name="category"
                                            value={data.category}
                                            onChange={handleChangeGetValue}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Preço"
                                            type="text"
                                            name="price"
                                            value={data.price}
                                            onChange={handleChangeGetValue}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Descrição"
                                            name="description"
                                            value={data.description}
                                            onChange={handleChangeGetValue}
                                            type="text"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Button variant="contained" onClick={handleSendItem} sx={{
                                bgcolor: "#001928",
                                color: "#fff"
                            }}>
                                Adicionar Produto
                            </Button>
                        </Box>
                    </Grid>
                    {message && (
                        <Grid item xs={12}>
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Typography variant="h6" color="error">{message}</Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    )
}

export default AddOptions
