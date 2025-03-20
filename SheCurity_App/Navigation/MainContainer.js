import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../assets/Colors/color';

import HomeScreen from './Screens/HomeScreen';
import ShoppingScreen from './Screens/ShoppingScreen';
import TrustedPeople from './Screens/TrustedPeople';
import CardScreen from './Screens/CartScreen';
import CaseScreen from './Screens/CaseScreen';
import CameraScreen from './Screens/CameraScreen';
import { TouchableOpacity } from 'react-native';

const HomeName = 'Home';
const ShoppingName = 'Shop';
const TrustedPeopleName = 'Trusted People';
const CardScreenName = 'Cart';
const CaseScreenName = 'Case';
const Scanner = 'Morres code';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainContainer({navigation}) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={HomeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === HomeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === ShoppingName) {
                            iconName = focused ? 'cart' : 'cart-outline'; 
                        } else if (rn === TrustedPeopleName) {
                            iconName = focused ? 'people' : 'people-outline'; 
                        } else if (rn === CardScreenName) {
                            iconName = focused ? 'card' : 'card-outline'; 
                        } else if (rn === CaseScreenName) {
                            iconName = focused ? 'briefcase' : 'briefcase-outline'; 
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: Colors.primary,
                    tabBarStyle: { height: 60 },
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: Colors.primary },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                    headerRight: () => (
                        <TouchableOpacity  style={{ marginRight: 15 }} onPress={() => navigation.navigate('Camera')}>
                            <Ionicons name="camera" size={28} color="white" />
                        </TouchableOpacity>
                    ),
                })}
            >
                <Tab.Screen name={TrustedPeopleName} component={TrustedPeople} options={{ headerTitle: 'Trusted People' }} />
                <Tab.Screen name={HomeName} component={HomeScreen} options={{ headerTitle: 'SheCurity' }} />
                <Tab.Screen name={ShoppingName} component={ShoppingScreen} options={{ headerTitle: 'Shop' }} />
                <Tab.Screen name={CardScreenName} component={CardScreen} options={{ headerTitle: 'Card' }} />
                <Tab.Screen name="Camera" component={CameraScreen} options={{ headerTitle: 'Camera', tabBarButton: () => null }} />
                <Tab.Screen name={CaseScreenName} component={CaseScreen} options={{ headerTitle: 'Case Register' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
