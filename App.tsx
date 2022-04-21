import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react';
//import { SafeAreaView } from 'react-native-safe-area-context';
import Inventory from "./components/Inventory";
import Pick from "./components/Pick";
import Auth from "./components/auth/Auth";
import Invoices from "./components/invoice/Invoices";
import Deliveries from "./components/Deliveries";
import authModel from "./models/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Hem": "home",
  "Lager": "cube",
  "Plock": "list",
  "Inleveranser": "airplane"
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  console.log(isLoggedIn);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
  }, []);

  return (
      <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName = routeIcons[route.name] || "alert";

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {backgroundColor: '#FFF'}
          })}
          >
          <Tab.Screen name="Hem" 
                      options={{headerShown:false}}>
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
          <Tab.Screen name="Lager" 
                      component={Inventory} 
                      options={{headerShown:false, unmountOnBlur: true}}
                      listeners={({navigation}) => ({focus: () => navigation.setParams({screen: "SecondScreenOfFirstScreenStack"})})}/>
          <Tab.Screen name="Plock" 
                      component={Pick} 
                      options={{headerShown:false}} />
          <Tab.Screen name="Inleveranser" 
                      component={Deliveries} 
                      options={{headerShown:false}} />
          {isLoggedIn ?
              <Tab.Screen name="Fakturor" 
                          component={Invoices}
                          options={{headerShown:false}} />: 
              null}
          </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>

  );
}
