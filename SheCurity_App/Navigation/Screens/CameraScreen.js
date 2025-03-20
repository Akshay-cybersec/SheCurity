import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Camera } from "react-native-vision-camera";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import Geolocation from "react-native-geolocation-service";
import Communications from "react-native-communications";

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      await tf.ready();
      startDetection();
    })();
  }, []);

  const startDetection = async () => {
    const model = await handpose.load();
    setInterval(async () => {
      if (cameraRef.current) {
        const image = await cameraRef.current.takePictureAsync();
        const predictions = await model.estimateHands(image);

        if (predictions.length > 0) {
          const handData = predictions[0].landmarks;
          if (isFistGesture(handData)) {
            sendSOS();
          }
        }
      }
    }, 2000);
  };

  const isFistGesture = (landmarks) => {
    return landmarks.length > 0; // Add real gesture logic
  };

  const sendSOS = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const message = `Emergency! Help needed at: https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
        Communications.text("911", message);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );
  };

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} />
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close-circle" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  camera: { flex: 1 },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default CameraScreen;
