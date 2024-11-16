import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CardProps {
  item: {
    id: string;
    name: string;
    points: number;
    image?: any;
  };
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <View style={styles.card}>
      {item.image && <Image source={item.image} style={styles.image} />}
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.points}>{item.points} Points</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    text: {
      fontSize: 18,
      marginTop: 10,
      color: '#1f2937', // Tailwind's gray-900
    },
    points: {
      fontSize: 16,
      color: '#10b981', // Tailwind's green-500
      marginTop: 5,
    },
    image: {
      width: 50,
      height: 50,
    },
  });
  
  export default Card;
  