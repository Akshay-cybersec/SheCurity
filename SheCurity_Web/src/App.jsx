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
import ShareLocation from './Pages/ShareLocation';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';




function App() {

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
            <Route path="/ShareLocation" element={<ShareLocation />} />
          </Routes>

         
        </div>
      </div>
    </Router>
  );
}

export default App;
