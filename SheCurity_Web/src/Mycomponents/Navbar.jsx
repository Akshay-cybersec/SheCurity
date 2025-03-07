import { useState, useEffect } from "react";
import { colors } from "../assets/colors";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import FontAwesome map marker icon

const Navbar = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            // Extracting city and country for a shorter address
            const city = data.address.city || data.address.town || data.address.village || "Unknown";
            const country = data.address.country || "Unknown";

            setLocation(`${city}, ${country}`);
          } catch (error) {
            setLocation("Unable to fetch location");
          }
        },
        () => {
          setLocation("Location permission denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <nav
      className="navbar navbar-light fixed-top d-flex justify-content-between"
      style={{
        marginLeft: "250px",
        width: "calc(100% - 250px)",
        backgroundColor: colors.second_color,
        padding: "10px 20px",
      }}
    >
      <span className="navbar-brand mb-0 h1 fs-2">Welcome User!!</span>
      <span className="fs-6 text-end d-flex align-items-center">
        <FaMapMarkerAlt className="me-2" /> {/* Map icon */}
        {coords ? (
          <a
            href={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-dark"
          >
            {location}
          </a>
        ) : (
          location
        )}
      </span>
    </nav>
  );
};

export default Navbar;
