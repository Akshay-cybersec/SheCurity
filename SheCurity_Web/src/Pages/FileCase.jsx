
import React, { useState } from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import axios from "axios";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xA0157Bff161Ab46068B6789826535d72C865736B";
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "deleteLocation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "phoneNo",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "latitude",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "longitude",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsAddress",
        "type": "string"
      }
    ],
    "name": "LocationAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "LocationDeleted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_phoneNo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_latitude",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_longitude",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_ipfsAddress",
        "type": "string"
      }
    ],
    "name": "storeLocation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllLocations",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phoneNo",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "latitude",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "longitude",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ipfsAddress",
            "type": "string"
          }
        ],
        "internalType": "struct IPFSLocationStorage.LocationData[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getLocation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phoneNo",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "latitude",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "longitude",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ipfsAddress",
            "type": "string"
          }
        ],
        "internalType": "struct IPFSLocationStorage.LocationData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "locations",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phoneNo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "latitude",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "longitude",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "ipfsAddress",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];


const uploadFileToIPFS = async (file) => {
  if (!file) {
    alert("No file selected.");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    console.log("Uploading file to IPFS...");
    const response = await axios.post("http://192.168.0.248:8000/api/uploadtoipfs/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.success) {
      return response.data.ipfs_hash;
    } else {
      console.error("Upload failed:", response.data);
      alert("Upload failed. Check console.");
      return null;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Error uploading file.");
    return null;
  }
};

const FileCase = () => {
  const [victimName, setVictimName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 🔄 Loader state

  const submitToBlockchain = async () => {
    setIsLoading(true); // Start loader

    let ipfshash = await uploadFileToIPFS(fileName);
    if (!ipfshash) {
      setIsLoading(false);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }

    if (!window.ethereum) {
      alert("MetaMask not found. Please install it.");
      setIsLoading(false);
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.storeLocation(
        victimName,
        phoneNumber,
        description,
        latitude.toString(),
        longitude.toString(),
        ipfshash
      );

      await tx.wait();
      alert("Transaction successful! Data stored on Sepolia blockchain.");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. See console for details.");
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <div className="container mt-5">
      <form
        className="p-4"
        style={{ maxWidth: "700px", margin: "auto", borderRadius: "10px" }}
        onSubmit={(e) => {
          e.preventDefault();
          submitToBlockchain();
        }}
      >
        {/* Name Input */}
        <div className="form-group position-relative">
          <label htmlFor="victimName" className="font-weight-bold d-block text-left">
            Name of Victim
          </label>
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
          <label htmlFor="phoneNumber" className="font-weight-bold d-block text-left">
            Phone Number
          </label>
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
          <label htmlFor="message" className="font-weight-bold d-block text-left">
            Describe Your Case
          </label>
          <textarea
            className="form-control"
            id="message"
            rows="4"
            placeholder="Provide details of the incident"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="form-group">
          <label htmlFor="fileUpload" className="col-form-label col-12 font-weight-bold text-left">
            Upload Supporting Document
          </label>
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="fileUpload"
              onChange={(e) => setFileName(e.target.files[0])}
              required
            />
            <label className="custom-file-label" htmlFor="fileUpload">
              {fileName ? fileName.name : "Choose File..."}
            </label>
          </div>
        </div>

        {/* Submit Button with Loader */}
        <button
          type="submit"
          className="btn btn-primary d-block mx-auto mt-4"
          style={{
            fontSize: "16px",
            padding: "8px",
            width: "150px",
            borderRadius: "6px",
            background: isLoading
              ? "linear-gradient(90deg, #6c757d, #495057)"
              : "linear-gradient(90deg, #007bff, #0056b3)",
            border: "none",
            transition: "0.3s",
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              &nbsp; Submitting...
            </>
          ) : (
            "Submit Case"
          )}
        </button>
      </form>
    </div>
  );
};

export default FileCase;
