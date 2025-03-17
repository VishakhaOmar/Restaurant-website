import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Initial Popular Dishes (without image URLs)
const initialPopularDishes = [
  { id: 101, title: "Paneer Tikka", description: "Grilled paneer cubes with spices", image: "", price: 250, offer: "20% Off" },
  { id: 102, title: "Masala Dosa", description: "Stuffed dosa with spiced potatoes", image: "" , price: 250, offer: "20% Off"},
  { id: 103, title: "Jalebi", description: "Crispy deep-fried sweet soaked in syrup", image: "", price: 250, offer: "20% Off" },
  { id: 104, title: "Belgian Waffle", description: "Crispy waffle with chocolate drizzle", image: "", price: 250, offer: "20% Off" },
  { id: 105, title: "Dal Makhani", description: "Rich creamy lentil dish", image: "", price: 250, offer: "20% Off" },
  { id: 106, title: "Uttapam", description: "Thick pancake with toppings", image: "", price: 250, offer: "20% Off" },
  { id: 107, title: "Rasmalai", description: "Soft cheese dumplings in saffron milk", image: "" , price: 250, offer: "20% Off"},
  { id: 108, title: "Strawberry Waffle", description: "Waffle topped with fresh strawberries", image: "" , price: 250, offer: "20% Off"},
];

function MenuPage() {
  const navigate = useNavigate();
  const [popularDishes, setPopularDishes] = useState(initialPopularDishes);
  const [newDish, setNewDish] = useState({ title: "", description: "", image: "" });
  const [editingDish, setEditingDish] = useState(null); // Track which dish is being edited

  // Navigate to order page
  const handleOrderPage = (dish) => {
    navigate(`/order/${dish.id}`, { state: { dish } });
  };

  // Handle adding new dish
  const handleAddDish = () => {
    if (!newDish.title || !newDish.description || !newDish.image) return;
    const newDishEntry = {
      id: popularDishes.length + 101,
      title: newDish.title,
      description: newDish.description,
      image: newDish.image,
      price: newDish.price,
      offer: newDish.offer
    };
    setPopularDishes([...popularDishes, newDishEntry]);
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
    setPopularDishes(popularDishes.map((dish) =>
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
      <h1 className="text-3xl font-bold mb-6">Menu</h1>

      {/* Categories Section */}
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["South Indian", "North Indian", "Desserts", "Waffles"].map((category) => (
          <div
            key={category}
            className="p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition"
            onClick={() => navigate(`/dishes/${category}`)}
          >
            <h3 className="text-lg font-semibold">{category}</h3>
          </div>
        ))}
      </div>

      {/* Most Popular Menu */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Most Popular Menu</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {popularDishes.map((dish) => (
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

      {/* Add New Dish Section */}
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
          placeholder="Dish Price"
          value={newDish.price}
          onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
          className="p-2 border rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Dish Offer"
          value={newDish.offer}
          onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
          className="p-2 border rounded w-full mb-2"/>
        
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

export default MenuPage;
