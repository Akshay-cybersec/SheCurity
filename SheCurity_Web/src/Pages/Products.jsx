import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { colors } from "../assets/colors";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) return <p className="text-center mt-4">Loading products...</p>;

  return (
    <div className="container fluid mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4"> 
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="card shadow-sm p-3 h-100">
              <img src={product.image} alt={product.title} className="card-img-top mx-auto d-block" style={{ height: "75px", width: "auto", objectFit: "contain" }} />
              <div className="card-body text-center">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description.substring(0, 80)}...</p>
                <p className="fw-bold">${product.price}</p>
                <button className="btn" style={{backgroundColor:colors.main_color}}>Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
