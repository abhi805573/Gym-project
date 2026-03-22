import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// ✅ Correct Folder Name = Exercise (NOT Excercises)
import Chest from "../Components/Exercise/Chest";
import Arms from "../Components/Exercise/Arms";
import Shoulders from "../Components/Exercise/Shoulders";
import Back from "../Components/Exercise/Back";
import Legs from "../Components/Exercise/Legs";

const Excercises = () => {
  const [selectedPart, setSelectedPart] = useState(null);

  const renderComponent = () => {
    switch (selectedPart) {
      case "chest":
        return <Chest />;
      case "arms":
        return <Arms />;
      case "shoulders":
        return <Shoulders />;
      case "back":
        return <Back />;
      case "legs":
        return <Legs />;
      default:
        return (
          <div className="text-center mt-10 text-gray-600 text-lg">
            Select a body part to see exercises
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Body Part Selection Cards */}
      <div className="m-6 grid grid-cols-1 md:grid-cols-5 gap-4 justify-center">
        <div
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedPart("chest")}
        >
          <div className="p-5">
            <h5 className="text-2xl font-bold text-center">Chest</h5>
          </div>
        </div>

        <div
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedPart("arms")}
        >
          <div className="p-5">
            <h5 className="text-2xl font-bold text-center">Arms</h5>
          </div>
        </div>

        <div
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedPart("shoulders")}
        >
          <div className="p-5">
            <h5 className="text-2xl font-bold text-center">Shoulders</h5>
          </div>
        </div>

        <div
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedPart("back")}
        >
          <div className="p-5">
            <h5 className="text-2xl font-bold text-center">Back</h5>
          </div>
        </div>

        <div
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedPart("legs")}
        >
          <div className="p-5">
            <h5 className="text-2xl font-bold text-center">Legs</h5>
          </div>
        </div>
      </div>

      {/* Render Selected Exercises */}
      {renderComponent()}

      <Footer />
    </div>
  );
};

export default Excercises;
