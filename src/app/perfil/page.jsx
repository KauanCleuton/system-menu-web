"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminService from "@/service/admin.service";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography,
    styled,
    useTheme
} from "@mui/material";
import { AccountCircle, ArrowBack, PhotoCamera } from "@mui/icons-material";
import { extractDataFromSession } from "@/utils/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const Input = styled('input')({
    display: 'none'
});

const StyledAvatar = styled(Avatar)({
    width: '200px',
    height: '200px',
    cursor: 'pointer'
});

const StyledAccountCircle = styled(AccountCircle)({
    width: '200px',
    height: '200px'
});

const adminSv = new AdminService();



const Page = () => {
    const theme = useTheme();
    const data = extractDataFromSession();
    const router = useRouter();
    const [profileImage, setProfileImage] = useState(null);
    const [atualiza, setAtualiza] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        phone: '',

        address: {
            road: '',
            house_number: '',
            neighborhood: '',
            city: '',
            complement: '',
            cep: ''
        }
    });

    const [editedData, setEditedData] = useState(userData);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setProfileImage(reader.result);  

                
                const payload = { photo_url: reader.result };

                try {
                    
                    await adminSv.putUpdateUserPhoto(payload);
                    console.log("Foto atualizada com sucesso!");
                } catch (error) {
                    console.error("Erro ao atualizar foto:", error);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Nome é obrigatório')
            .min(2, 'Nome deve ter pelo menos 2 caracteres'),
        phone: Yup.string()
            .required('Telefone é obrigatório')
            .matches(/^\d+$/, 'Telefone deve conter apenas números'),
        address: Yup.object().shape({
            road: Yup.string().required('Rua é obrigatória'),
            house_number: Yup.string().required('Número é obrigatório'),
            neighborhood: Yup.string().required('Bairro é obrigatório'),
            city: Yup.string().required('Cidade é obrigatória'),
            complement: Yup.string(),
            cep: Yup.string().required('CEP é obrigatório').matches(/^\d{5}-\d{3}$/, 'CEP inválido'),
        }),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await adminSv.getUserDataById(data.id);
                console.log("user data", userData);

                setUserData({
                    name: userData.name || '',
                    phone: userData.phone || '',

                    address: {
                        road: userData.address?.road || '',
                        house_number: userData.address?.house_number || '',
                        neighborhood: userData.address?.neighborhood || '',
                        city: userData.address?.city || '',
                        complement: userData.address?.complement || 'Sem complemento',
                        cep: userData.address?.postalCode || ''
                    }
                });

                setEditedData({
                    name: userData.name || '',
                    phone: userData.phone || '',

                    address: {
                        road: userData.address?.road || '',
                        house_number: userData.address?.house_number || '',
                        neighborhood: userData.address?.neighborhood || '',
                        city: userData.address?.city || '',
                        complement: userData.address?.complement || 'Sem complemento',
                        cep: userData.address?.postalCode || ''
                    }
                });
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        fetchData();
    }, [atualiza]);

    const fieldLabels = {
        road: 'Rua',
        house_number: 'Número',
        neighborhood: 'Bairro',
        city: 'Cidade',
        complement: 'Complemento',
        cep: 'CEP'
    };

    const handleInputChange = (field, value) => {
        setEditedData((prevState) => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleAddressChange = (field, value) => {
        setEditedData((prevState) => ({
            ...prevState,
            address: {
                ...prevState.address,
                [field]: value
            }
        }));
    };

    const toggleEdit = async (values) => {
        if (isEditing) {
            try {
               

                console.log(values, "dados editados");

                
                await adminSv.putUpdateUser(data.id, values);
                setUserData(requestData);
                setAtualiza(!atualiza);
            } catch (error) {
                console.error("Erro ao atualizar dados:", error);
            }
        }
        setIsEditing(!isEditing);
    };


    return (
        <Box sx={{ width: '100%', height: '100%', display: "flex", py: 14, justifyContent: "center", alignItems: "center" }}>
            <Container fixed sx={{ paddingBottom: '50px' }}>
                <Grid container spacing={'36px'}>
                    <Grid item xs={12} onClick={() => router.push("/")} sx={{ display: "flex", justifyContent: "flex-start", cursor: "pointer" }}>
                        <ArrowBackIcon sx={{ color: theme.palette.primary.main, mr: "10px" }} />
                        <Typography variant="h3" sx={{ fontSize: { xs: '16px', sm: '20px', md: '24px' }, fontWeight: 700, color: theme.palette.primary.main }}>
                            Voltar ao menu
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <StyledAvatar src={profileImage || userData.photo_url} />
                        </Box>
                        {isEditing && (
                            <Box sx={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleImageUpload} />
                                    <Badge sx={{ color: theme.palette.primary.main }} aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </Badge>
                                </label>
                            </Box>
                        )}

                    </Grid>

                    <Formik
                        key={JSON.stringify(editedData)}
                        initialValues={editedData || { name: '', phone: '', address: {} }}
                        validationSchema={validationSchema}
                        validateOnBlur={true}
                        validateOnChange={false}
                        onSubmit={(values) => {
                            console.log(values, "enviado");
                            toggleEdit(values); // Passa os valores para salvar
                        }}
                    >
                        {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} lg={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", textTransform: "capitalize", color: "gray" }}>
                                            Nome
                                        </Typography>
                                        <TextField
                                            name="name"
                                            value={values.name || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            fullWidth
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                            InputProps={{
                                                readOnly: !isEditing,
                                                sx: { backgroundColor: isEditing ? theme.palette.background.paper : "transparent", color: "black" },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={6} lg={6}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", textTransform: "capitalize", color: "gray" }}>
                                            Telefone
                                        </Typography>
                                        <TextField
                                            name="phone"
                                            value={values.phone || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            variant="outlined"
                                            fullWidth
                                            error={touched.phone && Boolean(errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                            InputProps={{
                                                readOnly: !isEditing,
                                                sx: { backgroundColor: isEditing ? theme.palette.background.paper : "transparent", color: "black" },
                                            }}
                                        />
                                    </Grid>

                                    {Object.keys(fieldLabels).map((fieldName) => (
                                        <Grid item xs={4} lg={4} key={fieldName}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", textTransform: "capitalize", color: "gray" }}>
                                                {fieldLabels[fieldName]}
                                            </Typography>
                                            <TextField
                                                name={`address.${fieldName}`}
                                                value={values.address?.[fieldName] || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="outlined"
                                                fullWidth
                                                error={touched.address?.[fieldName] && Boolean(errors.address?.[fieldName])}
                                                helperText={touched.address?.[fieldName] && errors.address?.[fieldName]}
                                                InputProps={{
                                                    readOnly: !isEditing,
                                                    sx: { backgroundColor: isEditing ? theme.palette.background.paper : "transparent", color: "black" },
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        {!isEditing ? (
                                            <Box>
                                            <Button sx={{ mr: 2, my: 1 }} variant="contained" color="primary" onClick={() => toggleEdit(values)}>
                                                Editar
                                            </Button>
                                            </Box>
                                        ) : (
                                            <Box>

                                                <Button sx={{ mr: 2, my: 1 }} variant="contained" color="primary" onClick={() => setIsEditing(false)}>
                                                    Cancelar
                                                </Button>
                                                <Button variant="contained" color="primary" onClick={() => toggleEdit(values)}>
                                                    Salvar
                                                </Button>
                                            </Box>
                                        )}

                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Formik>
                </Grid>
            </Container>
        </Box>
    );
};

export default Page;
