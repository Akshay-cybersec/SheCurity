import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import Colors from '../../assets/Colors/color';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text>Header here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60, // Adjust height as needed
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary, // Adjust as needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
});

export default Header;
