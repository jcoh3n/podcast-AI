import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from './src/screens/HomeScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { AudioPlayer } from './src/components/AudioPlayer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen />;
      case 'Library':
        return <LibraryScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Main Content */}
      <View style={[styles.content]}>
        {renderScreen()}
      </View>

      {/* Fixed Bottom Container */}
      <View style={styles.bottomContainer}>
        {/* Audio Player */}
        <AudioPlayer />

        {/* Navigation Bar */}
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentScreen('Home')}
          >
            <MaterialCommunityIcons
              name={currentScreen === 'Home' ? 'home' : 'home-outline'}
              size={28}
              color={currentScreen === 'Home' ? '#8B5CF6' : '#6B7280'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentScreen('Library')}
          >
            <MaterialCommunityIcons
              name="library"
              size={28}
              color={currentScreen === 'Library' ? '#8B5CF6' : '#6B7280'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentScreen('Profile')}
          >
            <MaterialCommunityIcons
              name={currentScreen === 'Profile' ? 'account' : 'account-outline'}
              size={28}
              color={currentScreen === 'Profile' ? '#8B5CF6' : '#6B7280'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  content: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1F2937',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});