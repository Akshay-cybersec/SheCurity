import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { AntDesign } from "@expo/vector-icons";
import Colors from '../../assets/Colors/color';
import { useFocusEffect } from '@react-navigation/native';
import products from '../../assets/data/products.json'; // Import the JSON file

export default function ShoppingScreen({ navigation, route }) {
  const [cart, setCart] = useState({});
  const [showToast, setShowToast] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const translateY = useState(new Animated.Value(50))[0];

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.cartItems) {
        const updatedCart = {};
        route.params.cartItems.forEach(item => {
          updatedCart[item.id] = { ...item };
        });
        setCart(updatedCart);
      }
    }, [route.params?.cartItems])
  );


  useEffect(() => {
    if (showToast) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -10,

          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(translateY, {
              toValue: 50,

              duration: 500,
              useNativeDriver: true,
            }),
          ]).start(() => setShowToast(false));
        }, 2000);
      });
    }
  }, [showToast]);

  const increaseQuantity = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item.id]: { ...item, quantity: (prevCart[item.id]?.quantity || 0) + 1 },
    }));
  };

  const decreaseQuantity = (item) => {
    setCart((prevCart) => {
      if (prevCart[item.id]?.quantity > 1) {
        return {
          ...prevCart,
          [item.id]: { ...item, quantity: prevCart[item.id].quantity - 1 },
        };
      } else {
        const updatedCart = { ...prevCart };
        delete updatedCart[item.id];
        return updatedCart;
      }
    });
  };

  const buyNow = (item) => {
    const updatedCart = {
      ...cart,
      [item.id]: { ...item, quantity: (cart[item.id]?.quantity || 1) },
    };

    navigation.navigate("Cart", { cartItems: Object.values(updatedCart) });
    setShowToast(true);

  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("Cart", { cartItems: Object.values(cart) })}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cart]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <Card.Title title={item.title} />
            <Card.Content>
              <Text>{item.description}</Text>
              <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
            </Card.Content>
            <Card.Actions>
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
      {showToast && (
        <Animated.View style={[styles.toast, { opacity: fadeAnim, transform: [{ translateY }] }]}>
          <Text style={styles.toastText}>Item added to cart!</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  cardImage: {
    height: 250, 
    resizeMode: "cover"
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
  checkoutButton: {
    marginRight: 15,
    backgroundColor: Colors.primary || "#007AFF",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  checkoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  toast: {
    position: "absolute",
    bottom: 60,

    alignSelf: "center",
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  toastText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
