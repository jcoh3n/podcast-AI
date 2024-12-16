import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export const MiniPlayer = ({ podcast, isPlaying, onPlayPause }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: podcast.coverUrl }}
          style={styles.artwork}
        />
        
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {podcast.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {podcast.author}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.playButton}
          onPress={onPlayPause}
        >
          <MaterialCommunityIcons
            name={isPlaying ? 'pause' : 'play'}
            size={28}
            color={colors.foreground}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.gray[800],
    borderTopWidth: 1,
    borderTopColor: colors.gray[700],
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: colors.foreground,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artist: {
    color: colors.gray[400],
    fontSize: 14,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
