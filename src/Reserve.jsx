import { useState } from "react";

const timeSlots = ["12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"];
const initialTablesData = { "12:00 PM": 5, "2:00 PM": 3, "4:00 PM": 8, "6:00 PM": 2, "8:00 PM": 4 };
const initialPriceData = { "12:00 PM": 50, "2:00 PM": 50, "4:00 PM": 50, "6:00 PM": 50, "8:00 PM": 50 };

export default function TableReservation() {
  const [timeSlot, setTimeSlot] = useState("");
  const [tablesAvailable, setTablesAvailable] = useState(null);
  const [numPersons, setNumPersons] = useState(1);  // Default to 1 person
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  
  // Admin settings
  const [isAdmin, setIsAdmin] = useState(false); // Admin mode toggle
  const [adminTablesData, setAdminTablesData] = useState(initialTablesData);
  const [adminPriceData, setAdminPriceData] = useState(initialPriceData);

  const totalTables = Object.values(adminTablesData).reduce((total, num) => total + num, 0);

  // Price calculation (starting price for 1 person)
  const initialPrice = adminPriceData[timeSlot] || 50; // Get the price for the selected time slot
  const price = initialPrice * (numPersons - 1); // Price doubles with each person increment

  const handleTimeSlotChange = (value) => {
    setTimeSlot(value);
    setTablesAvailable(adminTablesData[value] || 0);
  };

  const handleSubmit = () => {
    if (!timeSlot || numPersons <= 0) {
      alert("Please select a time slot and enter a valid number of persons (greater than 0).");
      return;
    }
    setConfirmation(true);
  };

  const handleEdit = () => {
    setConfirmation(false);
  };

  const handleAdminToggle = () => {
    setIsAdmin(!isAdmin);
  };

  const handleAdminTableChange = (e, slot) => {
    setAdminTablesData({
      ...adminTablesData,
      [slot]: e.target.value,
    });
  };

  const handleAdminPriceChange = (e, slot) => {
    setAdminPriceData({
      ...adminPriceData,
      [slot]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    // Here you would typically save changes to a server or a database
    alert("Changes saved!");
     // Close the admin edit page by switching to user mode
     setIsAdmin(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Reserve a Table</h2>

      <p className="mb-4">Total Tables Available: {totalTables}</p>

      <label className="block mb-2">Select Time Slot:</label>
      <div className="grid grid-cols-2 gap-4">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            className={`w-full p-3 border rounded-lg ${timeSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleTimeSlotChange(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
      
      {tablesAvailable !== null && <p className="mt-2">Tables Available: {tablesAvailable}</p>}

      <label className="block mt-4 mb-2">Number of Persons:</label>
      <input
        type="number"
        value={numPersons}
        onChange={(e) => setNumPersons(Math.max(1, e.target.value))}  // Ensure at least 1 person
        className="w-full p-2 border rounded-lg"
      />
         {/* Price Display:Dynamically calculated */}
      {timeSlot && (
        <p className="mt-4 font-semibold">Price for {numPersons} person(s): Rs {price}</p>
      )}
      

      <label className="block mt-4 mb-2">Additional Information:</label>
      <input
        type="text"
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />

      <button
        className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg"
        onClick={handleSubmit}
      >
        Proceed to Confirm
      </button>

 

      {confirmation && (
        <div className="mt-6 p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Booking Confirmation</h3>
          <p>Time Slot: {timeSlot}</p>
          <p>Persons: {numPersons}</p>
          <p className="mt-4 font-semibold">Total Price: Rs{price}</p>
          <p>Additional Info: {additionalInfo}</p>
          <button className="mt-4 w-full p-2 bg-green-500 text-white rounded-lg">
            Confirm Booking
          </button>
          <button
            className="mt-4 w-full p-2 bg-gray-500 text-white rounded-lg"
            onClick={handleEdit}
          >
            Edit Reservation
          </button>
        </div>
      )}

      {/* Admin Section */}
      {isAdmin && (
        <div className="mt-6 p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Admin Controls</h3>
          <button
            className="mt-4 w-full p-2 bg-red-500 text-white rounded-lg"
            onClick={handleAdminToggle}
          >
            Switch to User Mode
          </button>

          <div className="mt-4">
            <h4 className="font-semibold">Edit Tables Available:</h4>
            {timeSlots.map((slot) => (
              <div key={slot} className="flex items-center space-x-2 mt-2">
                <label>{slot}:</label>
                <input
                  type="number"
                  value={adminTablesData[slot]}
                  onChange={(e) => handleAdminTableChange(e, slot)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Edit Price for Each Slot:</h4>
            {timeSlots.map((slot) => (
              <div key={slot} className="flex items-center space-x-2 mt-2">
                <label>{slot}:</label>
                <input
                  type="number"
                  value={adminPriceData[slot]}
                  onChange={(e) => handleAdminPriceChange(e, slot)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            ))}
          </div>

          <button
            className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      )}

      {!isAdmin && (
        <button
          className="mt-4 w-full p-2 bg-yellow-500 text-white rounded-lg"
          onClick={handleAdminToggle}
        >
          Admin Mode
        </button>
      )}
    </div>
  );
}
