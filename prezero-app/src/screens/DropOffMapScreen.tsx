// src/screens/DropOffMapScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const DropOffMapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locations, setLocations] = useState([
    { id: "1", name: "Cafe Green", latitude: 37.7749, longitude: -122.4194 },
    { id: "2", name: "Eco Store", latitude: 37.775, longitude: -122.4185 },
    { id: "3", name: "Recycle Hub", latitude: 37.7745, longitude: -122.4202 },
    { id: "4", name: "Green Planet Cafe", latitude: 37.7735, longitude: -122.4190 },
    { id: "5", name: "Sustainable Shop", latitude: 37.7739, longitude: -122.4208 },
  ]);

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

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Fetching your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude,
            }}
            title={loc.name}
            description={"Drop off your recyclables here!"}
          />
        ))}

        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Your Location"
          pinColor="blue"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8d7da",
  },
  errorText: {
    color: "#721c24",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff3cd",
  },
  loadingText: {
    color: "#856404",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DropOffMapScreen;
