import React, { useEffect } from "react";

const Homepage = () => {
  const handleButton = () => {
    setIsRunning(!isRunning); 
  };
  useEffect(() => {

    let intervalId;

    if (isRunning) {

      intervalId = setInterval(() => {

        setCurrentTime(prevTime => prevTime - 1);

      }, 1000); 

    }
    return () => clearInterval(intervalId); 

  }, [isRunning]);



  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling
    return () => {
      document.body.style.overflow = "auto"; // Restore scroll when unmounting
    };
  }, []);

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
          marginTop: "-20px",
        }}
      >
        "Press the button in case of an emergency!"
      </p>

      <button
        onClick={handleButton}
        
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
         {isRunning ? `Stop (${currentTime})` : 'Start'}
        <span className="fs-1">HELP!!</span>
      </button>

     
      <div
        style={{
          position: "absolute",
          bottom: "60px",
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
