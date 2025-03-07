import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (window.confirm("Are you sure you want to proceed to checkout?")) {
      alert("Proceeding to checkout!");
      setCart([]);
      navigate("/");
    }
  };

  if (cart.length === 0) {
    return <h3 className="text-center mt-4">Your cart is empty</h3>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Shopping Cart</h2>
      <div className="row">
        {cart.map((item) => (
          <div key={item.id} className="col-md-6 mb-4">
            <div className="card p-3">
              <div className="d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ height: "75px", width: "auto" }}
                />
                <div className="ms-3">
                  <h5>{item.title}</h5>
                  <p className="fw-bold">${item.price}</p>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
