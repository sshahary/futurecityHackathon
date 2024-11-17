import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const RewardsScreen = () => {
  const [offers, setOffers] = useState([
    {
      id: '1',
      title: 'Mcdonald',
      description: '10% off on any burgers',
      points: 200,
      image: require('../../assets/coffee.png'),
    },
    {
      id: '2',
      title: 'Burger Heart',
      description: '15% off on all types of beverages',
      points: 150,
      image: require('../../assets/bread.png'),
    },
    {
      id: '3',
      title: 'IPAI Cafe',
      description: '10% off on Coffee and/or Tee',
      points: 300,
      image: require('../../assets/bottle.png'),
    },
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Offers</Text>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.offerContainer}>
            <Image source={item.image} style={styles.offerImage} />
            <View style={styles.offerDetails}>
              <Text style={styles.offerTitle}>{item.title}</Text>
              <Text style={styles.offerDescription}>{item.description}</Text>
              <Text style={styles.offerPoints}>{item.points} points</Text>
              <TouchableOpacity style={styles.activateButton}>
                <Text style={styles.activateButtonText}>Activate</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f4f6',
      padding: 10,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#374151',
    },
    offerContainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginBottom: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 3,
      padding: 10,
      alignItems: 'center',
    },
    offerImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 10,
    },
    offerDetails: {
        flex: 1,
      },
      offerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      offerDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
      },
      offerPoints: {
        fontSize: 14,
        color: '#10b981',
        marginBottom: 10,
      },
      activateButton: {
        backgroundColor: '#10b981',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      activateButtonText: {
        color: '#fff',
        fontSize: 14,
      },
    });

    export default RewardsScreen;
    