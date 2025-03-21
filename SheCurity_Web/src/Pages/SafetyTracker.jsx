import React, { useRef, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// Function to calculate the distance between two points using the Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // Distance in meters
  return distance;
};

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const SafetyTracker = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAa6STY57uip-1tC6cGGeFAi18LOLsYmoo", // Replace with your Google Maps API key
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const polylineRef = useRef(null);
  const circlesRef = useRef([]); // Array to store circles
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationName, setLocationName] = useState("Fetching Current location...");
  const [destination, setDestination] = useState(null);
  const [destinationName, setDestinationName] = useState("");
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [alertShown, setAlertShown] = useState(false);

  const radius = 5000; // 5000 meters (5 km) for the alert range
  const [route, setRoute] = useState([]); // To store the route path points

  // Get user's current location and location name (city, country)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || "Unknown";
            const country = data.address.country || "Unknown";
            setLocationName(`${city}, ${country}`);
          } catch (error) {
            setLocationName("Unable to fetch location");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationName("Location permission denied or error");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationName("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current && currentLocation) {
      const map = mapRef.current.state.map;

      if (map) {
        if (!markerRef.current) {
          markerRef.current = new google.maps.Marker({
            map,
            position: currentLocation,
            title: "Your Location",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "red", // Red marker for current location
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "white",
            },
          });
        } else {
          markerRef.current.setPosition(currentLocation);
        }

        // Center the map on the user's location
        map.setCenter(currentLocation);
      }
    }
  }, [isLoaded, currentLocation]);

  // Handle map click to set destination
  const handleMapClick = async (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    
    setDestination({ lat, lng });

    // Remove previous destination marker if it exists
    if (markerRef.current) {
      markerRef.current.setMap(null); 
    }

    // Set new destination marker
    markerRef.current = new google.maps.Marker({
      map: mapRef.current.state.map,
      position: { lat, lng },
      title: "Destination",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: "blue", // Blue marker for destination
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "white",
      },
    });

    // Fetch and set location name for the destination
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village || "Unknown";
      const country = data.address.country || "Unknown";
      setDestinationName(`${city}, ${country}`);
    } catch (error) {
      setDestinationName("Unable to fetch destination location");
    }

    // Create or update the polyline (route) on the map
    if (polylineRef.current) {
      polylineRef.current.setMap(null); // Remove old route
    }

    const path = [currentLocation, { lat, lng }];
    setRoute(path);

    polylineRef.current = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#0000FF",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    polylineRef.current.setMap(mapRef.current.state.map);

    // Draw multiple circles along the path
    if (circlesRef.current) {
      circlesRef.current.forEach(circle => {
        circle.setMap(null); // Remove previous circles
      });
      circlesRef.current = [];
    }

    // Draw circles along the route
    const numberOfCircles = 10; // Number of circles between start and end
    for (let i = 0; i <= numberOfCircles; i++) {
      const lat = currentLocation.lat + (i / numberOfCircles) * (destination.lat - currentLocation.lat);
      const lng = currentLocation.lng + (i / numberOfCircles) * (destination.lng - currentLocation.lng);

      const circle = new google.maps.Circle({
        map: mapRef.current.state.map,
        center: { lat, lng },
        radius: radius, // Define the radius in meters
        fillColor: "red",
        fillOpacity: 0.3,
        strokeColor: "red",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      circlesRef.current.push(circle);
    }

    // Center the map on the destination
    mapRef.current.state.map.setCenter({ lat, lng });
  };

  // Start journey and track the movement
  const startJourney = () => {
    if (!destination) {
      alert("Please set a destination by clicking on the map.");
      return;
    }

    setIsJourneyStarted(true);

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distanceToDestination = calculateDistance(
          latitude,
          longitude,
          destination.lat,
          destination.lng
        );

        // Check if the user is outside any of the circles
        let isOutOfRoute = false;
        circlesRef.current.forEach(circle => {
          const circleDistance = calculateDistance(
            latitude,
            longitude,
            circle.getCenter().lat(),
            circle.getCenter().lng()
          );
          if (circleDistance > radius) {
            isOutOfRoute = true;
          }
        });

        if (isOutOfRoute && !alertShown) {
          alert("You have moved beyond the allowed route!");
          setAlertShown(true);
        }

        setCurrentLocation({ lat: latitude, lng: longitude });

        // Update the route path to follow the user's movement
        const updatedRoute = [...route, { lat: latitude, lng: longitude }];
        setRoute(updatedRoute);

        // Optionally update the polyline as the user moves
        if (polylineRef.current) {
          polylineRef.current.setPath(updatedRoute);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true }
    );

    setWatchId(id);
  };

  // Stop the journey tracking
  const stopJourney = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsJourneyStarted(false);
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      <div className="d-flex align-items-end justify-center">
        <div className="input-group me-2" style={{ width: "300px" }}>
          <div className="input-group-prepend">
            <span className="input-group-text">Current Location</span>
          </div>
          <textarea
            className="form-control"
            value={locationName}
            readOnly
          />
        </div>

        <div className="input-group me-2" style={{ width: "300px" }}>
          <div className="input-group-prepend">
            <span className="input-group-text">Destination Location</span>
          </div>
          <textarea
            className="form-control"
            value={destinationName || "Click on the map to set destination"}
            readOnly
          />
        </div>

        <button
          className="btn btn-primary d-flex align-items-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgb(74, 6, 133), rgb(132, 74, 172), rgb(74, 6, 133))",
            border: "none",
            color: "#fff",
          }}
          onClick={isJourneyStarted ? stopJourney : startJourney}
        >
          <i className="bi bi-geo-alt-fill me-3"></i>
          {isJourneyStarted ? "Stop Journey" : "Start Journey"}
        </button>
      </div>

      <div style={{ width: "70vw", height: "70vh" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation || { lat: 51.505, lng: -0.09 }}
          zoom={13}
          onLoad={(map) => (mapRef.current = { state: { map } })}
          onClick={handleMapClick}
        />
      </div>
    </div>
  );
};

export default SafetyTracker;
