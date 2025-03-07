import React, { useState, useEffect } from 'react';
import { set, ref } from 'firebase/database'; // Import required Firebase methods

const storeData = (latitude, longitude, message) => {
    const userId = "user" + generateRandomString(5); // You can get the user id dynamically
    set(ref(database, 'users/' + userId), {
      Latitude: latitude,
      Longitude: longitude,
      Message: message
    })
    .then(() => {
      console.log('Data stored successfully');
    })
    .catch((error) => {
      console.error('Error storing data: ', error);
    });
  };

  // Get the current location (latitude, longitude)
  const getLocation = () => { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  
export default App;
