// src/screens/DropOffMapScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const DropOffMapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locations, setLocations] = useState([
    { id: "1", name: "Cafe Green", latitude: 49.1406, longitude: 9.2205, address: "123 Future St", distance: "0.5 km" },
    { id: "2", name: "Eco Store", latitude: 49.141, longitude: 9.222, address: "456 Eco Rd", distance: "0.8 km" },
    { id: "3", name: "Recycle Hub", latitude: 49.139, longitude: 9.219, address: "789 Green Blvd", distance: "1.0 km" },
  ]);

  const [newDropOffs, setNewDropOffs] = useState([
    { id: "4", name: "Bio Cafe", latitude: 49.142, longitude: 9.223, address: "123 Bio Lane", distance: "0.6 km" },
    { id: "5", name: "Green Drop", latitude: 49.140, longitude: 9.221, address: "456 Nature Way", distance: "0.7 km" },
  ]);

  const handleLocationSelect = (locationName: string) => {
    Alert.alert("Location Selected", `You have selected ${locationName} as your drop-off point.`);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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
              <TouchableOpacity
                key={item.id}
                style={styles.listItem}
                onPress={() => handleLocationSelect(item.name)}
              >
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemAddress}>{item.address}</Text>
                <Text style={styles.itemDistance}>{item.distance}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>New Drop-Off Suggestions</Text>
            {newDropOffs.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.listItem}
                onPress={() => handleLocationSelect(item.name)}
              >
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemAddress}>{item.address}</Text>
                <Text style={styles.itemDistance}>{item.distance}</Text>
              </TouchableOpacity>
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
