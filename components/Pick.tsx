import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderList from './OrderList';
import PickList from './PickList';

const Stack = createNativeStackNavigator();

export default function Pick() {
    return (
        <Stack.Navigator initialRouteName="Plockbara ordrar">
            <Stack.Screen name="Plockbara ordrar" component={OrderList} />
            <Stack.Screen name="Plocka order" component={PickList} />
        </Stack.Navigator>
    );
}
