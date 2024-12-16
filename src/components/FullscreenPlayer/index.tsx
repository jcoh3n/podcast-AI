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
