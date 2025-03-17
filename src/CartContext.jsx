import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const addToCart = (dish) => {
    setCart((prevCart) => [...prevCart, dish]);
    setNotification(`${dish.title} added to cart!`);

    // Remove notification after 2 seconds
    setTimeout(() => setNotification(null), 2000);
  };

  const removeFromCart = (dishId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, notification }}>
      {children}
    </CartContext.Provider>
  );
};
