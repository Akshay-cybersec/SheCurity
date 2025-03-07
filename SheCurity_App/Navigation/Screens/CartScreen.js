import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

export default function CartScreen({ route }) {
  const { cartItems } = route.params || { cartItems: [] };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
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
});
