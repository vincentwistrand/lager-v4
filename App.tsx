import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleveranser": "list"
};

export default function App() {
  return (
      <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName = routeIcons[route.name] || "alert";

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
          })}
          >
          <Tab.Screen name="Lager" 
                      component={Home} 
                      options={{headerShown:false, unmountOnBlur: true}}
                      listeners={({navigation}) => ({focus: () => navigation.setParams({screen: "FirstScreenOfSecondScreenStack"})})}/>
          <Tab.Screen name="Plock" 
                      component={Pick} 
                      options={{headerShown:false}}/>
          <Tab.Screen name="Inleveranser" 
                      component={Deliveries} 
                      options={{headerShown:false}}/>
          </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
