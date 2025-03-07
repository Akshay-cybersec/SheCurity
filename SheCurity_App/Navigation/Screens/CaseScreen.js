import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // Updated import
import { Button, Icon, MD3Colors } from 'react-native-paper';

export default function CaseScreen() {
  const [victimName, setVictimName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [file, setFile] = useState(null);

  // Function to pick a file (Updated for Expo)
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all file types
        copyToCacheDirectory: true,
      });
  
      if (res.type === 'cancel') {
        console.log('User cancelled the document picker');
        return;
      }
  
      setFile(res);  // Store the selected file without an alert
    } catch (err) {
      console.log('Error:', err);
    }
  };
  

  // Function to submit the case
  const handleSubmit = () => {
    if (!victimName || !phoneNumber || !caseDescription || !file) {
      Alert.alert('Error', 'Please fill all fields and upload a document.');
      return;
    }
    Alert.alert('Case Submitted', 'Your case has been filed successfully.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File A Case</Text>

      {/* Victim Name */}
      <Text style={styles.label}>Name of Victim</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter victim's name"
        value={victimName}
        onChangeText={setVictimName}
      />

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Case Description */}
      <Text style={styles.label}>Describe Your Case</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Provide details of the incident"
        multiline
        numberOfLines={4}
        value={caseDescription}
        onChangeText={setCaseDescription}
      />

      {/* File Upload */}
      <Text style={styles.label}>Upload Supporting Document</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <Icon source="file-upload" color={MD3Colors.primary50} size={24} />
        <Text style={styles.uploadText}>{file ? file.name : 'Choose File'}</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
        Submit Case
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#00796B',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textArea: {
    height: 100,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  uploadText: {
    marginLeft: 10,
    color: '#00796B',
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#00796B',
  },
});
