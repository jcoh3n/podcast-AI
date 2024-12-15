#!/bin/bash

# Step 1: Update App.tsx styles
echo "Updating App.tsx styles..."
cat > App.tsx << 'EOL'
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
      <View style={[
        styles.container,
        !currentPodcast && styles.containerWithoutPlayer
      ]}>
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
    paddingBottom: Platform.OS === 'ios' ? 90 : 70, // Reduced padding for player
  },
  containerWithoutPlayer: {
    paddingBottom: 0, // Remove bottom padding when no player
  },
});
EOL

# Step 2: Update TabNavigator.tsx to adjust height when no player
echo "Updating TabNavigator.tsx..."
sed -i '' 's/height: Platform.OS === '\''ios'\'' ? 80 : 60/height: Platform.OS === '\''ios'\'' ? (showPlayer ? 80 : 60) : (showPlayer ? 60 : 50)/' src/navigation/TabNavigator.tsx
sed -i '' 's/const TabNavigator = () => {/const TabNavigator = () => {\n  const { currentPodcast } = usePodcastStore();\n  const showPlayer = Boolean(currentPodcast);/' src/navigation/TabNavigator.tsx
sed -i '' '1i import { usePodcastStore } from '\''../store/podcast'\'';' src/navigation/TabNavigator.tsx

# Step 3: Update AudioPlayer index.tsx to ensure clean unmounting
echo "Updating AudioPlayer component..."
sed -i '' '/const AudioPlayer = () => {/a\
  useEffect(() => {\
    return () => {\
      // Cleanup when component unmounts\
      if (currentPodcast) {\
        togglePlayback();\
      }\
    };\
  }, []);' src/components/AudioPlayer/index.tsx

# Step 4: Verify files were updated correctly
echo "Verifying changes..."
if [ -f "App.tsx" ] && [ -f "src/navigation/TabNavigator.tsx" ] && [ -f "src/components/AudioPlayer/index.tsx" ]; then
    echo "✅ Files updated successfully"
else
    echo "❌ Error: Some files could not be updated"
    exit 1
fi

echo "Done! Please rebuild your app to see the changes."