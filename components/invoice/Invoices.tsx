import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ViewInvoices from './ViewInvoices';
import CreateInvoice from './CreateInvoice';
import SeeInvoice from './SeeInvoice';

const Stack = createNativeStackNavigator();

export default function Invoices() {
    return (
        <Stack.Navigator initialRouteName="Visa fakturor">
            <Stack.Screen name="Visa fakturor" component={ViewInvoices} />
            <Stack.Screen name="Skapa faktura" component={CreateInvoice} />
            <Stack.Screen name="Visa faktura" component={SeeInvoice} />
        </Stack.Navigator>
    );
}
