import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the Cart Screen! 🛒</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
