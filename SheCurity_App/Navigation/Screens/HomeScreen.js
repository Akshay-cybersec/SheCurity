import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Permission Denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = currentLocation.coords;

      let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (addressResponse.length > 0) {
        let address = addressResponse[0];
        setLocation(` ${address.city}, ${address.region}`);
      } else {
        setLocation('Location not found');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Live Location Display */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>📍 {location}</Text>
      </View>

      {/* SOS Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#ff4757' : '#D7263D' }
          ]}
          onPress={() => alert('SOS Button Pressed!')}
        >
          <Text style={styles.buttonText}>SOS</Text>
        </Pressable>

        {/* Two Additional Buttons */}
        <Pressable
          style={styles.smallButton}
          onPress={() => alert('First Button Pressed!')}
        >
          <Text style={styles.smallButtonText}>POLICE HELPLINE NUMBER</Text>
        </Pressable>

        <Pressable
          style={styles.smallButton}
          onPress={() => alert('Second Button Pressed!')}
        >
          <Text style={styles.smallButtonText}>WOMEN HELPLINE NUMBER</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#D7263D',
    elevation: 10,
    shadowColor: '#D7263D',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallButton: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 5,
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
