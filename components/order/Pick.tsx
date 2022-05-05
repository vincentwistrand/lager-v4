import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderList from './OrderList';
import PickList from './PickList';

const Stack = createNativeStackNavigator();

export default function Pick() {
    return (
        <Stack.Navigator initialRouteName="Plockbara ordrar">
            <Stack.Screen 
                        name="Plockbara ordrar" 
                        component={OrderList} 
                        options={{
                            headerStyle: {
                              backgroundColor: '#1E6738',
                            },
                            headerTintColor: '#fff'
                        }} />
            <Stack.Screen 
                        name="Plocka order" 
                        component={PickList}
                        options={{
                            headerStyle: {
                              backgroundColor: '#1E6738',
                            },
                            headerTintColor: '#fff'
                        }} />
        </Stack.Navigator>
    );
}
