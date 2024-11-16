import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";
import demoData from "../../services/demoData";

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState<string>("");
  const [points, setPoints] = useState<{ [key: string]: number }>({
    Plastic: 0,
    Glass: 0,
    Metal: 0,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setData(data);
    if (data.includes("Plastic")) {
        setPoints((prevPoints) => ({ ...prevPoints, Plastic: prevPoints.Plastic + 5 }));
      } else if (data.includes("Glass")) {
        setPoints((prevPoints) => ({ ...prevPoints, Glass: prevPoints.Glass + 3 }));
      } else if (data.includes("Metal")) {
        setPoints((prevPoints) => ({ ...prevPoints, Metal: prevPoints.Metal + 2 }));
      } else {
        alert("Unknown material detected");
      }
  
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
          )}
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>Plastic Points: {points.Plastic}</Text>
            <Text style={styles.pointsText}>Glass Points: {points.Glass}</Text>
            <Text style={styles.pointsText}>Metal Points: {points.Metal}</Text>
          </View>
          {data ? (
            <Text style={styles.dataText}>Scanned Data: {data}</Text>
          ) : null}
        </View>
      );
    };
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        pointsContainer: {
          marginTop: 20,
        },
        pointsText: {
          fontSize: 16,
          marginVertical: 5,
          color: "#374151",
        },
        dataText: {
          marginTop: 20,
          fontSize: 16,
          fontStyle: "italic",
          color: "#374151",
        },
      });
      
      export default ScannerScreen;
