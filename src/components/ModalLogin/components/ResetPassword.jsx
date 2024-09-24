// ResetPassword.js
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showAlert } from "@/store/actions";
import customAxios from "@/service/middleware";
import { ResetPasswordUser } from "@/service/auth.service";

const ResetPassword = ({ setMode, phone }) => {
  const [newPassword, setNewPassword] = useState("");
  console.log(phone)
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await ResetPasswordUser(newPassword)
      console.log(response.data)
      if (response.data) {
        dispatch(showAlert(response.data.message, "success", "user"))
        setMode('login');
      }
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6">Redefinir Senha</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="newPassword"
        label="Nova Senha"
        name="newPassword"
        autoComplete="new-password"
        sx={{
          '& .MuiInputBase-root': {
            color: '#FF4D00',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#FF4D00',
            },
            '&:hover fieldset': {
              borderColor: '#FF4D00',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF4D00',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#FF4D00',
          },
        }}
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{
        mt: 3,
        mb: 2,
        backgroundColor: "#FF4D00",
        color: "#FFF",
        border: `1px solid #FF4D00`,
        ":hover": {
          bgcolor: 'transparent',
          color: "#FF4D00"
        }
      }}>
        Redefinir Senha
      </Button>
    </Box>
  );
};

export default ResetPassword;
