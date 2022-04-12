import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button } from "react-native";
import { Typography, Base } from '../styles/index.js';
import deliveryModel from "../models/deliveries";

export default function DeliveryList({ route, navigation }) {
    const { reload } = route.params || true;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllDeliveries(await deliveryModel.getDeliveries())
    }

    useEffect(async () => {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }, []);
    
    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            return  <View key={index} style={Base.deliveryBase}>
                        <Text style={Typography.h4BottomMargin}>{delivery.product_name}</Text>
                        <Text style={{marginBottom: 5}}>Datum: {delivery.delivery_date}</Text>
                        <Text style={{marginBottom: 5}}>Antal: {delivery.amount}</Text>
                    </View>
        });

    return (
        <ScrollView style={Typography.main}>
            <Text style={Typography.h2}>Inleveranser</Text>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
            <Text>{"\n"}{"\n"}</Text>
        </ScrollView>
    );
}