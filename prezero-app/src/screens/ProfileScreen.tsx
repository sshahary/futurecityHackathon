import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const userStats = {
    name: 'John Doe',
    recycledItems: 150,
    carbonSaved: 45, // in kg
    // image= "profile-screen.png"
  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.stat}>Name: {userStats.name}</Text>
      <Text style={styles.stat}>Recycled Items: {userStats.recycledItems}</Text>
      <Text style={styles.stat}>Carbon Saved: {userStats.carbonSaved} kg</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#374151',
  },
  stat: {
    fontSize: 18,
    marginVertical: 5,
    color: '#4b5563',
  },
});

export default ProfileScreen;