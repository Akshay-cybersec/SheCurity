import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { colors } from "../assets/colors";
import { useNavigate } from "react-router-dom";

const Products = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        setQuantities(data.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {}));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = quantities[product.id];
    } else {
      updatedCart.push({ ...product, quantity: quantities[product.id] });
    }
    setCart(updatedCart);
    navigate("/Cart");
  };

  if (loading) return <p className="text-center mt-4">Loading products...</p>;

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="card shadow-sm p-3 h-100">
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top mx-auto d-block"
                style={{ height: "75px", width: "auto", objectFit: "contain" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description.substring(0, 80)}...</p>
                <p className="fw-bold">${product.price}</p>
                <div className="d-flex justify-content-center align-items-center mb-2">
                  <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                  <span className="mx-2">{quantities[product.id]}</span>
                  <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                </div>
                <button className="btn" style={{ backgroundColor: colors.main_color }} onClick={() => handleAddToCart(product)}>Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
