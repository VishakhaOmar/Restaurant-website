import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext"; // Import CartContext

function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, notification } = useContext(CartContext); // Use CartContext to access addToCart and notification
  const dish = location.state?.dish;

  if (!dish) {
    return <div className="p-5 text-center">No dish selected.</div>;
  }

  const handleAddToCart = () => {
    addToCart(dish); // Add the dish to the cart via context
  };

  const handleOrderNow = () => {
    alert(`Order placed for ${dish.title}`);
    // Add functionality for order placement (API calls, etc.)
  };

  const goToCartPage = () => {
    navigate("/cart"); // Navigate to the CartPage when cart button is clicked
  };

  return (
    <div className="p-5">
            {dish.image ? (
        <img
          src={dish.image}
          alt={dish.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 mb-4 rounded-md flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Order {dish.title}</h1>
      <p className="text-gray-700 mb-4">{dish.description}</p>

      {notification && (
        <div className="bg-green-500 text-white p-2 rounded-md mb-4">
          {notification}
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={handleOrderNow}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Order Now
        </button>
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>

      <button
        onClick={goToCartPage}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Go to Cart
      </button>
    </div>
  );
}

export default OrderPage;
