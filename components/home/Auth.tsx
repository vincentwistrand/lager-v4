import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Base } from '../../styles/index.js';
import { SafeAreaView } from 'react-native-safe-area-context';

import Login from './Login';
import Register from './Register';
import Home from './Home';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <SafeAreaView style={Base.base}>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" options={{headerShown:false}}>
                        {(screenProps) => <Home {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
                    </Stack.Screen>
                    <Stack.Screen name="Login">
                        {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
                    </Stack.Screen>
                    <Stack.Screen name="Register">
                        {(screenProps) => <Register {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
                    </Stack.Screen>
                </Stack.Navigator>
        </SafeAreaView>
    );
};