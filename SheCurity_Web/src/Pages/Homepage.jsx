import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ref, set } from "firebase/database";
import { database } from "../Firebase";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import safetytips from "../assets/safetytips.jpeg";
import safetyvideos from "../assets/safetyvideos.png";

const Homepage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const sosAlarmRef = useRef(new Audio("/siren.mp3"));
  const timerRef = useRef(null);

  const generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
  };

  const storeData = (latitude, longitude, message) => {
    const userId = "user" + generateRandomString(5);
    set(ref(database, "users/" + userId), { Latitude: latitude, Longitude: longitude, Message: message })
      .then(() => console.log("Data stored successfully"))
      .catch((error) => console.error("Error storing data: ", error));
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => console.error("Error getting location: ", error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const callNumber = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleSOSClick = () => {
    if (sosActive) {
      // Stop SOS if already active
      setSosActive(false);
      setCountdown(null);
      clearInterval(timerRef.current);
      sosAlarmRef.current.pause();
      sosAlarmRef.current.currentTime = 0;
    } else {
      // Start SOS
      getLocation();
      setCountdown(10);
      setSosActive(true);
      sosAlarmRef.current.play().catch((error) => console.error("Error playing audio:", error));
  
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            if (latitude && longitude) storeData(latitude, longitude, "SOS Alert - Immediate help needed!");
            clearInterval(timerRef.current);
            setSosActive(false);
            sosAlarmRef.current.pause();
            sosAlarmRef.current.currentTime = 0;
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };
  
  const handlePopupClick = (isMistake) => {
    setShowPopup(false);
    if (isMistake) {
      setSosActive(false);
      sosAlarmRef.current.pause();
      sosAlarmRef.current.currentTime = 0;
    } else if (latitude && longitude) {
      storeData(latitude, longitude, "SOS Alert - Immediate help needed!");
    }
  };

  useEffect(() => {
    sosAlarmRef.current.loop = true;
    return () => {
      clearInterval(timerRef.current);
      sosAlarmRef.current.pause();
    };
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-4">
      <button
  onClick={handleSOSClick}
  className={`btn ${sosActive ? "btn-secondary" : "btn-danger"} shadow-lg`}
  style={{
    backgroundColor: sosActive ? "gray" : "red",
    color: "white",
    width: "200px",
    height: "200px",
    fontSize: "22px",
    fontWeight: "bold",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  }}
>
  {sosActive ? "STOP" : countdown !== null ? `HELP!! (${countdown}s)` : "HELP!!"}
</button>

      <div className="d-flex justify-content-center gap-10 my-3">
        <button
          className="btn btn-info text-white fw-bold"
          style={{  padding: "12px 20px",
            borderRadius: "10px",
            minWidth: "200px",
            background: "linear-gradient(135deg,rgb(149, 42, 226),rgb(61, 6, 90))", 
            border: "none",
            }}
           
          onClick={() => callNumber("100")}
        >
          📞 POLICE HELPLINE - 100
        </button>
        <button
          className="btn btn-info text-white fw-bold"
          style={{ padding: "12px 20px",
            borderRadius: "10px",
            minWidth: "200px",
            background: "linear-gradient(135deg,rgb(149, 42, 226),rgb(61, 6, 90))", 
            border: "none", }}
          onClick={() => callNumber("1091")}
        >
          📞 WOMEN HELPLINE - 1091
        </button>
      </div>

      

      <Box sx={{ display: "flex", gap: 9, alignItems: "stretch" }}>
        <Card sx={{ maxWidth: 300, border: "2px solid #7b539d", flexDirection: "column", display: "flex" }}>
          <CardMedia sx={{ height: 100, width: "100%", objectFit: "cover" }} image={safetytips} title="SAFETY TIPS" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" fontWeight={"bold"}>
              SAFETY TIPS
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              "Stay alert, follow the rules, and prioritize safety first!"
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button
              size="small"
              component={Link}
              to="/safety-tips"
              sx={{ fontWeight: "bold", color: "white", backgroundColor: "#7b539d", "&:hover": { backgroundColor: "#cab5d5" }}}
            >
              VIEW TIPS
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 300, border: "2px solid #7b539d" }}>
          <CardMedia sx={{ height: 100, width: "100%", objectFit: "cover" }} image={safetyvideos} title="SAFETY VIDEOS" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" fontWeight={"bold"}>
              SAFETY VIDEOS
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              "Watch, learn, and stay safe—safety first in every step!"
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button size="small" component={Link} to="/safety-videos" sx={{ fontWeight: "bold", 
              color: "white", backgroundColor: "#7b539d", "&:hover": { backgroundColor: "#cab5d5" } }}>
              VIEW VIDEOS
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default Homepage;
