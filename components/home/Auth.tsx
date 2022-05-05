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
                    <Stack.Screen 
                                name="Home"
                                options={{
                                    headerStyle: {
                                      backgroundColor: '#1E6738',
                                    },
                                    headerTintColor: '#fff'
                                }}>
                        {(screenProps) => <Home {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
                    </Stack.Screen>
                    <Stack.Screen 
                                name="Login"
                                options={{
                                    headerStyle: {
                                      backgroundColor: '#1E6738',
                                    },
                                    headerTintColor: '#fff'
                                }}>
                        {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
                    </Stack.Screen>
                    <Stack.Screen 
                                name="Register"
                                options={{
                                    headerStyle: {
                                      backgroundColor: '#1E6738',
                                    },
                                    headerTintColor: '#fff'
                                }}>
                        {(screenProps) => <Register {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
                    </Stack.Screen>
                </Stack.Navigator>
        </SafeAreaView>
    );
};