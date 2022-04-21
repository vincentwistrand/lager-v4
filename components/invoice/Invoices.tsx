import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ViewInvoices from './ViewInvoices';
import CreateInvoice from './CreateInvoice';
import SeeInvoice from './SeeInvoice';

const Stack = createNativeStackNavigator();

export default function Invoices() {
    return (
        <Stack.Navigator initialRouteName="ViewInvoices">
            <Stack.Screen name="ViewInvoices" component={ViewInvoices} />
            <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
            <Stack.Screen name="SeeInvoice" component={SeeInvoice} />
        </Stack.Navigator>
    );
}
