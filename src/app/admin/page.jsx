"use client";

import CardOrder from "@/components/CardOrder";
import OrderSv from "@/service/order.service";
import { SET_ALERT } from "@/store/actions";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../loading";

const OrdSv = new OrderSv()

const Dashboard = () => {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        phone: "",
        name: ""
    });

    useEffect(() => {
        fetchOrders();

        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/events/admin`);
        eventSource.onmessage = (event) => {
            const newOrder = JSON.parse(event.data);
            setOrders((prevOrders) => [...prevOrders, newOrder]);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await OrdSv.getOrder();
            console.log(response.data, '12939292')
            setOrders(response);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };
    console.log(orders, '21312939219321923992')

    const handleRouterOrder = async (id, name, phone) => {
        console.log(id, name,phone) 
        const newValues = {
            name,
            phone
        }       
        try {
            setLoading(true);
            const response = await OrdSv.putRouterOrder(id, newValues);
            dispatch({ type: SET_ALERT, message: response.message, severity: "success", alertType: 'user' });
        } catch (error) {
            console.error('Error', error);
            dispatch({ type: SET_ALERT, message: 'Erro ao finalizar pedido!', severity: "error", alertType: 'user' });
        } finally {
            setLoading(false);
            fetchOrders()
        }
    };


    return (
        <Box sx={{ height: '900px', overflow: 'auto', width: '100vw', py: 2 }}>
            <Grid container px={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {loading ?
                            <Box sx={{
                                width: "100%",
                                height: "100%"
                            }}>
                                <Loading />
                            </Box>
                            :
                            orders?.map((order, index) => (
                                <Grid item xs={12} key={index}>
                                    <CardOrder setData={setData} data={order} handleRouterOrder={() => handleRouterOrder(order.idPedidos, order.User.name, order.phone)} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
