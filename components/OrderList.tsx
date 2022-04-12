import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Typography } from '../styles/index.js';
import orderModel from "../models/orders";

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || true;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders())
    }

    useEffect(async () => {
        setAllOrders(await orderModel.getOrders());
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            if (order.status_id !== 100) {
                return
            }
            return <Button style={{color: 'green'}}
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View style={Typography.main}>
            <Text style={Typography.h2}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}
