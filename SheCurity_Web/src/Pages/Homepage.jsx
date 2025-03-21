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
const sirenSound = "/siren.mp3"; 

import { FaComments } from "react-icons/fa";
import Chatbot from "./Chatbot";


const Homepage = () => {
   
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [audio] = useState(new Audio("/siren.mp3"));
  const timerRef = useRef(null);
  const chatEndRef = useRef(null);


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
    audio.loop = true;
    audio.play();
    setCountdown(10);
    setSosActive(true);
    setShowPopup(true);
  };

  const handlePopupResponse = (response) => {
    setShowPopup(false);
    if (!response) {
      stopSOS();
    }
  };

  const stopSOS = () => {
    setSosActive(false);
    setCountdown(null);
    audio.pause();
    audio.currentTime = 0;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    if (sosActive && countdown !== null) {
      if (countdown > 0) {
        timerRef.current = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timerRef.current);
      } else {
        stopSOS();
      }
    }
  }, [countdown, sosActive]);
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

      
         {showPopup && (
          <div style={{
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
            background: "linear-gradient(135deg, rgb(74, 6, 133), rgb(132, 74, 172), rgb(74, 6, 133))", padding: "25px", borderRadius: "12px", 
            boxShadow: "0 4px 15px rgb(179, 82, 198)", textAlign: "center", minWidth: "300px"
          }}>
            <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>Are you in danger?</p>
            <button onClick={() => handlePopupResponse(true)} 
              style={{ margin: "10px", padding: "12px 20px", borderRadius: "8px", border: "none", backgroundColor: "#ff4d4d", color: "white", fontWeight: "bold", cursor: "pointer" }}>
              Yes
            </button>
            <button onClick={() => handlePopupResponse(false)} 
              style={{ margin: "10px", padding: "12px 20px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontWeight: "bold", cursor: "pointer" }}>
              No
            </button>
          </div>
        )}
      

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
      <Link
        to="/Chatbot"
        className="position-fixed bottom-3 end-3  text-white p-3 rounded-circle shadow-lg"
        style={{ right: "20px", bottom: "20px", 
          background: "linear-gradient(135deg,rgb(74, 6, 133),rgb(132, 74, 172),rgb(74, 6, 133))", }}
      >
        <FaComments size={30} />
      </Link>
    
     </div>
  );
};

export default Homepage;
