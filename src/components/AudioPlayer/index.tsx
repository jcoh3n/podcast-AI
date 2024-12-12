import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618' }}
            style={styles.cover}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>Current Podcast</Text>
            <Text style={styles.subtitle} numberOfLines={1}>Episode Title</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <MaterialCommunityIcons name="skip-previous" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.playButton} 
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <MaterialCommunityIcons 
              name={isPlaying ? "pause" : "play"} 
              size={28} 
              color="white"
              style={styles.playIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <MaterialCommunityIcons name="skip-next" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    backgroundColor: '#8B5CF6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  playIcon: {
    marginLeft: Platform.OS === 'ios' ? 2 : 0,
  },
});