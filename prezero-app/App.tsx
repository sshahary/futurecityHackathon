// App.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import DropOffMapScreen from './src/screens/DropOffMapScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Scan') {
              iconName = focused ? 'qr-code' : 'qr-code-outline';
            } else if (route.name === 'Drop-Off Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Rewards') {
              iconName = focused ? 'gift' : 'gift-outline';
            } else {
              iconName = 'help';
            }

            return <Ionicons name={iconName} size={size || 20} color={color} />;
          },
          tabBarActiveTintColor: '#10b981',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Scan" component={ScannerScreen} />
        <Tab.Screen name="Drop-Off Map" component={DropOffMapScreen} />
        <Tab.Screen name="Rewards" component={RewardsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
