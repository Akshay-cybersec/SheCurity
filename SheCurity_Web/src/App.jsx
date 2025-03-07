import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Mycomponents/Navbar";
import Homepage from "./Pages/Homepage";
import Mimic from "./Pages/Mimic";
import Products from "./Pages/Products";
import Side from "./Mycomponents/Side";
import FileCase from "./Pages/FileCase";
import TrustedPeople from './Pages/TrustedPeople';
import SafetyTips from './Pages/SafetyTips';
import SafetyVideos from './Pages/SafetyVideos';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import { database, push, ref, serverTimestamp, onChildAdded, off } from './Firebase'; // Import required Firebase functions

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Reference to the Firebase Realtime Database
  const messageRef = ref(database, 'messages');

  // Function to send a message to Firebase
  const sendMessage = () => {
    const messageObj = {
      message: message,
      timestamp: serverTimestamp(),
    };
    push(messageRef, messageObj);  // Push new message to Firebase
    setMessage(''); // Clear input field after sending
  };

  // Real-time listener for new messages
  useEffect(() => {
    const listener = onChildAdded(messageRef, (snapshot) => {
      const newMessage = snapshot.val();
      setMessages((prevMessages) => [...prevMessages, newMessage]);  // Add new message to state
    });

    // Cleanup listener when component unmounts
    return () => {
      off(messageRef, 'child_added', listener);
    };
  }, []);

  return (
    <Router>
      <div className="d-flex">
        <Side />
        <div className="flex-grow-1" style={{ marginLeft: "250px", overflowX: "hidden" }}>
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Mimic" element={<Mimic />} />
            <Route path="/TrustedPeople" element={<TrustedPeople />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/FileCase" element={<FileCase />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/Safety-Videos" element={<SafetyVideos />} />
          </Routes>

          {/* Real-time messaging UI */}
          <div className="message-container">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  <p>{msg.message}</p>
                  <small>{new Date(msg.timestamp).toLocaleString()}</small>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message" 
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
