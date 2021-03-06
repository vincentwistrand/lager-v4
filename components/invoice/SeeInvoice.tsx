import { ScrollView, Text } from "react-native";
import { Typography } from '../../styles/index.js';

export default function SeeInvoice({ route, navigation }) {
    const { invoice } = route.params;

    return (
        <ScrollView style={Typography.main}>
            <Text style={Typography.h1}>Faktura {invoice.id}</Text>
            <Text style={Typography.p}>{invoice.name}</Text>
            <Text style={Typography.p}>{invoice.address}</Text>
            <Text style={Typography.p}>{invoice.zip}</Text>
            <Text style={Typography.p}>{invoice.city}</Text>
            <Text style={Typography.p}>{invoice.country}</Text>
            <Text></Text>
            <Text style={Typography.pBold}>Order nr:{invoice.order_id}</Text>
            <Text style={Typography.pBold}>Totalt: {invoice.total_price}:-</Text>
            <Text style={Typography.pBold}>Skapad: {invoice.creation_date}</Text>
            <Text style={Typography.pBold}>Betalas senast: {invoice.due_date}</Text>
        </ScrollView>
    );
}