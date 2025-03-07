import { Link, useLocation } from "react-router-dom";
import {  FaMicrophone, FaShoppingCart, FaFileAlt } from "react-icons/fa";
import { IoPersonAdd, IoHome } from "react-icons/io5";
import { colors } from "../assets/colors";
import { pagedetail } from "../assets/colors";

const Side = () => {
  const location = useLocation(); // Get current route

  return (
    <div
      className="position-fixed top-0 start-0 vh-100 text-white d-flex flex-column p-3"
      style={{ width: "20%", backgroundColor: colors.main_color }}
    >
      <h2 className="mb-4">{pagedetail.logo_title}</h2>
      <p> Empowering Women with Smart Safety </p>
      <hr />
      <ul className="nav flex-column">
        {[
          { to: "/", icon: <IoHome />, text: "Home" },
          { to: "/Mimic", icon: <FaMicrophone />, text: "Emergency Mimic calls" },
          { to: "/TrustedPeople", icon: <IoPersonAdd />, text: "Trusted People" },
          { to: "/FileCase", icon: <FaFileAlt />, text: "File A Case" },
          { to: "/Products", icon: <FaShoppingCart />, text: "Safety Products" },
        ].map(({ to, icon, text }) => (
          <li className="nav-item" key={to}>
            <Link
              to={to}
              className="nav-link text-white d-flex align-items-center gap-2"
              style={{
                backgroundColor: location.pathname === to ? "#0056b3" : "transparent", // Active link color
                padding: "10px",
                borderRadius: "5px",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#007bff")} // Hover effect
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = location.pathname === to ? "#0056b3" : "transparent")
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

export default Side;
