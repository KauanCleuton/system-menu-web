import { Box, Button, Typography, InputAdornment, InputBase, FormControl, InputLabel, useTheme } from "@mui/material";
import { useState } from "react";
import { MailOutline } from "@mui/icons-material";
import customAxios from "@/service/middleware";
import { showAlert } from "@/store/actions";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "@/service/auth.service";

const AuthForgotPassword = ({ setMode, setPhone }) => {
  const theme = useTheme()
  const [phoneForgot, setPhoneForgot] = useState({
    phone: ''
  });
  const dispatch = useDispatch();

  const formatPhoneNumber = (phone) => {
    return phone.replace(/\D/g, '');
};


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(phoneForgot)
    const phoneUser = {
      phone: formatPhoneNumber(phoneForgot.phone)
    }
    try {
      const response = await ForgotPassword(phoneUser)
      console.log(response.data);
      if (response.data) {
        dispatch(showAlert(response.data.message, "success", "user"));
        setMode('verifyToken');
      }
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6">Recuperar Senha</Typography>
      <FormControl fullWidth required sx={{ mt: 2 }}>
        <InputBase
          id="phone"
          name="phone"
          autoComplete="phone"
          autoFocus
          placeholder="Número de Telefone"
          value={phoneForgot.phone}
          onChange={(e) => {
            setPhoneForgot((state) => ({...state, phone: e.target.value}));
            setPhone(e.target.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <MailOutline sx={{ color: theme.palette.primary.main, width: 15, height: 15 }} />
            </InputAdornment>
          }
          sx={{
            borderBottom: '2px solid',
            borderColor: theme.palette.primary.main,
            '& .MuiInputBase-input': {
              color: theme.palette.primary.main,
            },
            '& .MuiInputBase-root': {
              borderColor: theme.palette.primary.main,
              borderBottom: '1px solid',
              '&:hover': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused': {
                borderColor: theme.palette.primary.main,
                borderBottom: '2px solid',
              },
            },
          }}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ 
        mt: 3, 
        mb: 2, 
        backgroundColor: theme.palette.primary.main, color: "#FFF", 
        border: `1px solid ${theme.palette.primary.main}`,
        ":hover": {
          bgcolor: 'transparent',
          color: theme.palette.primary.main
        }

       }}>
        Enviar Código
      </Button>
    </Box>
  );
};

export default AuthForgotPassword;
