import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

const GOOGLE_MAPS_APIKEY = "AIzaSyDdxw4FZYV2VayOiy_HvG7rzbnF_sezXJ8";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState({ lat: 19.0760, lng: 72.8777 }); // Example: Mumbai
  const [directions, setDirections] = useState(null);

  // Get User's Current Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error)
      );
    }
  }, []);

  // Fetch Directions
  useEffect(() => {
    if (currentLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentLocation,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [currentLocation]);

  // Track User's Movement
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(newLocation);

        // Alert if user deviates from the route (basic distance check)
        const distanceThreshold = 0.01; // Adjust for sensitivity
        const distance = Math.sqrt(
          Math.pow(newLocation.lat - destination.lat, 2) +
          Math.pow(newLocation.lng - destination.lng, 2)
        );

        if (distance > distanceThreshold) {
          alert("Warning: You are moving away from the route!");
        }
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_APIKEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={currentLocation || destination} zoom={14}>
        {currentLocation && <Marker position={currentLocation} label="You" />}
        <Marker position={destination} label="Destination" />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
