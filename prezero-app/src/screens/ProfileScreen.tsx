import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const ProfileScreen = () => {
  const userStats = {
    name: 'Dagger Duckling',
    recycledItems: 150,
    carbonSaved: 45,
    profileId: 'user-12345',
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.header}>{userStats.name}</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Container reused: {userStats.recycledItems} times</Text>
        <Text style={styles.stat}>Co2 Emissions prevented: {userStats.carbonSaved} kg</Text>
      </View>

      <View style={styles.qrContainer}>
        <Text style={styles.qrText}>Your Profile QR Code</Text>
        <QRCode value={userStats.profileId} size={120} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1f2937',
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 30,
  },
  stat: {
    fontSize: 16,
    marginVertical: 5,
    color: '#374151', // Tailwind's gray-700
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4b5563',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;