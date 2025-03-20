import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, ActivityIndicator, Linking, Platform } from 'react-native';
import { Button, Card } from 'react-native-paper';
import * as Location from 'expo-location';

export default function CaseListScreen() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    fetchCases();
    getCurrentLocation();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await fetch("http://192.168.0.248:8000/api/fetchlocation/");
      const data = await response.json();
      setCases(data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const openMaps = (latitude, longitude) => {
    if (!currentLocation) {
      alert("Current location not available!");
      return;
    }

    const { latitude: currentLat, longitude: currentLon } = currentLocation;
    
    // Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLon}&destination=${latitude},${longitude}&travelmode=driving`;

    // Apple Maps URL (for iPhones)
    const appleMapsUrl = `maps://?saddr=${currentLat},${currentLon}&daddr=${latitude},${longitude}`;

    // Open Maps based on Platform
    const mapsUrl = Platform.OS === "ios" ? appleMapsUrl : googleMapsUrl;
    Linking.openURL(mapsUrl);
  };

  const handleImageLoad = (id) => {
    setImageLoading((prevState) => ({ ...prevState, [id]: false }));
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cases}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const ipfsUrl = `https://gold-defiant-cricket-17.mypinata.cloud/ipfs/${item.ipfsAddress}`;

          return (
            <Card style={styles.card}>
              {item.ipfsAddress && (
                <View style={styles.imageContainer}>
                  {imageLoading[item.id] !== false && (
                    <ActivityIndicator size="small" color="#007AFF" style={styles.imageLoader} />
                  )}
                  <Image
                    source={{ uri: ipfsUrl }}
                    style={styles.image}
                    resizeMode="cover"
                    onLoad={() => handleImageLoad(item.id)}
                    onError={() => handleImageLoad(item.id)}
                  />
                </View>
              )}
              <Card.Title title={item.name} subtitle={`Phone: ${item.phoneNo}`} />
              <Card.Content>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.infoText}>📍 Latitude: {item.latitude}</Text>
                <Text style={styles.infoText}>📍 Longitude: {item.longitude}</Text>
                <Text style={styles.ipfsText}>🔗 IPFS Hash: {item.ipfsAddress}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => openMaps(item.latitude, item.longitude)}>Track</Button>
              </Card.Actions>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imageLoader: {
    position: "absolute",
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: "#555",
  },
  ipfsText: {
    fontSize: 12,
    color: "#007AFF",
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
