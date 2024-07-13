import { Box, Button, Typography, InputAdornment, InputBase, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { MailOutline } from "@mui/icons-material";
import customAxios from "@/service/middleware";
import { showAlert } from "@/store/actions";
import { useDispatch } from "react-redux";

const AuthForgotPassword = ({ setMode, setPhone }) => {
  const [phoneForgot, setPhoneForgot] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await customAxios.post('/forgotPassword', { phone: phoneForgot });
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
          value={phoneForgot}
          onChange={(e) => {
            setPhoneForgot(e.target.value);
            setPhone(e.target.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <MailOutline sx={{ color: '#FF4D00', width: 15, height: 15 }} />
            </InputAdornment>
          }
          sx={{
            borderBottom: '2px solid',
            borderColor: '#FF4D00',
            '& .MuiInputBase-input': {
              color: '#FF4D00',
            },
            '& .MuiInputBase-root': {
              borderColor: '#FF4D00',
              borderBottom: '1px solid',
              '&:hover': {
                borderColor: '#FF4D00',
              },
              '&.Mui-focused': {
                borderColor: '#FF4D00',
                borderBottom: '2px solid',
              },
            },
          }}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ 
        mt: 3, 
        mb: 2, 
        backgroundColor: "#FF4D00", color: "#FFF", 
        border: `1px solid #FF4D00`,
        ":hover": {
          bgcolor: 'transparent',
          color: "#FF4D00"
        }

       }}>
        Enviar Código
      </Button>
    </Box>
  );
};

export default AuthForgotPassword;
