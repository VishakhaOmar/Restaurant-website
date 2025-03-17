import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import MenuPage from "./MenuPage";
import DishesPage from "./DishesPage";
import OrderPage from "./OrderPage";
import CartPage from "./CartPage";
import Homepage from "./Homepage";
import Reserve from "./Reserve";


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/reserve" element={<Reserve/>} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/dishes/:categoryName" element={<DishesPage />} />
          <Route path="/order/:dishId" element={<OrderPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
