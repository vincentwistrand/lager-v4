import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList';
import ShipMap from './ShipMap';

const Stack = createNativeStackNavigator();

export default function Ship() {
    return (
        <Stack.Navigator initialRouteName="Leverans">
            <Stack.Screen 
                        name="Leverans" 
                        component={ShipList}
                        options={{
                            headerStyle: {
                              backgroundColor: '#1E6738',
                            },
                            headerTintColor: '#fff'
                        }} />
            <Stack.Screen 
                        name="Karta" 
                        component={ShipMap}
                        options={{
                            headerStyle: {
                              backgroundColor: '#1E6738',
                            },
                            headerTintColor: '#fff'
                        }} />
        </Stack.Navigator>
    );
};