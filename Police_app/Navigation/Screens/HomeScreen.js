import React, { useEffect, useState } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity, 
  Linking 
} from "react-native";
import { database } from "../../firestore"; // Ensure correct path
import { ref, onValue } from "firebase/database";

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataRef = ref(database, "users"); // Change to your Firebase path

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

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
      <Text style={styles.header}>User Data</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : data ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
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
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
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
    color: "#666",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#007BFF",
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
