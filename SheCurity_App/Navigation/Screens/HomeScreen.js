import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#ff4757' : '#D7263D' }
          ]}
          onPress={() => alert('Button Pressed!')}
        >
          <Text style={styles.buttonText}>sahil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333', // Dark text color
    fontWeight: 'bold',
  },
  button: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Circular button
    backgroundColor: '#D7263D', // Bright red color for emergency
    elevation: 10, // Shadow effect for Android
    shadowColor: '#D7263D',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 30,
  },
  buttonText:{
    color: '#fff', // White text color
    fontSize: 20,
    fontWeight: 'bold',
  }
});
