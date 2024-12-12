import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from './src/screens/HomeScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { AudioPlayer } from './src/components/AudioPlayer';
import { usePodcastStore } from './src/store/podcast';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const { currentPodcast } = usePodcastStore();

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
      <View style={[
        styles.content,
        currentPodcast && styles.contentWithPlayer
      ]}>
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
            accessibilityLabel="Home"
            accessibilityRole="tab"
            accessibilityState={{ selected: currentScreen === 'Home' }}
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
            accessibilityLabel="Library"
            accessibilityRole="tab"
            accessibilityState={{ selected: currentScreen === 'Library' }}
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
            accessibilityLabel="Profile"
            accessibilityRole="tab"
            accessibilityState={{ selected: currentScreen === 'Profile' }}
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
    paddingBottom: 60, // Height of the navbar
  },
  contentWithPlayer: {
    paddingBottom: 140, // Height of navbar + audio player
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