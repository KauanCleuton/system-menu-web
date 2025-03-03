import { Table, TableRow, TableCell, TableHead, TableBody, IconButton, Switch, FormControlLabel, Box, Typography, useTheme, TableContainer, useMediaQuery } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

const TableProducts = ({ data, onDelete, toggleVisible, page, limit }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <TableContainer>
            <Table sx={{ minWidth: '100%' }}>
                <TableHead>
                    <TableRow sx={{ bgcolor: theme.palette.secondary.main }}>
                        {['Imagem', 'Título', 'Descrição', 'Quantidade', 'Preço', 'Categoria', 'Ações'].map((header, index) => (
                            <TableCell
                                key={index}
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontWeight: 'bold',
                                    fontSize: { lg: '14px', xs: '12px' },
                                    bgcolor: theme.palette.secondary.main,
                                    textAlign: 'center'
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.slice((page - 1) * limit, page * limit).map((item, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">
                                <Box sx={{ width: 70, height: 70, position: 'relative' }}>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/produtos/${item.idProducts}`}
                                        alt="Imagem do produto"
                                        layout="fill"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ fontSize: { xs: 10, lg: 13 }, color: 'secondary.main' }}>
                                    {item.title || "Sem título"}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ fontSize: { xs: 10, lg: 13 }, color: 'secondary.main' }}>
                                    {item.description || "Sem descrição"}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ fontSize: { xs: 10, lg: 13 }, color: 'secondary.main' }}>
                                    {item.quantity || "Indefinido"}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ fontSize: { xs: 10, lg: 13 }, color: 'secondary.main' }}>
                                    {parseFloat(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ fontSize: { xs: 10, lg: 13 }, color: 'secondary.main' }}>
                                    {item.Category?.name || "indefinido"}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    <IconButton
                                        LinkComponent={Link}
                                        href={`/admin/produtos/${item.idProducts}`}
                                        sx={{ fontSize: isXs ? 16 : 24 }}
                                    >
                                        <Edit color="action" />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => onDelete(item.idProducts)}
                                        sx={{ fontSize: isXs ? 16 : 24 }}
                                    >
                                        <Delete color="error" />
                                    </IconButton>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={item.isVisible}
                                                onChange={() => toggleVisible(item.idProducts)}
                                            />
                                        }
                                        label="Visível"
                                    />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableProducts;
