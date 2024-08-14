'use client';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  useTheme,
  Button,
} from '@mui/material';
import CheckoutSteps from '@/components/StepsCheckout';
import Image from 'next/image';
import { isLoggedIn } from '@/utils/auth';
import { useParams } from 'next/navigation';
import Loading from '@/app/loading';
import { useDispatch } from 'react-redux';
import { SET_ALERT } from '@/store/actions';



const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0)

  return (
    <Box sx={{ width: '100%', height: 'auto', py: 13 }}>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Box sx={{ bgcolor: '#fff', p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <CheckoutSteps activeStep={activeStep} />
                </Grid>
                {/* <Grid item xs={12}>
                  {getStepContent(activeStep)}
                </Grid> */}
              </Grid>
            </Box>
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <Box sx={{ bgcolor: '#fff', p: 2 }}>
              <Typography variant="h6" sx={{ color: '#000' }}>
                Carrinho
              </Typography>
              <Box
                sx={{
                  width: '100px',
                  height: '100px',
                  position: 'relative',
                  my: 2,
                }}
              >
                <Image
                  layout="fill"
                  alt="Imagem Avatar Vip"
                  src={'/img/avatar-vip.png'}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography variant="body1">Total: {plans.value}</Typography>
                <Typography variant="body1">{plans.title}</Typography>
                <Typography variant="body1">{plans.value}</Typography>
              </Box>
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
