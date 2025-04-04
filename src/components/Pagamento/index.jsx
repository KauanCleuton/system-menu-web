import React, { useState } from 'react';
import { Button, TextField, Box, Grid, Typography, useTheme } from '@mui/material';
import { MoneyOff, CreditCard, AttachMoneyOutlined, PixOutlined, CreditCardOutlined } from '@mui/icons-material';

const Pagamento = ({ onPaymentMethodChange, handleNext, handleBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [troco, setTroco] = useState('');

  const theme = useTheme()
  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    onPaymentMethodChange(method, method === 'Dinheiro' ? troco : '');
  };

  const handleTrocoChange = (event) => {
    setTroco(event.target.value);
    if (paymentMethod === 'Dinheiro') {
      onPaymentMethodChange(paymentMethod, event.target.value);
    }
  };

  const isNextButtonEnabled = () => {
    if (paymentMethod === 'cash') {
      return trocoValue.trim() !== '';
    }
    return paymentMethod !== '';
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Escolha a sua forma de Pagamento
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant={paymentMethod === 'PIX' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePaymentChange('PIX')}
            startIcon={<PixOutlined />}
            sx={{ py: 2 }}
          >
            PIX {`(85) 99298-5693`}
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant={paymentMethod === 'Dinheiro' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePaymentChange('Dinheiro')}
            startIcon={<AttachMoneyOutlined />}
            sx={{ py: 2 }}
          >
            Dinheiro
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant={paymentMethod === 'CREDIT_CARD' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handlePaymentChange('CREDIT_CARD')}
            startIcon={<CreditCardOutlined />}
            sx={{ py: 2 }}
          >
            Cartão de Crédito
          </Button>
        </Grid>

        {paymentMethod === 'Dinheiro' && (
          <Grid item xs={12} >
            <TextField
              label="Troco"
              type="number"
              value={troco}
              sx={{
                "& .MuiInputBase-input": {
                  color: theme.palette.secondary.main
                },
                "& .MuiFormLabel-root": {
                  color: theme.palette.secondary.main
                },
                "& .MuiFormHelperText-root": {
                  color: theme.palette.primary.main // Cor do texto de ajuda
                }
              }}
              onChange={handleTrocoChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        )}
        <Grid item xs={12} >
          <Box sx={{
            width: "100%",
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              sx={{ mt: 2 }}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ mt: 2 }}
              disabled={!isNextButtonEnabled()}
            >
              Próximo
            </Button>
          </Box>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Pagamento;
