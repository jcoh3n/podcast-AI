#!/bin/bash

echo "🔧 Fixing player components..."

# Update AudioPlayer styles
cat > src/components/AudioPlayer/index.tsx << 'EOF'
// src/components/AudioPlayer/index.tsx
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 80 : 60, // Ajusté pour être au-dessus de la nav bar
    left: 0,
    right: 0,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    height: 72,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
    // Glassmorphism effect
    backgroundColor: 'rgba(31, 41, 55, 0.85)',
    backdropFilter: 'blur(10px)',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: `${colors.primary}33`,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: 8,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cover: {
    width: 42,
    height: 42,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
    color: colors.gray[400],
  },
  rightSide: {
    marginLeft: 16,
  },
  playButton: {
    padding: 8,
  },
  playButtonInner: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  }
});
EOF

# Update FullscreenPlayer
cat > src/components/FullscreenPlayer/index.tsx << 'EOF'
// src/components/FullscreenPlayer/index.tsx

import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { ChatInput } from './components/ChatInput';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const FullscreenPlayer = ({
  isVisible,
  onClose,
  podcast,
  isPlaying,
  onPlayPause,
  onAskQuestion,
  currentResponse,
  isLoading,
}) => {
  const statusBarHeight = StatusBar.currentHeight || 0;
  const topPadding = Platform.OS === 'ios' ? 50 : statusBarHeight;

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      propagateSwipe
      statusBarTranslucent
      deviceHeight={SCREEN_HEIGHT + topPadding}
      animationIn={{
        from: {
          translateY: SCREEN_HEIGHT,
        },
        to: {
          translateY: 0,
        },
      }}
      animationOut={{
        from: {
          translateY: 0,
        },
        to: {
          translateY: SCREEN_HEIGHT,
        },
      }}
      animationInTiming={400}
      animationOutTiming={400}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.handle} />
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialCommunityIcons name="chevron-down" size={32} color={colors.foreground} />
        </TouchableOpacity>

        <Image 
          source={{ uri: podcast?.coverUrl }} 
          style={styles.artwork}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{podcast?.title}</Text>
          <Text style={styles.artist}>{podcast?.author}</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.primaryControl} onPress={onPlayPause}>
            <MaterialCommunityIcons
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={80}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {currentResponse ? (
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>{currentResponse}</Text>
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={() => onAskQuestion(null)}
            >
              <Text style={styles.dismissText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ChatInput onSubmit={onAskQuestion} isLoading={isLoading} />
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background,
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
  },
  handle: {
    width: 36,
    height: 5,
    backgroundColor: colors.gray[600],
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  artwork: {
    width: '75%',
    aspectRatio: 1,
    borderRadius: 8,
    marginVertical: 32,
    alignSelf: 'center',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: 8,
  },
  artist: {
    fontSize: 18,
    color: colors.gray[400],
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  primaryControl: {
    padding: 8,
  },
  responseContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.gray[800],
    borderRadius: 12,
  },
  responseText: {
    color: colors.foreground,
    fontSize: 16,
    lineHeight: 24,
  },
  dismissButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  dismissText: {
    color: colors.primary,
    fontSize: 16,
  },
});
EOF

echo "✅ Fixes applied successfully!"
echo "
Next steps:
1. Restart your development server
2. Test the audio player positioning
3. Verify the modal animations are smooth
"