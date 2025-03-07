import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { AntDesign } from "@expo/vector-icons"; 
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
  const [cart, setCart] = useState({}); // Stores item counts

  // Function to increase quantity
  const increaseQuantity = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: { ...item, quantity: (prevCart[item.id]?.quantity || 0) + 1 },
    }));
  };

  // Function to decrease quantity
  const decreaseQuantity = (item) => {
    setCart((prevCart) => {
      if (prevCart[item.id]?.quantity > 1) {
        return {
          ...prevCart,
          [item.id]: { ...item, quantity: prevCart[item.id].quantity - 1 },
        };
      } else {
        // Remove item if quantity is 0
        const updatedCart = { ...prevCart };
        delete updatedCart[item.id];
        return updatedCart;
      }
    });
  };

  // Function to buy a single item and navigate to CartScreen
  const buyNow = (item) => {
    navigation.navigate("CardScreen", { cartItems: [{ ...item, quantity: 1 }] });
  };

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
              {/* Quantity Control Buttons */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item)} style={styles.quantityButton}>
                  <AntDesign name="minus" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{cart[item.id]?.quantity || 0}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item)} style={styles.quantityButton}>
                  <AntDesign name="plus" size={20} color="black" />
                </TouchableOpacity>
              </View>
              
              <Button onPress={() => buyNow(item)}>Buy</Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Floating Cart Button with Badge */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate("CardScreen", { cartItems: Object.values(cart) })} 
      >
        <AntDesign name="shoppingcart" size={25} color="white" />
        
        {Object.keys(cart).length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {Object.values(cart).reduce((acc, item) => acc + item.quantity, 0)}
            </Text>
          </View>
        )}
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
    borderWidth: 1,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    padding: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
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
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 15,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
