"use client"
import React, { useEffect, useMemo, useState } from 'react';
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
import TransactionsService from '@/service/transactions.service';

const UserSv = new userService()

const paymentSv = new TransactionsService()
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
    troco: '',
    email: '',
    document: ''
  });

  const memoizedData = useMemo(() => data, [data]);
  const [billing, setBilling] = useState([])
  const [qrCodeGenerate, setQrCodeGenerate] = useState(false)
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


      const formattedPostalCode = data.postalCode.replace('-', '');
      setMode(true);
      setInitialValues({
        house_number: Number(data.house_number),
        road: data.road,
        neighborhood: data.neighborhood,
        city: data.city,
        complement: data.complement,
        postalCode: formattedPostalCode
      });

    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      setInitialValues({
        road: '',
        house_number: 0,
        neighborhood: '',
        city: '',
        complement: '',
        postalCode: ''
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
      formData.append("name", dataForm.name);
      formData.append("email", dataForm.email);
      formData.append("document", dataForm.document);
      formData.append("quantity", dataForm.quantity);
      // const taxaEntrega = data.total_price < 15 ? 2.00 : 0;
      // const valorFinal = Number(data.total_price) + Number(taxaEntrega);
      formData.append("total_price", data.total_price);
      formData.append("payment", dataForm.payment);
      formData.append("address", JSON.stringify(data.address));
      formData.append("orderItems", JSON.stringify(data.orderItems));
      formData.append("phone", dataForm.phone);
      formData.append("troco", dataForm.troco);

      if (dataForm.creditCard && dataForm.installmentCount) {
        formData.append("creditCard", JSON.stringify(dataForm.creditCard))
        formData.append("installmentCount", dataForm.installmentCount)
      }

      if (dataForm.comprovante) {
        formData.append("comprovante", dataForm.comprovante);
      }

      const response = await UserSv.createPedido(formData);

      if (response?.cobranca) {
        setQrCodeGenerate(true);
        localStorage.setItem("idPayment", response?.cobranca.id)
        setBilling(response.cobranca);
        console.log(response.cobranca);
      } else {
        console.warn("Cobranca não retornada pela API");
      }

      dispatch({
        type: SET_ALERT,
        message: dataForm.payment === 'PIX' ? 'Efetue o pagamento' : 'Pedido recebido com sucesso!',
        severity: "success",
      });
      setMessage("success");
      setStatusPagamento("success")
      dispatch(clearCart());
      if (dataForm.payment === 'CREDIT_CARD' || dataForm.payment === 'Dinheiro') {
        handleNext()
      }
    } catch (error) {
      console.error(error);

      setMessage("error");
      dispatch({
        type: SET_ALERT,
        message: "Erro ao finalizar compra",
        severity: "error",
      });
    }
  };
  const [statusPagamento, setStatusPagamento] = useState(null);
  useEffect(() => {
    if (!qrCodeGenerate) {
      console.warn("QR Code não gerado.");
      return;
    }

    let intervalId;

    const getData = async () => {
      try {
        const id = localStorage.getItem("idPayment");

        const data = await paymentSv.getStatusPaymentById(id);

        if ((data.statusPayment === "PAGO" || data.statusPayment === 'Pago') && data.confirmed) {
          setStatusPagamento("success");
          handleNext();
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Erro ao buscar status de pagamento:", error);
      }
    };
    intervalId = setInterval(() => {
      getData();
    }, 2000);

    return () => clearInterval(intervalId);

  }, [qrCodeGenerate]);


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
              handleBack={handleBack}
              total={data.total_price}
            />
          </Grid>
        );
      case 2:
        return (
          <Grid item xs={12}>
            <CheckoutPreviewAndEdit
              data={data}
              handleFinalize={handleFinalize}
              pixCola={billing?.qr_code || ""}
              qrCodeImage={billing?.qr_code_base64 || ""}
              qrCodeGenerated={qrCodeGenerate}
            />

          </Grid>
        )
      case 3:
        return (
          <Grid item xs={12}>
            <Finalizado
              status={statusPagamento}
            />
          </Grid>
        )
      default:
        return 'Unknown step';
    }
  };

  console.log(data)
  return (
    <Box sx={{ width: '100%', height: { xs: "100%", sm: "100%", md: '100%', lg: '100%' }, py: 13, mb: 20 }}>
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
