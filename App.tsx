import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AudioPlayer } from './src/components/AudioPlayer';
import { usePodcastStore } from './src/store/podcast';
import { loginAnonymously } from './src/config/firebase';
import { LogBox } from 'react-native';
import { colors } from './src/theme/colors';
import { TabNavigator } from './src/navigation/TabNavigator';

LogBox.ignoreLogs([
  'AsyncStorage',
  'Warning:',
  'Setting a timer'
]);

export default function App() {
  const { currentPodcast } = usePodcastStore();

  useEffect(() => {
    loginAnonymously();
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="light" />
        <TabNavigator />
        {currentPodcast && <AudioPlayer />}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
});