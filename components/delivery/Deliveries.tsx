import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries() {
    return (
        <Stack.Navigator initialRouteName="Leveranser">
            <Stack.Screen 
                        name="Leveranser" 
                        component={DeliveriesList}
                        options={{
                            headerStyle: {
                              backgroundColor: '#1E6738',
                            },
                            headerTintColor: '#fff'
                        }} />
            <Stack.Screen 
                        name="Ny leverans" 
                        component={DeliveryForm}
                        options={{
                            headerStyle: {
                              backgroundColor: '#1E6738',
                            },
                            headerTintColor: '#fff'
                        }} />
        </Stack.Navigator>
    );
};