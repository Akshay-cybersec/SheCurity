  import { useState, useEffect } from "react";

  export default function SafetyProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:8000/api/ecommerce/') 
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const updateQuantity = (id, delta) => {
      setProducts(products.map(product => 
        product.id === id ? { ...product, quantity: Math.max(1, (product.quantity || 0) + delta) } : product
      ));
    };

    return (
      <div className="p-6 min-h-screen">
        <h2 className="text-3xl font-bold text text-center mb-6 text-800">Safety Products</h2>
        <style>
          {`
            .text {
                background: linear-gradient(135deg, rgb(74, 6, 133), rgb(132, 74, 172), rgb(74, 6, 133));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                display: inline-block;
            }
          `}
        </style>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map(({ id, name, img, price, quantity }) => (
            <div key={id} className="bg-white border p-4 rounded-lg shadow-lg">
              <img src={img || "https://via.placeholder.com/150"} alt={name} className="w-full h-40 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <p className="text-lg text-gray-700 mb-2">${price?.toFixed(2)}</p>
              <div className="flex items-center my-2 justify-center">
                <button 
                  onClick={() => updateQuantity(id, -1)} 
                  className="px-3 py-1 bg-black-300 text-white rounded-l"
                  style={{
                    background: 'linear-gradient(135deg, rgb(74, 6, 133), rgb(132, 74, 172), rgb(74, 6, 133))',
                    color: 'white',
                  }}
                >-</button>
                <span className="px-4">{quantity || 0}</span>
                <button 
                  onClick={() => updateQuantity(id, 1)} 
                  className="px-3 py-1 bg-black-300 text-white rounded-r"
                  style={{
                    background: 'linear-gradient(135deg, rgb(74, 6, 133), rgb(132, 74, 172), rgb(74, 6, 133))',
                    color: 'white',
                  }}
                >+</button>
              </div>
              <button className="mt-4 w-full bg-black text-white py-2 rounded-lg font-semibold"
                style={{
                  background: 'linear-gradient(135deg, rgb(74, 6, 133), rgb(132, 74, 172), rgb(74, 6, 133))',
                  color: 'white',
                }}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
