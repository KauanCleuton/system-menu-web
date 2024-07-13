import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import customAxios from "@/service/middleware";
import { showAlert } from "@/store/actions";
import { useDispatch } from "react-redux";

const VerifyToken = ({ setMode }) => {
  const [token, setToken] = useState(Array(6).fill(""));
  const dispatch = useDispatch();
  const inputsRef = useRef([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const tokenStr = token.join("");
      const response = await customAxios.post('/verifyToken', { token: tokenStr });
      console.log(response.data);
      if (response.data.valid) {
        setMode('resetPassword');
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error);
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[A-Za-z0-9]*$/.test(value)) {
      const newToken = [...token];
      newToken[index] = value.toUpperCase();
      setToken(newToken);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !token[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6">Verificar Código</Typography>
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item xs={2} key={index}>
            <TextField
              margin="normal"
              required
              fullWidth
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
              inputRef={(el) => (inputsRef.current[index] = el)}
              id={`digit-${index}`}
              inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
              value={token[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          </Grid>
        ))}
      </Grid>
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
        Verificar
      </Button>
    </Box>
  );
};

export default VerifyToken;
