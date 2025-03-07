import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { AntDesign } from "@expo/vector-icons"; // Icon for floating button
import Colors from '../../assets/Colors/color';

const products = [
  { id: 1, title: "Pepper Spray", description: "Self-defense tool", price: "$10" },
  { id: 2, title: "Safety Alarm", description: "Emergency personal alarm", price: "$15" },
  { id: 3, title: "Taser", description: "Non-lethal self-defense", price: "$25" },
  { id: 4, title: "Door Stop Alarm", description: "Security device for doors", price: "$12" },
  { id: 5, title: "Personal GPS Tracker", description: "Track your location for safety", price: "$30" },
  { id: 6, title: "Stun Gun", description: "Powerful self-defense weapon", price: "$40" },
];


export default function ShoppingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.title} />
            <Card.Content>
              <Text>{item.description}</Text>
              <Text>{item.price}</Text>
            </Card.Content>
            <Card.Actions>
              <Button>Add To Cart</Button>
              <Button>Buy</Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate("CardScreen")} 
      >
        <AntDesign name="arrowright" size={25} color="white" />
      </TouchableOpacity>
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
        padding: 5,
        borderWidth:1,
      },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.primary || "#007AFF", 
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
});



