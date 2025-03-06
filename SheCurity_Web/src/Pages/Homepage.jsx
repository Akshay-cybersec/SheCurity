import React, { useEffect, useState, useRef } from "react";

const Homepage = () => {
  const [showAlert, setShowAlert] = useState(false); 
  const [seconds, setSeconds] = useState(10); 
  const alarmRef = useRef(null); 
  const timerRef = useRef(null); 

  useEffect(() => {
    
    alarmRef.current = new Audio("/siren.mp3");
    alarmRef.current.loop = true; 

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      stopAlarm(); 
      clearInterval(timerRef.current); 
    };
  }, []);

 
  const stopAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

 
  const handleSOSClick = () => {
    setShowAlert(true); 
    setSeconds(10);
    alarmRef.current.play(); 

   
    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(timerRef.current); 
         
          stopAlarm(); 
          setShowAlert(false); 
          return 10; 
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  
  const closeAlert = () => {
    setShowAlert(false); 
    stopAlarm(); 
    clearInterval(timerRef.current); 
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "black",
          marginBottom: "40px",
          marginTop: "-100px",
        }}
      >
        "Press the button in case of an emergency!"
      </p>

      
      <button
        onClick={handleSOSClick}
        style={{
          backgroundColor: "red",
          color: "white",
          width: "200px",
          height: "200px",
          fontSize: "18px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0 6px 12px rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "10px",
        }}
      >
        HELP!!
      </button>

     
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              width: "300px",
            }}
          >
            <h2 style={{ color: "red", marginBottom: "10px" }}>🚨 EMERGENCY 🚨</h2>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Your help is on the way!
            </p>
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>
              Time Remaining: {seconds}s
            </p>
            <button
              onClick={closeAlert}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "red",
                fontWeight: "bold",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#0099CC",
            fontWeight: "bold",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          POLICE HELPLINE NUMBER
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#0099CC",
            fontWeight: "bold",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          WOMEN HELPLINE NUMBER
        </button>
      </div>
    </div>
  );
};

export default Homepage;
