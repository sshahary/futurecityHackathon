import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const DropOffMapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
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
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    })();
  }, []);

  let text = 'Finding your location...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
  }

  return (
    <View style={styles.container}>
      {location ? (
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
        </MapView>
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
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
    text: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 16,
    },
  });
  
  export default DropOffMapScreen;
  