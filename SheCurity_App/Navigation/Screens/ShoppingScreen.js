import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Colors from '../../assets/Colors/color';

const products = [
  { id: 1, title: "Pepper Spray", description: "Self-defense tool", price: "$10" },
  { id: 2, title: "Safety Alarm", description: "Emergency personal alarm", price: "$15" },
  { id: 3, title: "Taser", description: "Non-lethal self-defense", price: "$25" },
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
              <Text variant="bodyMedium">{item.description}</Text>
              <Text variant="titleSmall">{item.price}</Text>
            </Card.Content>
            <Card.Actions>
              <Button>Add To Cart</Button>
              <Button>Buy</Button>
            </Card.Actions>
          </Card>
        )}
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
    backgroundColor: 'white', // Set card background color to red
    marginBottom: 10,
    padding: 5,
    borderWidth:1,
  },
});
