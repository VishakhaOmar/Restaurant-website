import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DishesPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Sample initial dishes for each category
  const initialDishes = {
    "South Indian": [
      { id: 201, title: "Idli Sambar", description: "Steamed rice cakes with lentil soup", image: "", price: 250, offer: "20% Off" },
      { id: 202, title: "Vada", description: "Crispy deep-fried lentil donuts", image: "",price: 250, offer: "20% Off" },
    ],
    "North Indian": [
      { id: 301, title: "Butter Chicken", description: "Creamy tomato-based chicken curry", image: "",  price: 250, offer: "20% Off" },
      { id: 302, title: "Aloo Paratha", description: "Stuffed flatbread with spiced potatoes", image: "" , price: 250, offer: "20% Off"},
    ],
    Desserts: [
      { id: 401, title: "Gulab Jamun", description: "Deep-fried sweet dumplings in sugar syrup", image: "", price: 250, offer: "20% Off" },
      { id: 402, title: "Rasgulla", description: "Soft spongy cottage cheese balls in syrup", image: "", price: 250, offer: "20% Off" },
    ],
    Waffles: [
      { id: 501, title: "Chocolate Waffle", description: "Crispy waffle with melted chocolate", image: "",  price: 250, offer: "20% Off" },
      { id: 502, title: "Nutella Waffle", description: "Waffle topped with Nutella spread", image: "",  price: 250, offer: "20% Off" },
    ],
  };

  const [dishes, setDishes] = useState(initialDishes[categoryName] || []);
  const [newDish, setNewDish] = useState({ title: "", description: "", image: "" });
  const [editingDish, setEditingDish] = useState(null);

  // Navigate to order page
  const handleOrderPage = (dish) => {
    navigate(`/order/${dish.id}`, { state: { dish } });
  };

  // Handle adding new dish
  const handleAddDish = () => {
    if (!newDish.title || !newDish.description || !newDish.image) return;
    const newDishEntry = {
      id: dishes.length + 100,
      title: newDish.title,
      description: newDish.description,
      image: newDish.image,
      price: newDish.price,
      offer: newDish.offer
    };
    setDishes([...dishes, newDishEntry]);
    setNewDish({ title: "", description: "", image: "", price: "", offer: "" });
  };

  // Handle editing a dish
  const handleEditDish = (dish) => {
    setEditingDish(dish);
    setNewDish({ title: dish.title, description: dish.description, image: dish.image });
  };

  // Handle saving the edited dish
  const handleSaveEditedDish = () => {
    if (!newDish.title || !newDish.description || !newDish.image) return;
    setDishes(dishes.map((dish) =>
      dish.id === editingDish.id ? { ...dish, ...newDish } : dish
    ));
    setEditingDish(null);
    setNewDish({ title: "", description: "", image: "" });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDish((prevState) => ({ ...prevState, image: reader.result }));
      };
      reader.readAsDataURL(file); // Read the image as base64
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">{categoryName} Dishes</h1>

      {/* Display Dishes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition"
            onClick={() => handleOrderPage(dish)}
          >
            {dish.image ? (
              <img
                src={dish.image}
                alt={dish.title}
                className="w-full h-40 object-cover mb-2 rounded-md"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 mb-2 rounded-md flex items-center justify-center">
                <span>No Image</span>
              </div>
            )}
            <h3 className="text-lg font-semibold">{dish.title}</h3>
            <p className="text-lg font-semibold mt-2">₹{dish.price}</p>
            <div className="mt-2">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-md">{dish.offer}</span>
            </div>
            <p className="text-sm text-gray-700">{dish.description}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditDish(dish);
              }}
              className="mt-2 text-blue-500 hover:underline"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Add/Edit Dish Section */}
      <div className="mt-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">{editingDish ? "Edit Dish" : "Add a New Dish"}</h2>
        <input
          type="text"
          placeholder="Dish Name"
          value={newDish.title}
          onChange={(e) => setNewDish({ ...newDish, title: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Dish Description"
          value={newDish.description}
          onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        
        {/* Image Upload Section */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 border rounded w-full mb-2"
        />
        {newDish.image && (
          <div className="mb-2">
            <img src={newDish.image} alt="Dish preview" className="w-32 h-32 object-cover rounded-md" />
          </div>
        )}

        <input
          type="text"
          placeholder="Price"
          value={newDish.price}
          onChange={(e) => setNewDish({ ...newDish, number: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />

        <input
          type="text"
          placeholder="Offer"
          value={newDish.price}
          onChange={(e) => setNewDish({ ...newDish, number: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        
        <button
          onClick={editingDish ? handleSaveEditedDish : handleAddDish}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingDish ? "Save Changes" : "Add Dish"}
        </button>
        {editingDish && (
          <button
            onClick={() => setEditingDish(null)}
            className="ml-4 text-red-500 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default DishesPage;
