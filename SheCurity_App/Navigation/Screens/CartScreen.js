import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-paper';

export default function CartScreen({ route }) {
  const [loading, setLoading] = useState(false);
  const cartItems = route.params?.cartItems ?? [];

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Order Placed", "Your items will be delivered soon!");
    }, 2000); // 2-second delay
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Title title={item.title} />
                <Card.Content>
                  <Text>{item.description}</Text>
                  <Text>{item.price} x {item.quantity}</Text>
                </Card.Content>
              </Card>
            )}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
          ) : (
            <Button mode="contained" style={styles.orderButton} onPress={handlePlaceOrder}>
              Place Order
            </Button>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
    padding: 10,
  },
  orderButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    alignSelf: "center",
  },
  loader: {
    marginTop: 20,
    alignSelf: "center",
  },
});