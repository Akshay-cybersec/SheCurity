import React, { useEffect, useState, useRef } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const [sosAlarmPlaying, setSosAlarmPlaying] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [sosActive, setSosActive] = useState(false);
  const alarmRef = useRef(new Audio("/siren.mp3"));
  const sosAlarmRef = useRef(new Audio("/siren.mp3"));
  const timerRef = useRef(null);
  const navigate = useNavigate();

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

  const callNumber = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleSOSClick = () => {
    if (sosActive) {
      clearInterval(timerRef.current);
      setCountdown(null);
      setSosActive(false);
      stopSosAlarm();
    } else {
      setCountdown(10);
      setSosActive(true);
      sosAlarmRef.current.play().catch((error) => console.error("Error playing audio:", error));
      setSosAlarmPlaying(true);
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);
            callNumber("+8652550655");
            setSosActive(false);
            stopSosAlarm();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

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
            <button className="btn btn-success" onClick={() => navigate("/live-location")}>
              Share Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;