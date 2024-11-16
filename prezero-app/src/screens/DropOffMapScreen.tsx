// src/screens/DropOffMapScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const DropOffMapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locations, setLocations] = useState([
    { id: "1", name: "Cafe Green", latitude: 37.7749, longitude: -122.4194, address: "123 Main St", distance: "1.5 km" },
    { id: "2", name: "Eco Store", latitude: 37.775, longitude: -122.4185, address: "456 Elm St", distance: "2.0 km" },
    { id: "3", name: "Recycle Hub", latitude: 37.7745, longitude: -122.4202, address: "789 Oak St", distance: "2.5 km" },
    { id: "4", name: "Green Planet Cafe", latitude: 37.7735, longitude: -122.4190, address: "321 Pine St", distance: "3.0 km" },
    { id: "5", name: "Sustainable Shop", latitude: 37.7739, longitude: -122.4208, address: "654 Maple St", distance: "3.5 km" },
  ]);

  const [newDropOffs, setNewDropOffs] = useState([
    { id: "6", name: "Eco Drop", latitude: 37.7725, longitude: -122.4215, address: "432 Cedar St", distance: "2.0 km" },
    { id: "7", name: "Green Drop", latitude: 37.7728, longitude: -122.4197, address: "789 Birch St", distance: "2.2 km" },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
            />
            {locations.map((loc) => (
              <Marker
                key={loc.id}
                coordinate={{
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                }}
                title={loc.name}
              />
            ))}
            {newDropOffs.map((loc) => (
              <Marker
                key={loc.id}
                coordinate={{
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                }}
                title={loc.name}
                pinColor="orange"
              />
            ))}
          </MapView>
          <ScrollView style={styles.listContainer}>
            <Text style={styles.sectionTitle}>Nearby Drop-Off Locations</Text>
            {locations.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemAddress}>{item.address}</Text>
                <Text style={styles.itemDistance}>{item.distance}</Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>New Drop-Off Suggestions</Text>
            {newDropOffs.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemAddress}>{item.address}</Text>
                <Text style={styles.itemDistance}>{item.distance}</Text>
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <Text style={styles.text}>{errorMsg || "Finding your location..."}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 2,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemAddress: {
    fontSize: 14,
    color: "#555",
  },
  itemDistance: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#374151",
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
});

export default DropOffMapScreen;
