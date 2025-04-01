"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_ALERT } from "@/store/actions";
import AdminService from "@/service/admin.service";
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    TextField,
    Typography,
    styled,
    useTheme
} from "@mui/material";
import { AccountCircle, PhotoCamera } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import { extractDataFromSession } from "@/utils/auth";

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const ImageEditor = styled(Box)({
    margin: '20px'
});

const Input = styled('input')({
    display: 'none'
});

const Badge = styled('div')({
    position: 'relative',
    display: 'inline-block'
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

const BadgeIcon = styled(IconButton)({
    position: 'absolute',
    bottom: '0px',
    right: '-22px',
});

const adminSv = new AdminService();

const Page = () => {
    const theme = useTheme();
    const data = extractDataFromSession();

    console.log(data, '9293912391293923921392')
    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState(null);
    const [initialValues, setInitialValues] = useState({
        name: '',
        phone: '',
        address: {
            road: '',
            house_number: '',
            neighborhood: '',
            city: '',
            complement: '',
            postalCode: ''
        }
    });
    const fetchData = async () => {
        try {
            const userData = await adminSv.getUserDataById(data.id);
            console.log(userData, '991293923929')
            setProfileImage(userData.photo_url || '')
            setInitialValues({
                name: userData.name || '',
                phone: userData.phone || '',
                address: {
                    road: userData.address?.road || '',
                    house_number: userData.address?.house_number || '',
                    neighborhood: userData.address?.neighborhood || '',
                    city: userData.address?.city || '',
                    complement: userData.address?.complement || '',
                    postalCode: userData.address?.postalCode || ''
                }
            });
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setProfileImage(reader.result);


                const payload = { file_url: reader.result };

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

    useEffect(() => {

        fetchData();
    }, [data.id]);


    const validate = (values) => {
        const errors = {};
        if (!values.name) errors.name = 'Campo obrigatório';
        if (!values.phone) errors.phone = 'Campo obrigatório';

        Object.keys(values.address).forEach(field => {
            if (!values.address[field]) {
                errors.address = { ...(errors.address || {}), [field]: 'Campo obrigatório' };
            }
        });

        return errors;
    };

    const fieldLabels = {
        road: 'Rua',
        house_number: 'Número',
        neighborhood: 'Bairro',
        city: 'Cidade',
        complement: 'Complemento',
        postalCode: 'CEP'
    };

    const handleSubmit = async (values) => {
        console.log(values, ' 123123123')
        try {
            const response = await adminSv.putUpdateUser(values);
            dispatch({ type: SET_ALERT, message: 'Informações atualizadas com sucesso!', severity: 'success', icon: 'user' });
        } catch (error) {
            dispatch({ type: SET_ALERT, message: 'Erro ao atualizar dados!', severity: 'error', icon: 'user' });
            console.error(error);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Grid container spacing={'36px'}>
                <Grid item xs={12}>
                    <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: 700, color: theme.palette.primary.main }}>
                        Perfil
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h3" sx={{ fontSize: '19.69px', fontWeight: 400, color: theme.palette.primary.main }}>
                                Foto
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Badge>
                                    {profileImage ? (
                                        <StyledAvatar src={profileImage} />
                                    ) : (
                                        <StyledAccountCircle sx={{ color: theme.palette.primary.main }} />
                                    )}
                                    <label htmlFor="icon-button-file">
                                        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleImageUpload} />
                                        <BadgeIcon sx={{ color: theme.palette.primary.main }} aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </BadgeIcon>
                                    </label>
                                </Badge>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validate={validate}
                    >
                        {() => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <InputLabel htmlFor="name">Nome</InputLabel>
                                        <Field name="name">
                                            {({ field, form }) => (
                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                    <TextField {...field} id="name" variant="outlined" sx={{
                                                        "& .MuiInputBase-input": {
                                                            color: theme.palette.secondary.main
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: theme.palette.secondary.main
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
                                                            color: theme.palette.primary.main
                                                        }
                                                    }} />
                                                    {form.errors.name && form.touched.name && (
                                                        <FormHelperText error>{form.errors.name}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <InputLabel htmlFor="phone">Telefone</InputLabel>
                                        <Field name="phone">
                                            {({ field, form }) => (
                                                <FormControl fullWidth sx={{ mt: 1 }}>
                                                    <TextField {...field} id="phone" variant="outlined" sx={{
                                                        "& .MuiInputBase-input": {
                                                            color: theme.palette.secondary.main
                                                        },
                                                        "& .MuiFormLabel-root": {
                                                            color: theme.palette.secondary.main
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
                                                            color: theme.palette.primary.main
                                                        }
                                                    }} />
                                                    {form.errors.phone && form.touched.phone && (
                                                        <FormHelperText error>{form.errors.phone}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>
                                    {Object.keys(fieldLabels).map((fieldName) => (
                                        <Grid item xs={12} lg={4} key={fieldName}>
                                            <InputLabel htmlFor={fieldName}>{fieldLabels[fieldName]}</InputLabel>
                                            <Field name={`address.${fieldName}`}>
                                                {({ field, form }) => (
                                                    <FormControl fullWidth sx={{ mt: 1 }}>
                                                        <TextField {...field} id={fieldName} variant="outlined" sx={{
                                                            "& .MuiInputBase-input": {
                                                                color: theme.palette.secondary.main
                                                            },
                                                            "& .MuiFormLabel-root": {
                                                                color: theme.palette.secondary.main
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
                                                                color: theme.palette.primary.main
                                                            }
                                                        }} />
                                                        {form.errors.address && form.errors.address[fieldName] && form.touched.address && (
                                                            <FormHelperText error>{form.errors.address[fieldName]}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                                    <Button variant="text" onClick={() => window.location.reload()}>
                                        Cancelar
                                    </Button>
                                    <Button variant="contained" type="submit" sx={{ ml: 2 }}>
                                        Enviar
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Page;
