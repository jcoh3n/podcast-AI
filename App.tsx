import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
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
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Audio Player */}
      <AudioPlayer />

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentScreen('Home')}
        >
          <Ionicons
            name={currentScreen === 'Home' ? 'home' : 'home-outline'}
            size={24}
            color={currentScreen === 'Home' ? '#8B5CF6' : '#6B7280'}
          />
          <Text style={[
            styles.navText,
            currentScreen === 'Home' && styles.activeNavText
          ]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentScreen('Library')}
        >
          <Ionicons
            name={currentScreen === 'Library' ? 'library' : 'library-outline'}
            size={24}
            color={currentScreen === 'Library' ? '#8B5CF6' : '#6B7280'}
          />
          <Text style={[
            styles.navText,
            currentScreen === 'Library' && styles.activeNavText
          ]}>Library</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentScreen('Profile')}
        >
          <Ionicons
            name={currentScreen === 'Profile' ? 'person' : 'person-outline'}
            size={24}
            color={currentScreen === 'Profile' ? '#8B5CF6' : '#6B7280'}
          />
          <Text style={[
            styles.navText,
            currentScreen === 'Profile' && styles.activeNavText
          ]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    paddingTop: 60,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingBottom: 20,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navText: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  activeNavText: {
    color: '#8B5CF6',
  },
});