import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.membership}>Premium Member</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="settings-outline" size={20} color="white" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="time-outline" size={20} color="#8B5CF6" />
              <Text style={styles.statTitle}>Listening Time</Text>
            </View>
            <Text style={styles.statValue}>24h 35m</Text>
            <Text style={styles.statSubtext}>This month</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="heart-outline" size={20} color="#8B5CF6" />
              <Text style={styles.statTitle}>Liked Podcasts</Text>
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statSubtext}>Total liked</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  membership: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  statSubtext: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});