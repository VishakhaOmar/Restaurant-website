import React, { useContext } from "react";
import { CartContext } from "./CartContext"; // Import CartContext
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  const handleRemoveItem = (dishId) => {
    removeFromCart(dishId);
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    // Additional order placement functionality (API calls, etc.)
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="p-4 border rounded-md mb-2 flex justify-between">
                <span>{item.title} - ₹{item.price}</span>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mt-4">Total: ₹{totalAmount}</h2>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </>
      )}

      <button
        onClick={() => navigate("/menu")}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Explore Menu
      </button>
    </div>
  );
}

export default CartPage;
