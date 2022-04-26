import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
//import { SafeAreaView } from 'react-native-safe-area-context';
import Inventory from "./components/inventory/Inventory";
import Pick from "./components/order/Pick";
import Auth from "./components/home/Auth";
import Invoices from "./components/invoice/Invoices";
import Deliveries from "./components/delivery/Deliveries";
import Ship from "./components/ship/Ship";
import authModel from "./models/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Hem": "home",
  "Lager": "cube",
  "Plock": "list",
  "Inleveranser": "airplane",
  "Fakturor": "document-text",
  "Leveranser": "map"
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
          <Tab.Screen name="Leveranser" 
                      component={Ship} 
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
