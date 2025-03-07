import React, { useState } from "react";
import { FaUser, FaPhone, FaFileAlt } from "react-icons/fa"; 

const CONTRACT_ADDRESS = "0xYourSepoliaContractAddress"; // Update with deployed contract address
const CONTRACT_ABI = [ /* Your ABI Here */ ];
const SEPOLIA_RPC_URL = "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"; // Or Alchemy

const FileCase = () => {
    const [victimName, setVictimName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [description, setDescription] = useState(""); 
    const [fileName, setFileName] = useState(null);
    const submitToBlockchain = async () => {
        if (!window.ethereum) {
          alert("MetaMask not found. Please install it.");
          return;
        }
    
        try {
          // Connect to Sepolia
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xaa36a7" }], // Chain ID for Sepolia
          });
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const signer = provider.getSigner();
    
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
          // Send transaction
          const tx = await contract.storeLocation(description, latitude, longitude, ipfsHash);
          await tx.wait();
    
          alert("Transaction successful! Data stored on Sepolia blockchain.");
        } catch (error) {
          console.error("Transaction failed:", error);
          alert("Transaction failed. See console for details.");
        }
    };    
    
  return (
    <div className="container mt-5">
      <form
        className="p-4 "
        style={{ maxWidth: "700px", margin: "auto", borderRadius: "10px" }}
      >
      
        <div className="form-group position-relative">
          <label htmlFor="victimName" className="font-weight-bold d-block text-left">Name of Victim</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FaUser />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="victimName"
              value={victimName}
             onChange={(e) => setVictimName(e.target.value)}
              placeholder="Enter the name"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phoneNumber" className="font-weight-bold d-block text-left">Phone Number</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FaPhone />
              </span>
            </div>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Case Description */}
        <div className="form-group">
          <label htmlFor="message" className="font-weight-bold d-block text-left">Describe Your Case</label>
          <textarea
            className="form-control"
            id="message"
            rows="4"
            placeholder="Provide details of the incident"
            value={description}
            onChange={(e) => setFileName(e.target.value)}
            required
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="form-group ">
          <label htmlFor="fileUpload" className=" col-form-label col-12 font-weight-bold  text-left">Upload Supporting Document</label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="fileUpload"
              value={fileName}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label className="custom-file-label" htmlFor="fileUpload">
              Choose File...
            </label>
          </div>
        </div>

        
        <button
  type="submit"
  className="btn btn-primary d-block mx-auto mt-4"
  style={{
    fontSize: "16px",
    padding: "8px",
    width: "150px",
    borderRadius: "6px",
    background: "linear-gradient(90deg, #007bff, #0056b3)",
    border: "none",
    transition: "0.3s",
  }}
>
  Submit Case
</button>

      </form>
    </div>
  );
};

export default FileCase;
