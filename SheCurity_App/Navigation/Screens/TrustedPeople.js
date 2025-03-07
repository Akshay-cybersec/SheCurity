import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const trustedContacts = [
    { id: '1', name: 'Mom', phone: '1234567890' },  
    { id: '2', name: 'Dad', phone: '0987654321' },
    { id: '3', name: 'Brother', phone: '1122334455' },
];

export default function TrustedPeopleScreen() {
    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={trustedContacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.contactItem}>
                        {/* Left: Avatar Icon */}
                        <Ionicons name="person-circle" size={50} color="#008585" style={styles.avatar} />
                        
                        {/* Middle: Name & Phone */}
                        <View style={styles.contactInfo}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.contactNumber}>{item.phone}</Text>
                        </View>

                        {/* Right: Call Button */}
                        <Pressable style={styles.callButton} onPress={() => handleCall(item.phone)}>
                            <Ionicons name="call" size={24} color="white" />
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    avatar: {
        marginRight: 15,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactNumber: {
        fontSize: 14,
        color: '#555',
    },
    callButton: {
        backgroundColor: '#008585',
        padding: 10,
        borderRadius: 50,
    },
});
