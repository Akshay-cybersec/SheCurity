import { Link, useLocation } from "react-router-dom";
import {  FaMicrophone, FaShoppingCart, FaFileAlt } from "react-icons/fa";
import { IoPersonAdd, IoHome } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { colors } from "../assets/colors";
import { pagedetail } from "../assets/colors";

const Side = () => {
  const location = useLocation(); 

  return (
    <div
      className="position-fixed top-0 start-0 vh-100 text-white d-flex flex-column p-3"
      style={{ width: "20%", background: "linear-gradient(135deg,rgb(74, 6, 133),rgb(132, 74, 172),rgb(74, 6, 133))", 
        backgroundSize: "400% 400%", }}
    >
      <h2 className="mb-4">{pagedetail.logo_title}</h2>
      <p> Empowering Women with Smart Safety </p>
      <hr />
      <ul className="nav flex-column">
        {[
          { to: "/", icon: <IoHome />, text: "Home" },
          { to: "/SafetyTracker", icon: <AiFillSafetyCertificate />, text: "Safety Tracker" },
          { to: "/TrustedPeople", icon: <IoPersonAdd />, text: "Trusted People" },
          { to: "/FileCase", icon: <FaFileAlt />, text: "File A Case" },
          { to: "/Products", icon: <FaShoppingCart />, text: "Safety Products" },
        ].map(({ to, icon, text }) => (
          <li className="nav-item" key={to}>
            <Link
              to={to}
              className="nav-link text-white d-flex align-items-center gap-2"
              style={{
                backgroundColor: location.pathname === to ? "#cab5d5" : "transparent", // Active link color
                padding: "10px",
                borderRadius: "5px",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#cab5d5")} // Hover effect
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = location.pathname === to ? "#cab5d5" : "transparent")
              } 
            >
              {icon} {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Side ;