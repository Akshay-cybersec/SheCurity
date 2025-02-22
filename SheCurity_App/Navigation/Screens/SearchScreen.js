import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function SearchScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>This is the Search Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Light background color
  },
  text: {
    fontSize: 18,
    color: '#333', // Dark text color
    fontWeight: 'bold',
  },
});
