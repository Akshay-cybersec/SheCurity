import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../assets/Colors/color';

import HomeScreen from './Screens/HomeScreen';
import CaseScreen from './Screens/CaseScreen';

const HomeName = 'Home';
const CaseScreenName = 'Case';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
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
                        } else if (rn === CaseScreenName) {
                            iconName = focused ? 'case' : 'card-outline';
                        }
                        
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: Colors.primary,
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { 
                        height: 60,
                        paddingBottom: 5,
                        paddingTop: 5
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        paddingBottom: 5
                    },
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: Colors.primary },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
                })}
            >
                <Tab.Screen 
                    name={HomeName} 
                    component={HomeScreen} 
                    options={{ headerTitle: 'Alerts' }} 
                />
                <Tab.Screen 
                    name={CaseScreenName} 
                    component={CaseScreen} 
                    options={{ headerTitle: 'Cases' }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}