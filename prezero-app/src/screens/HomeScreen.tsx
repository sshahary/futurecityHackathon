import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/Shared/Card';
import demoData from '../../services/demoData'

const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Reusables</Text>
        <FlatList
          data={demoData.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card item={item} />}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', // Tailwind's gray-100
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#374151', // Tailwind's gray-800
  },
});

export default HomeScreen;