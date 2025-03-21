import React, { useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",  // Full viewport width
  height: "100vh", // Full viewport height
};

const center = {
  lat: 51.505, // Example latitude (London)
  lng: -0.09,  // Example longitude
};

// const MapComponent = () => {
// };

// export default MapComponent;


const SafetyTracker = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAa6STY57uip-1tC6cGGeFAi18LOLsYmoo",
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const map = mapRef.current.state.map;

      if (map && !markerRef.current) {
        markerRef.current = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: center,
          title: "Custom Marker",
        });
      }
    }
  }, [isLoaded]);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      <div className="d-flex align-items-end justify-center">
          <div className="input-group me-2 " style={{ width: '300px' }}>
            <div className="input-group-prepend">
              <span className="input-group-text">Current Location</span>
            </div>
            <textarea className="form-control" aria-label="With textarea"></textarea>
          </div>

          <div className="input-group me-2 " style={{ width: '300px' }}>
            <div className="input-group-prepend">
              <span className="input-group-text">Destination Location</span>
            </div>
            <textarea className="form-control" aria-label="With textarea"></textarea>
          </div>

          <button className="btn btn-primary d-flex align-items-center" style={{
            backgroundImage: 'linear-gradient(135deg, rgb(74, 6, 133), rgb(132, 74, 172), rgb(74, 6, 133))',
            border: 'none',
            color: '#fff'
          }}>
            <i className="bi bi-geo-alt-fill me-3"></i> Start Journey
          </button>
      </div>

      <div style={{ width: "70vw", height: "70vh" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={(map) => (mapRef.current = { state: { map } })}
        />
      </div>
    </div>
  )
}

export default SafetyTracker