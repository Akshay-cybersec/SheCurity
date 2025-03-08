import React, { useState, useEffect, useRef } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, Switch } from 'react-native';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import Torch from "react-native-torch";
import { Camera } from "expo-camera";


export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState('Fetching location...');
  const [region, setRegion] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(true);
  const soundRef = useRef(null);
  const [isTorchOn, setIsTorchOn] = useState(false);

  const toggleFlashlight = () => {
    setIsTorchOn(!isTorchOn);
    Torch.switchState(!isTorchOn);
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Permission Denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = currentLocation.coords;
      setRegion({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });

      let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (addressResponse.length > 0) {
        let address = addressResponse[0];
        const city = address.city || 'Unknown City';
        const region = address.region || 'Unknown Region';
        setLocation(` ${city}, ${region}`);

      } else {
        setLocation('Location not found');
      }
    })();
  }, []);

  const playSosAlert = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setAlertMessage('🚨 SOS Alert is Active! 🚨');

    if (isAlarmEnabled) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/siren-alert-96052.mp3'),
          { shouldPlay: true, isLooping: false }
        );
        soundRef.current = sound;
        await sound.playAsync();
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    }

    // Automatically stop after 10 seconds
    setTimeout(() => {
      stopSosAlert();
    }, 10000);
  };

  const stopSosAlert = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setIsPlaying(false);
    setAlertMessage('SOS Alert Stopped');

    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flash}>
        <View >
          <Ionicons name="flashlight" size={40} color="black" style={styles.flashicon} onPress={toggleFlashlight} />
        </View>
      </View>
      <View style={styles.locationContainer}>
        <View>
          <Text style={styles.locationText}>{location}</Text>
          <Ionicons name="location" size={20} color="#D7263D" style={styles.locationIcon} />
        </View>
      </View>

      {region && (
        <MapView style={styles.map} region={region}>
          <Marker coordinate={region} title="Your Location" />
        </MapView>
      )}

      {alertMessage !== '' && (
        <View style={styles.alertMessageContainer}>
          <Text style={styles.alertMessage}>{alertMessage}</Text>
        </View>
      )}

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Enable Alarm Sound</Text>
        <Switch value={isAlarmEnabled} onValueChange={setIsAlarmEnabled} />
      </View>

      <View style={styles.buttonContainer}>
        {!isPlaying ? (
          <Pressable style={styles.button} onPress={playSosAlert}>
            <Text style={styles.buttonText}>SOS</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.button, { backgroundColor: '#555' }]} onPress={stopSosAlert}>
            <Text style={styles.buttonText}>Stop SOS</Text>
          </Pressable>
        )}

        <View style={styles.twoview}>
          <Pressable style={styles.smallButton} onPress={() => Linking.openURL('tel:7208151141')}>
            <Text style={styles.smallButtonText}>🚔 POLICE HELPLINE</Text>
          </Pressable>

          <Pressable style={styles.smallButton} onPress={() => Linking.openURL('tel:')}>
            <Text style={styles.smallButtonText}>👩‍🦰 WOMEN HELPLINE</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flashicon: {
    left: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '90%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    elevation: 5,
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  button: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#D7263D',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  twoview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  smallButton: {
    flex: 1,
    backgroundColor: '#008585',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  flash: {
    width: '100%',
    flexDirection: 'column',
    marginLeft: '20',
  }
});
