import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Linking,
  RefreshControl
} from "react-native";
import { database } from "../../firestore";
import { ref, onValue } from "firebase/database";

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(() => {
    const dataRef = ref(database, "users");

    return onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData(null);
      }
      setLoading(false);
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = fetchData();

    return () => unsubscribe();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  // Function to open Google Maps
  const openMap = (latitude, longitude) => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      alert("Invalid location data");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>User Data</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={onRefresh}
          disabled={loading || refreshing}
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : data ? (
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#007BFF"]}
            />
          }
        >
          {Object.entries(data).map(([key, user]) => (
            <View key={key} style={styles.card}>
              <Text style={styles.name}>{user.username || "No Name"}</Text>
              <Text style={styles.detail}>Latitude: {user.Latitude || "N/A"}</Text>
              <Text style={styles.detail}>Longitude: {user.Longitude || "N/A"}</Text>
              <Text style={styles.detail}>Message: {user.Message || "No Message"}</Text>

              {/* Button to open Google Maps */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => openMap(user.Latitude, user.Longitude)}
              >
                <Text style={styles.buttonText}>View on Map</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noData}>No data available</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  refreshButton: {
    backgroundColor: '#7b539d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  detail: {
    fontSize: 16,
    color: 'black',
    marginTop: 4,
    margin:'black'
  },
  button: {
    backgroundColor: "#7b539d",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noData: {
    textAlign: "center",
    fontSize: 18,
    color: "#999",
    marginTop: 20,
  },
});