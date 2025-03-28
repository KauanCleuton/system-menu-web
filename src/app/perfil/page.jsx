"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminService from "@/service/admin.service";
import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    InputLabel,
    TextField,
    Typography,
    styled,
    useTheme
} from "@mui/material";
import { AccountCircle, ArrowBack, PhotoCamera } from "@mui/icons-material";
import { extractDataFromSession } from "@/utils/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePathname, useRouter } from 'next/navigation';



const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
            setInitialValues((state) => ({
                ...state,
                photo_url: reader.result.split(',')[1]
            }));
        };
        reader.readAsDataURL(file);
    }
};



const Page = () => {
    const theme = useTheme();
    const id = useSelector(state => state.login.data.id);
    const data = extractDataFromSession();
    const router = useRouter();
    const [profileImage, setProfileImage] = useState(null);
    const [atualiza, setAtualiza] = useState(false);

    const [isEditing, setIsEditing] = useState(false); 
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        photo_url: '',
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await adminSv.getUserDataById(data.id);
                console.log("useeeeeerrrrrr",userData);
                
                setUserData({
                    name: userData.name || '',
                    phone: userData.phone || '',
                    photo_url: userData.photo_url || '',
                    address: {
                        road: userData.address?.road || '',
                        house_number: userData.address?.house_number || '',
                        neighborhood: userData.address?.neighborhood || '',
                        city: userData.address?.city || '',
                        complement: userData.address?.complement || 'Sem complemento',
                        cep: userData.address?.postalCode || ''
                    }
                });
                setEditedData(userData); 
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
        postalCode: 'CEP'
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

   
    const toggleEdit = async () => {
        if (isEditing) {
            try {
                await adminSv.putUpdateUser(data.id, editedData);
                console.log(editedData,"eddiiiiittttttt");
                
                setUserData(editedData);
                setAtualiza(!atualiza)
                
            } catch (error) {
                console.error("Erro ao atualizar dados:", error);
            }
        }
        setIsEditing(!isEditing);
    };

    return (
        <Box sx={{ width: '100%', height: '100vh', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: '50%', height: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Grid container spacing={'36px'}>
                    <Grid item xs={12} onClick={() => router.push("/")} sx={{ display: "flex", justifyContent: "flex-start", cursor: "pointer" }}>
                        <ArrowBackIcon sx={{ color: theme.palette.primary.main, mr: "10px" }} />
                        <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: 700, color: theme.palette.primary.main }}>
                            Voltar ao menu
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h3" sx={{ fontSize: '24px', fontWeight: 700, color: theme.palette.primary.main }}>
                            Perfil
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            {/* <Grid item xs={12}>
                                <Typography variant="h3" sx={{ fontSize: '19.69px', fontWeight: 400, color: theme.palette.primary.main }}>
                                    Foto
                                </Typography>
                            </Grid> */}
                            <Grid item xs={12}>
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <Badge>
                                        {profileImage ? (
                                            <StyledAvatar src={profileImage} />
                                        ) : (
                                            <StyledAccountCircle sx={{ color: theme.palette.primary.main }} />
                                        )}
                                    </Badge>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold", textTransform: "capitalize", color: "gray" }}>
                                    Nome
                                </Typography>
                                <TextField
                                    value={editedData.name ?? ""}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        readOnly: !isEditing,
                                        sx: { color: "black" },
                                    }}
                                    sx={{ mt: 1 }}
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold", textTransform: "capitalize", color: "gray" }}>
                                    Telefone
                                </Typography>
                                <TextField
                                    value={editedData.phone ?? ""}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        readOnly: !isEditing,
                                        sx: { color: "black" },
                                    }}
                                    sx={{ mt: 1 }}
                                />
                            </Grid>

                            {Object.keys(fieldLabels).map((fieldName) => (
                                <Grid item xs={12} lg={4} key={fieldName}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", textTransform: "capitalize", color: "gray" }}>
                                        {fieldLabels[fieldName]}
                                    </Typography>
                                    <TextField
                                        value={editedData.address?.[fieldName] ?? "aaa"}
                                        onChange={(e) => handleAddressChange(fieldName, e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            readOnly: !isEditing,
                                            sx: { color: "black" },
                                        }}
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                            <Button variant="contained" color="primary" onClick={toggleEdit}>
                                {isEditing ? "Salvar" : "Editar"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Page;