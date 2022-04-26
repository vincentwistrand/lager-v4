import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries() {
    return (
        <Stack.Navigator initialRouteName="Leveranser">
            <Stack.Screen name="Leveranser" component={DeliveriesList} />
            <Stack.Screen name="Ny leverans" component={DeliveryForm} />
        </Stack.Navigator>
    );
};