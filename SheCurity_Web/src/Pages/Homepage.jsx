import React, { useEffect, useState, useRef } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const Homepage = () => {
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const alarmRef = useRef(null);

  useEffect(() => {
    alarmRef.current = new Audio("/siren.mp3");
    alarmRef.current.loop = true;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      stopAlarm();
    };
  }, []);

  const stopAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
      setAlarmPlaying(false);
    }
  };

  const toggleAlarm = () => {
    if (alarmPlaying) {
      stopAlarm();
    } else {
      alarmRef.current.play();
      setAlarmPlaying(true);
    }
  };

  const callNumber = (number) => {
    window.location.href = `tel:${number}`;
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
        onClick={() => callNumber("+1234567890")}
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

      <button
        onClick={toggleAlarm}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: alarmPlaying ? "gray" : "#ff9900",
          fontWeight: "bold",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderRadius: "5px",
        }}
      >
        {alarmPlaying ? <FaVolumeMute /> : <FaVolumeUp />} Alarm
      </button>

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
          onClick={() => callNumber("100")}
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
          onClick={() => callNumber("1091")}
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
