import React, { useEffect, useState, useRef } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { database } from "../Firebase"; // Firebase config import

const Homepage = () => {
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const [sosAlarmPlaying, setSosAlarmPlaying] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [sosActive, setSosActive] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isMistake, setIsMistake] = useState(false); // Track if it's a mistake
  const [showPopup, setShowPopup] = useState(false); // To show confirmation popup
  const [sosProcessing, setSosProcessing] = useState(false); // Flag to prevent multiple clicks
  const alarmRef = useRef(new Audio("/siren.mp3"));
  const sosAlarmRef = useRef(new Audio("/siren.mp3"));
  const timerRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storeDatatest = (latitude, longitude, message,i,j) => {
      const userId = "user33"; // You can get the user id dynamically
      set(ref(database, 'users/' + userId), {
        Latitude: i,
        Longitude: j,
        Message: "hello"
      })
      .then(() => {
        console.log('Data stored successfully');
      })
      .catch((error) => {
        console.error('Error storing data: ', error);
      });
    };

    for (let index = 0; index < 5; index++) {
      storeDatatest(index,"2")
      
    }
  }, []);

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Store the SOS alert data in Firebase Realtime Database
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

  // Start/Stop the siren sound for the alarm
  const stopAlarm = () => {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
    setAlarmPlaying(false);
  };

  const stopSosAlarm = () => {
    sosAlarmRef.current.pause();
    sosAlarmRef.current.currentTime = 0;
    setSosAlarmPlaying(false);
  };

  const toggleAlarm = () => {
    if (alarmPlaying) {
      stopAlarm();
    } else {
      alarmRef.current.play().catch((error) => console.error("Error playing audio:", error));
      setAlarmPlaying(true);
    }
  };

  // Call emergency numbers
  const callNumber = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleSOSClick = () => {
    if (sosProcessing) {
      return; // Prevent triggering if SOS process is already in progress
    }

    setSosProcessing(true); // Set processing flag

    getLocation(); // Get current location before activating SOS

    if (sosActive) {
      if (isMistake) {
        // If it was a mistake, stop the process and reset everything
        stopSosAlarm();
        clearInterval(timerRef.current);
        setSosActive(false);
        setCountdown(null);
        setIsMistake(false); // Reset mistake flag
        setSosProcessing(false); // Reset processing flag
        return;
      }

      // Store data in Firebase only if it's not a mistake
      if (latitude && longitude) {
        storeData(latitude, longitude, "SOS Alert - Immediate help needed!");
      }

      // Clear countdown and stop alarm after storing
      clearInterval(timerRef.current);
      setSosActive(false);
      setCountdown(null);
      stopSosAlarm();
      setSosProcessing(false); // Reset processing flag
    } else {
      // Start SOS process (Show popup and countdown)
      setCountdown(10);
      setSosActive(true);
      sosAlarmRef.current.play().catch((error) => console.error("Error playing audio:", error));
      setSosAlarmPlaying(true);
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            // If user doesn't respond, send data after 10 seconds
            if (latitude && longitude) {
              storeData(latitude, longitude, "SOS Alert - Immediate help needed!");
            }
            callNumber("+8652550655");
            setSosActive(false);
            stopSosAlarm();
            clearInterval(timerRef.current);
            setSosProcessing(false); // Reset processing flag
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      // Show the confirmation popup
      setShowPopup(true);
    }
  };

  const handlePopupClick = (isMistakeResponse) => {
    if (isMistakeResponse) {
      // If it's a mistake, stop everything
      setIsMistake(true);
      stopSosAlarm();
      clearInterval(timerRef.current);
      setSosActive(false);
      setCountdown(null);
    }
    // Close the popup regardless of the response
    setShowPopup(false);
    setSosProcessing(false); // Reset processing flag once popup action is complete
  };

  useEffect(() => {
    alarmRef.current.loop = true;
    sosAlarmRef.current.loop = true;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      stopAlarm();
      stopSosAlarm();
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-4">
      <button
        onClick={handleSOSClick}
        className="btn btn-danger shadow-lg"
        style={{
          backgroundColor: "red",
          color: "white",
          width: "160px",
          height: "160px",
          fontSize: "22px",
          fontWeight: "bold",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
        disabled={sosProcessing} // Disable the button during SOS processing
      >
        {countdown !== null ? `HELP!! (${countdown}s)` : "HELP!!"}
      </button>

      <button
        onClick={toggleAlarm}
        className="btn btn-warning d-flex align-items-center gap-2 shadow"
        style={{ fontSize: "18px", fontWeight: "bold", borderRadius: "10px", padding: "12px 24px" }}
      >
        {alarmPlaying ? <FaVolumeMute /> : <FaVolumeUp />} Alarm
      </button>

      <div className="d-flex justify-content-center gap-4 my-3">
        <button className="btn btn-info text-white fw-bold" style={{ padding: "12px 20px", borderRadius: "10px", minWidth: "200px" }} onClick={() => callNumber("100")}>
          📞 POLICE HELPLINE - 100
        </button>
        <button className="btn btn-info text-white fw-bold" style={{ padding: "12px 20px", borderRadius: "10px", minWidth: "200px" }} onClick={() => callNumber("1091")}>
          📞 WOMEN HELPLINE - 1091
        </button>
      </div>

      {/* SOS Confirmation Popup */}
      {showPopup && (
        <div className="popup" style={popupStyle}>
          <div className="popup-content" style={popupContentStyle}>
            <h5 style={{ textAlign: "center" }}>Is this a mistake?</h5>
            <div className="d-flex justify-content-around mt-3">
              <button
                className="btn btn-danger"
                onClick={() => handlePopupClick(true)}
                style={buttonStyle}
              >
                Yes, it's a mistake
              </button>
              <button
                className="btn btn-success"
                onClick={() => handlePopupClick(false)}
                style={buttonStyle}
              >
                No, continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-lg p-3">
            <h5 className="fw-bold">🛡️ Safety Tips</h5>
            <p className="text-muted">Learn how to stay safe in any situation.</p>
            <button className="btn btn-primary" onClick={() => navigate("/safety-tips")}>
              View Tips
            </button>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-lg p-3">
            <h5 className="fw-bold">🎥 Safety Videos</h5>
            <p className="text-muted">Watch videos on personal safety measures.</p>
            <button className="btn btn-primary" onClick={() => navigate("/Safety-Videos")}>
              Watch Videos
            </button>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-lg p-3">
            <h5 className="fw-bold">📍 Share Live Location</h5>
            <p className="text-muted">Send your live location for emergency help.</p>
            <button className="btn btn-success" onClick={() => navigate("/ShareLocation")}>
              Share Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const popupStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "9999",
};

const popupContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  width: "300px",
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
};

export default Homepage;
