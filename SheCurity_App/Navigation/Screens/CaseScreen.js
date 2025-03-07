import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Button, Icon, MD3Colors } from 'react-native-paper';

export default function CaseScreen() {
  const [victimName, setVictimName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  // Function to pick a document
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '/',
        copyToCacheDirectory: true,
      });

      if (res.type === 'cancel') {
        console.log('User cancelled the document picker');
        return;
      }

      setFile(res);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  // Function to open the camera
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'You need to allow camera access to use this feature.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to submit the case
  const handleSubmit = () => {
    if (!victimName || !phoneNumber || !caseDescription || (!file && !image)) {
      Alert.alert('Error', 'Please fill all fields and upload a document or image.');
      return;
    }
    Alert.alert('Case Submitted', 'Your case has been filed successfully.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
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

      {/* Camera Upload */}
      <Text style={styles.label}>Capture Image</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={openCamera}>
        <Icon source="camera" color={MD3Colors.primary50} size={24} />
        <Text style={styles.uploadText}>Open Camera</Text>
      </TouchableOpacity>

      {/* Show Uploaded Image */}
      {image && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
        </View>
      )}

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
        Submit Case
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 20,
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
    marginHorizontal: 20,
    marginTop: 5,
  },
  uploadText: {
    marginLeft: 10,
    color: '#00796B',
    fontWeight: '500',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#00796B',
    marginHorizontal: 20,
  },
});