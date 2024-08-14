/* eslint-disable react/jsx-key */

'use client';
import React from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';

const steps = ['Endereço', 'Pagamento', 'Visualizar', 'Finalizado'];
const icons = [
  <PersonIcon sx={{ fontSize: { xs: 15, md: 25, sm: 20, lg: 30 } }} />,
  <PaymentIcon sx={{ fontSize: { xs: 15, md: 25, sm: 20, lg: 30 } }} />,
  <DescriptionIcon sx={{ fontSize: { xs: 15, md: 25, sm: 20, lg: 30 } }} />,
  <CheckCircleIcon sx={{ fontSize: { xs: 15, md: 25, sm: 20, lg: 30 } }} />,
];

const CheckoutSteps = ({ activeStep }) => {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Grid container justifyContent={'space-between'} alignItems="center">
        {steps.map((label, index) => (
          <React.Fragment key={index}>
            <Grid item>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color:
                    activeStep === index || activeStep > index
                      ? theme.palette.primary.main
                      : '#6D6D6D',
                }}
              >
                {React.cloneElement(icons[index], {
                  sx: {
                    fontSize: { xs: 15, md: 25, sm: 20, lg: 30 },
                    color:
                      activeStep === index || activeStep > index
                        ? theme.palette.primary.main
                        : '#6D6D6D',
                  },
                })}
                <Typography sx={{ mt: 1, fontSize: { lg: 13, xs: 11 } }}>
                  {label}
                </Typography>
              </Box>
            </Grid>
            {index < steps.length - 1 && (
              <Grid item>
                <ArrowForwardIosIcon
                  key={`arrow-${index}`}
                  sx={{
                    fontSize: { xs: 15, md: 25, sm: 20, lg: 30 },
                    color:
                      activeStep > index
                        ? theme.palette.primary.main
                        : '#6D6D6D',
                  }}
                />
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default CheckoutSteps;
