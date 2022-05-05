import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ViewInvoices from './ViewInvoices';
import CreateInvoice from './CreateInvoice';
import SeeInvoice from './SeeInvoice';

const Stack = createNativeStackNavigator();

export default function Invoices() {
    return (
        <Stack.Navigator initialRouteName="Visa fakturor">
            <Stack.Screen 
                        name="Visa fakturor" 
                        component={ViewInvoices}
                        options={{
                            headerStyle: {
                              backgroundColor: '#1E6738',
                            },
                            headerTintColor: '#fff'
                        }} />
            <Stack.Screen 
                        name="Skapa faktura" 
                        component={CreateInvoice}
                        options={{
                            headerStyle: {
                              backgroundColor: '#1E6738',
                            },
                            headerTintColor: '#fff'
                        }} />
            <Stack.Screen 
                        name="Visa faktura" 
                        component={SeeInvoice}
                        options={{
                            headerStyle: {
                              backgroundColor: '#1E6738',
                            },
                            headerTintColor: '#fff'
                        }} />
        </Stack.Navigator>
    );
}
