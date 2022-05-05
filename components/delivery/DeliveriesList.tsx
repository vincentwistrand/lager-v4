import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Typography, Base } from '../../styles/index.js';
import deliveryModel from "../../models/deliveries";

export default function DeliveryList({ route, navigation, test_deliveries=null }) {
    const { reload } = route.params || false;
    const [deliveries, setDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setDeliveries(await deliveryModel.getDeliveries())
        route.params = false;
    }

    useEffect(async () => {
        if (test_deliveries) {
            // For testing
            setDeliveries(test_deliveries);
        } else {
            // Real products
            setDeliveries(await deliveryModel.getDeliveries());
        }
    }, []);
    
    const listOfDeliveries = deliveries
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
                onPress={() => navigation.navigate('Ny leverans')}
                accessibilityLabel="Skapa ny inleverans genom att trycka"
                >
                <Text style={Base.loginText}>Skapa ny inleverans</Text>
            </TouchableOpacity>
            <Text>{"\n"}{"\n"}</Text>
        </ScrollView>
    );
}