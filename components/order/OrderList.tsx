import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { Typography, Base } from '../../styles/index.js';
import orderModel from "../../models/orders";

export default function OrderList({ test_orders=null, route, navigation }) {
    const { reload } = route.params || false;
    const [orders, setOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setOrders(await orderModel.getOrders())
        route.params = false;
    }

    useEffect(async () => {
        if (test_orders) {
            // For testing
            setOrders(test_orders);
        } else {
            // Real orders
            setOrders(await orderModel.getOrders());
        }
    }, []);

    const listOfOrders = orders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            if (order.status_id !== 100) {
                return
            }
            return  <TouchableOpacity
                        style={Base.loginScreenButton}
                        key={index}
                        onPress={() => navigation.navigate('Plocka order', {
                            order: order
                        })}
                        >
                        <Text style={Base.loginText}>{order.name}</Text>
                    </TouchableOpacity>
        });

    return (
        <View style={Typography.main}>
            <Text style={Typography.h2}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}
