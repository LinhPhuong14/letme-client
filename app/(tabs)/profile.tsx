import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Ionicons name="notifications-outline" size={24} color="#6CB4EE" style={styles.bellIcon} /> */}
        <View style={styles.avatar} />
        <Text style={styles.username}>Username</Text>
        <Text style={styles.email}>gmail</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lorem ipsum</Text>
          <Text style={styles.sectionText}>Lorem ipsum</Text>
          <Text style={styles.sectionText}>Lorem ipsum</Text>
        </View>

        {[...Array(3)].map((_, i) => (
          <TouchableOpacity key={i} style={styles.box}>
            <Text style={styles.boxText}>Lorem ipsum</Text>
          </TouchableOpacity>
        ))}

       

        {[...Array(2)].map((_, i) => (
          <View key={i} style={styles.box} />
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      {/* <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} color="#60836C" />
        <Ionicons name="infinite-outline" size={24} color="#60836C" />
        <Ionicons name="heart-outline" size={24} color="#60836C" />
        <Ionicons name="calendar-outline" size={24} color="#60836C" />
        <Ionicons name="person-circle" size={30} color="#60836C" />
      </View> */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6E7' },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FDF6E7',
    position: 'relative',
  },
  bellIcon: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#B5CD9D',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#60836C',
  },
  email: {
    fontSize: 14,
    color: '#808080',
    marginBottom: 10,
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#D3E6BD',
    width: '100%',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#B04A1E',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionText: {
    color: '#6A6A6A',
  },
  box: {
    backgroundColor: '#D3E6BD',
    width: '100%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  boxText: {
    color: '#4A4A4A',
  },
  input: {
    backgroundColor: '#D3E6BD',
    width: '100%',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#00A0FF',
    marginBottom: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#E7F0D7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
