import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaMicrophone, FaShoppingCart } from "react-icons/fa";
import { colors } from "../assets/colors";
import { pagedetail } from "../assets/colors";

const Side = () => {
  return (
    <div
      className="position-fixed top-0 start-0 vh-100 text-white d-flex flex-column p-3"
      style={{ width: "250px", backgroundColor: colors.main_color }}
    >
      <h2 className="mb-4">{pagedetail.logo_title}</h2>
      <p> Empowering Women with Smart Safety </p>
      <hr />
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white d-flex align-items-center gap-2"> <FaHome />Home</Link>
        </li>

        <li className="nav-item">
          <Link to="/Mimic" className="nav-link text-white d-flex align-items-center gap-2"> <FaMicrophone />Emergency Mimic calls</Link>
        </li>
        <li className="nav-item">
          <Link to="/Products" className="nav-link text-white d-flex align-items-center gap-2"> <FaShoppingCart /> Safety Products </Link>
        </li>
      </ul>

      <button 
        className="btn custom-button"
        style={{
          backgroundColor: "#2C2C2C",
          color: "WHITE",
          borderRadius: "25px",
          padding: "12px 24px",
          border: "none",
          fontWeight: "bold",
          fontSize: "18px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "200px",
          height: "50px",
          lineHeight: "normal",
          marginTop: "300px", 
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Side;
