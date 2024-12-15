import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'linear-gradient(180deg, #2c3e50, #34495e)', // Adding gradient background
          borderTopColor: 'transparent', // Remove any border
          height: Platform.OS === 'ios' ? 80 : 60, // Maintain a clean and balanced height
          paddingBottom: Platform.OS === 'ios' ? 20 : 8, // Adjust padding for a lighter feel
          borderRadius: 16, // Smooth rounded corners for a polished look
          marginHorizontal: 16, // Side margin to ensure space between screen edge and tab bar
          shadowColor: '#000', // Soft shadow for a floating effect
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05, // Reduced shadow opacity for a more subtle effect
          shadowRadius: 10,
          elevation: 4, // Subtle elevation for Android
        },
        tabBarActiveTintColor: colors.primary, // Active icon color
        tabBarInactiveTintColor: colors.gray[400], // Inactive icon color
        headerShown: false,
        tabBarShowLabel: false, // No labels for simplicity
        tabBarIconStyle: {
          transform: [{ scale: 1.2 }], // Increase icon size slightly on active state
        },
        tabBarItemStyle: {
          paddingVertical: 6, // Ensuring the spacing looks balanced
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="library" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
