"use client"
import React, { useState } from 'react';
import { Container, Box, Grid } from '@mui/material';
import CheckoutSteps from '@/components/StepsCheckout';
import PhoneNumberInput from '@/components/PhoneNumberInput';
import BillingAddress from '@/components/BillingAddress';
import userService from '@/service/user.service';
import { useDispatch, useSelector } from 'react-redux';
import Pagamento from '@/components/Pagamento';
import CheckoutPreviewAndEdit from '@/components/CheckoutPreviewAndEdit';
import { SET_ALERT } from '@/store/actions';
import { clearCart } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';
import Finalizado from '@/components/Finalizado';

const UserSv = new userService();

const Checkout = () => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items);
  const total_price = useSelector(state => state.cart.totalAmount);
  const quantity = useSelector(state => state.cart.totalItems);
  const [activeStep, setActiveStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const [mode, setMode] = useState(false);
  const [message, setMessage] = useState('')
  const router = useRouter()
  const [data, setData] = useState({
    name: '',
    quantity: '',
    total_price: '',
    payment: '',
    address: '',
    orderItems: '',
    phone: '',
    troco: ''
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const fetchAddress = async (phoneNumber, nameUser) => {
    try {
      setPhoneNumber(phoneNumber);
      const data = await UserSv.getAddress(phoneNumber);
      console.log(data, 231321)
      setAddress(data);
      
      setMode(true);
      setInitialValues({
        house_number: Number(data.house_number),
        road: data.road,
        neighborhood: data.neighborhood,
        city: data.city,
        complement: data.complement,
      });
      
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      setInitialValues({
        road: '',
        house_number: 0,
        neighborhood: '',
        city: '',
        complement: '',
      });
      setMode(true);
    }
  };

  const handleAddressSubmit = (values) => {
    setAddress(values);
    setData(prevData => ({
      ...prevData,
      address: values,
      phone: phoneNumber,
      quantity: quantity,
      total_price: total_price,
      orderItems: items.map((item) => ({
        product_id: item.idProducts,
        quantity: item.quantity,
        price: item.price,
        observation: item.deliveryDescription,
        title: item.title,
      })),
    }));
    handleNext();
  };

  const handlePaymentMethodChange = (method, troco) => {
    setData(prevData => ({
      ...prevData,
      payment: method,
      troco: method === 'Dinheiro' ? troco : ''
    }));
  };
  const handleFinalize = async (dataForm) => {
    try {
      const formData = new FormData();
      formData.append("name", dataForm.name)
      formData.append("quantity", dataForm.quantity);
      formData.append("total_price", dataForm.total_price);
      formData.append("payment", dataForm.payment);
      formData.append("address", JSON.stringify(data.address));
      formData.append("orderItems", JSON.stringify(data.orderItems));
      formData.append("phone", dataForm.phone);
      formData.append("troco", dataForm.troco);
      if (dataForm.comprovante) {
        formData.append("comprovante", dataForm.comprovante);
      }
      const response = await UserSv.createPedido(formData);
      handleNext();
      dispatch({ type: SET_ALERT, message: response.message, severity: "success" });
      setMessage("success");
      dispatch(clearCart());
    } catch (error) {
      console.error(error);
      setMessage("error");
      dispatch({ type: SET_ALERT, message: "Erro ao finalizar compra", severity: "error" });
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid item xs={12}>
            {mode ? (
              <BillingAddress
                handleSubmit={handleAddressSubmit}
                initialValues={initialValues}
              />
            ) : (
              <PhoneNumberInput onFetchAddress={fetchAddress} setData={setData} />
            )}
          </Grid>
        );
      case 1:
        return (
          <Grid item xs={12}>
            <Pagamento
              onPaymentMethodChange={handlePaymentMethodChange}
              handleNext={handleNext}
            />
          </Grid>
        );
      case 2:
        return (
          <Grid item xs={12}>
            <CheckoutPreviewAndEdit
              data={data}
              handleFinalize={handleFinalize}
            />
          </Grid>
        )
      case 3:
        return (
          <Grid item xs={12}>
            <Finalizado
              status={message}
            />
          </Grid>
        )
      default:
        return 'Unknown step';
    }
  };

  console.log(data)
  return (
    <Box sx={{ width: '100%', height: { xs: "100%", sm: "100vh",md: '100vh',lg: '100vh' }, py: 13 }}>
      <Container fixed sx={{ paddingBottom: "90px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ bgcolor: '#fff', p: 2 }}>
              <CheckoutSteps activeStep={activeStep} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ bgcolor: '#fff', p: 0 }}>
              {getStepContent(activeStep)}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
