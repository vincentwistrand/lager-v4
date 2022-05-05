import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { Typography, Base } from '../../styles/index.js';
import orderModel from "../../models/orders";
import Order from "../../interface/order";

export default function ShipList({ navigation }) {
    const [allOrders, setAllOrders] = useState<Order[]>([]);

    useEffect(async () => {
        setAllOrders(await orderModel.getOrders());
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            if (order.status_id !== 200) {
                return
            }
            return  <TouchableOpacity
                        style={Base.loginScreenButton}
                        key={index}
                        onPress={() => navigation.navigate('Karta', {
                            order: order
                        })}
                        >
                        <Text style={Base.loginText}>{order.name}</Text>
                    </TouchableOpacity>
        });

    return (
        <View style={Typography.main}>
            <Text style={Typography.h2}>Ordrar redo att levereras</Text>
            {listOfOrders}
        </View>
    );
}
