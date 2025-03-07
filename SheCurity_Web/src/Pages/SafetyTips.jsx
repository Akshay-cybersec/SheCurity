import React from "react";
import { useNavigate } from "react-router-dom";

const SafetyTips = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      {/* Back Button (Top-Left Corner) */}
      <div className="position-absolute top-0 end-0 mt-5 me-3">
        <button
          onClick={() => navigate("/")}
          className="btn btn-dark btn-sm"
        >
          ← Back to Home
        </button>
      </div>

      {/* Centered Content */}
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="card p-4 shadow-lg text-center" style={{ maxWidth: "600px" }}>
          <h2 className="fw-bold mb-3">🛡️ Safety Tips</h2>
          <ol className="text-start">
            <li>Stay aware of your surroundings.</li>
            <hr />
            <li>Avoid walking alone at night.</li>
            <hr />
            <li>Keep emergency contacts handy.</li>
            <hr />
            <li>Trust your instincts in unsafe situations.</li>
            <hr />
            <li>Share your location with trusted people.</li>
            <hr />
            <li>Carry a personal safety alarm.</li>
            <hr />
            <li>Stay in well-lit areas while walking.</li>
            <hr />
            <li>Know emergency numbers in your area.</li>
            <hr />
            <li>Avoid distractions like loud music while commuting.</li>
            <hr />
            <li>Lock your doors and windows properly at night.</li>
            <hr />
            <li>Don’t share personal details with strangers.</li>
            <hr />
            <li>Use ride-sharing apps carefully; verify driver details.</li>
            <hr />
            <li>Keep some cash handy in case of emergency.</li>
            <hr />
            <li>Avoid taking shortcuts through isolated areas.</li>
            
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
