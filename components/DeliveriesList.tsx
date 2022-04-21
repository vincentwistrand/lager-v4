import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Typography, Base } from '../styles/index.js';
import deliveryModel from "../models/deliveries";

export default function DeliveryList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
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
            <TouchableOpacity
                style={Base.loginScreenButton}
                onPress={() => navigation.navigate('Form')}
                underlayColor='#fff'>
                <Text style={Base.loginText}>Skapa ny inleverans</Text>
            </TouchableOpacity>
            <Text>{"\n"}{"\n"}</Text>
        </ScrollView>
    );
}