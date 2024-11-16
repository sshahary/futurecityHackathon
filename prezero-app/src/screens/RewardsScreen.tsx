import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Card from '../../components/Shared/Card';
import demoData from '../../services/demoData';
import QRCode from 'react-native-qrcode-svg';

const RewardsScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Rewards</Text>
        <FlatList
          data={demoData.rewards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Card item={item} />
              <QRCode value={JSON.stringify(item)} size={100} />
            </View>
          )}
        />
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
      marginVertical: 20,
      color: '#374151',
    },
    itemContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
  });
  
  export default RewardsScreen;