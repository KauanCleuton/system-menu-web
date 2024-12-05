import { Table, TableRow, TableCell, TableHead, TableBody, IconButton, Switch, FormControlLabel, Box, Typography, useTheme, TableContainer, useMediaQuery } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

const TableProducts = ({ data, onDelete, toggleVisible }) => {
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.down("xs"));
    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ("" + phoneNumber).replace(/\D/g, "");
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phoneNumber;
    };

    return (
        <TableContainer >
            <Table sx={{ minWidth: '100%' }}>
                <TableHead>
                    <TableRow sx={{ bgcolor: theme.palette.secondary.main }}>
                        {['Imagem', 'Título', 'Descrição', 'Preço', 'Categoria', 'Ações'].map((header, index) => (
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
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">
                                <Box sx={{
                                    width: 70,
                                    height: 70,
                                    position: 'relative'
                                }}>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/produtos/${item.idProducts}`}
                                        alt="Imagem do produto"
                                        layout="fill"
                                        style={{
                                            objectFit: 'cover'
                                        }}
                                    />

                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ fontSize: { xs: 10, lg: 13 }, color: 'secondary.main' }}>
                                    {item.title}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ fontSize: { xs: 10, lg: 13 }, color: 'secondary.main' }}>
                                    {item.description}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ fontSize: { xs: 10, lg: 13 }, color: 'secondary.main' }}>
                                    {parseFloat(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body1" sx={{ fontSize: { xs: 10, lg: 13 }, color: 'secondary.main' }}>
                                    {item.Category.name}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    <IconButton
                                        LinkComponent={Link}
                                        href={`/admin/produtos/${item.idProducts}`}
                                        sx={{
                                            fontSize: isXs ? 16 : 24,
                                        }}
                                    >
                                        <Edit color="action" />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => onDelete(item.idProducts)}
                                        sx={{
                                            fontSize: isXs ? 16 : 24,
                                        }}
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
