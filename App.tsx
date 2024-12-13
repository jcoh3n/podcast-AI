// App.tsx
import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from './src/screens/HomeScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { AudioPlayer } from './src/components/AudioPlayer';
import { usePodcastStore } from './src/store/podcast';
import { loginAnonymously } from './src/config/firebase';
import { LogBox } from 'react-native';
import { colors } from './src/theme/colors';
import { layout } from './src/theme/layout';

// Silence common warnings
LogBox.ignoreLogs([
  'AsyncStorage',
  'Warning:',
  'Setting a timer'
]);

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState('Home');
  const { currentPodcast } = usePodcastStore();

  useEffect(() => {
    // Auto login on app start
    loginAnonymously();
  }, []);

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
      
      <View style={[
        styles.content,
        currentPodcast && styles.contentWithPlayer
      ]}>
        {renderScreen()}
      </View>

      <View style={styles.bottomContainer}>
        <AudioPlayer />

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
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  content: {
    flex: 1,
    paddingBottom: 60,
  },
  contentWithPlayer: {
    paddingBottom: 140,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.gray[700],
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