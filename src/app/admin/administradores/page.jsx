"use client";
import Paginator from "@/components/Paginator";
import TableUsersByRole from "@/components/TableUsersByRole";
import { AdminPanelSettings } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, TextField, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Administradores = () => {
    const theme = useTheme();
    const limit = 10;
    const [page, setPage] = useState(1);

    const data = [
        { id: 1, name: "Kauan", role: "ADMIN", phone: "(85) 99157-9225" },
        { id: 2, name: "Kauan", role: "ADMIN", phone: "(85) 99157-9225" },
        { id: 3, name: "Ana", role: "USER", phone: "(85) 99157-9226" },
        { id: 4, name: "Lucas", role: "USER", phone: "(85) 99157-9227" },
        { id: 5, name: "Maria", role: "USER", phone: "(85) 99157-9228" },
        { id: 6, name: "João", role: "USER", phone: "(85) 99157-9229" },
        { id: 7, name: "Pedro", role: "ADMIN", phone: "(85) 99157-9230" },
        { id: 8, name: "Carla", role: "USER", phone: "(85) 99157-9231" },
        { id: 9, name: "Laura", role: "USER", phone: "(85) 99157-9232" },
        { id: 10, name: "Fernanda", role: "ADMIN", phone: "(85) 99157-9233" },
        { id: 11, name: "Ricardo", role: "USER", phone: "(85) 99157-9234" },
        { id: 12, name: "Camila", role: "USER", phone: "(85) 99157-9235" },
        { id: 13, name: "Gabriel", role: "ADMIN", phone: "(85) 99157-9236" },
        { id: 14, name: "Mariana", role: "USER", phone: "(85) 99157-9237" },
        { id: 15, name: "Rafael", role: "USER", phone: "(85) 99157-9238" },
        { id: 16, name: "Juliana", role: "ADMIN", phone: "(85) 99157-9239" },
        { id: 17, name: "Ricardo", role: "USER", phone: "(85) 99157-9240" },
        { id: 18, name: "Tatiane", role: "USER", phone: "(85) 99157-9241" },
        { id: 19, name: "Aline", role: "ADMIN", phone: "(85) 99157-9242" },
        { id: 20, name: "Daniel", role: "USER", phone: "(85) 99157-9243" },
        { id: 21, name: "Marcelo", role: "USER", phone: "(85) 99157-9244" },
        { id: 22, name: "Roberta", role: "ADMIN", phone: "(85) 99157-9245" },
        { id: 23, name: "Gustavo", role: "USER", phone: "(85) 99157-9246" },
        { id: 24, name: "Patrícia", role: "USER", phone: "(85) 99157-9247" },
        { id: 25, name: "Rodrigo", role: "ADMIN", phone: "(85) 99157-9248" },
        { id: 26, name: "Simone", role: "USER", phone: "(85) 99157-9249" },
        { id: 27, name: "Bruna", role: "USER", phone: "(85) 99157-9250" },
        { id: 28, name: "Henrique", role: "ADMIN", phone: "(85) 99157-9251" },
        { id: 29, name: "Juliana", role: "USER", phone: "(85) 99157-9252" },
        { id: 30, name: "André", role: "USER", phone: "(85) 99157-9253" },
        { id: 31, name: "Larissa", role: "ADMIN", phone: "(85) 99157-9254" },
        { id: 32, name: "Eduardo", role: "USER", phone: "(85) 99157-9255" },
        { id: 33, name: "Marcel", role: "USER", phone: "(85) 99157-9256" },
        { id: 34, name: "Jéssica", role: "ADMIN", phone: "(85) 99157-9257" },
        { id: 35, name: "Victor", role: "USER", phone: "(85) 99157-9258" },
        { id: 36, name: "Viviane", role: "USER", phone: "(85) 99157-9259" },
        { id: 37, name: "Mário", role: "ADMIN", phone: "(85) 99157-9260" },
        { id: 38, name: "Larissa", role: "USER", phone: "(85) 99157-9261" },
        { id: 39, name: "Felipe", role: "USER", phone: "(85) 99157-9262" },
        { id: 40, name: "Tatiane", role: "ADMIN", phone: "(85) 99157-9263" },
        { id: 41, name: "Roberto", role: "USER", phone: "(85) 99157-9264" },
        { id: 42, name: "Cristina", role: "USER", phone: "(85) 99157-9265" },
        { id: 43, name: "Fernando", role: "ADMIN", phone: "(85) 99157-9266" },
        { id: 44, name: "Priscila", role: "USER", phone: "(85) 99157-9267" },
        { id: 45, name: "Diego", role: "USER", phone: "(85) 99157-9268" },
        { id: 46, name: "Rita", role: "ADMIN", phone: "(85) 99157-9269" },
        { id: 47, name: "Cláudia", role: "USER", phone: "(85) 99157-9270" },
        { id: 48, name: "Maurício", role: "USER", phone: "(85) 99157-9271" },
        { id: 49, name: "Marcela", role: "ADMIN", phone: "(85) 99157-9272" },
        { id: 50, name: "Natália", role: "USER", phone: "(85) 99157-9273" },
        { id: 51, name: "Carlos", role: "USER", phone: "(85) 99157-9274" },
        { id: 52, name: "Beatriz", role: "ADMIN", phone: "(85) 99157-9275" }
    ];


    return (
        <Grid container spacing={2} direction='column'> {/* Ajuste no espaçamento geral */}
            <Grid item >
                <Grid container spacing={1} alignItems="center"> {/* Reduzi o espaçamento interno */}
                    <Grid item lg={10} xs={12}>
                        <TextField
                            id="search-admin"
                            label="Buscar Admin"
                            placeholder="Buscar Admin"
                            variant="outlined"
                            fullWidth
                            sx={{
                                "& .MuiInputBase-input": {
                                    color: "#000"
                                },
                                "& .MuiFormLabel-root": {
                                    color: "#000"
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: theme.palette.primary.main
                                    },
                                    "&:hover fieldset": {
                                        borderColor: theme.palette.primary.dark
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: theme.palette.primary.main
                                    }
                                },
                                "& .MuiFormHelperText-root": {
                                    color: "#d32f2f"
                                }
                            }}
                        />
                    </Grid>
                    <Grid item lg={2} xs={12}>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                LinkComponent={Link}
                                href="/admin/administradores/adicionar-admin"
                                sx={{
                                    color: theme.palette.secondary.white,
                                    bgcolor: theme.palette.primary.main,
                                    textTransform: "none",
                                    py: 1,
                                    fontSize: '13px',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    ":hover": {
                                        bgcolor: "transparent",
                                        color: theme.palette.primary.main,
                                    },
                                }}
                            >
                                Novo Admin
                                <AdminPanelSettings sx={{ ml: 1, width: 20, height: 20 }} />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item >
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
                                        <Grid item xs={2} >
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}>
                                                <Typography variant="h5"
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        fontSize: '18px',
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    ID
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}>
                                                <Typography variant="h5"
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        fontSize: '18px',
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    Name
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}>
                                                <Typography variant="h5"
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        fontSize: '18px',
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    Telefone
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}>
                                                <Typography variant="h5"
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        fontSize: '18px',
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    Cargo
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2} >
                                            <Box sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}>
                                                <Typography variant="h5"
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        fontSize: '18px',
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

                            <Grid item xs={12} border="1px solid #000" sx={{ borderRadius: '0 0 5px 5px' }}>
                                {data.length > 0 && (
                                    data.slice((page - 1) * limit, page * limit).map((item, index) => (
                                        <Box key={index}  >
                                            <TableUsersByRole data={item} />
                                            {index < data.slice((page - 1) * limit, page * limit).length - 1 && (
                                                <Divider sx={{ borderColor: "#e7e7e7", borderBottomWidth: 1 }} />
                                            )}
                                        </Box>
                                    ))
                                )}
                            </Grid>
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
    );
};

export default Administradores;

