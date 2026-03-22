import React, { useState } from "react";
import BmiChart from "../Components/charts/BmiChart";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Components/charts/bmichart.css";

export default function Bmi() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [ybmi, setYBmi] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (heightNum > 0 && weightNum > 0) {
      const heightInMeters = heightNum / 100;
      const bmi = weightNum / (heightInMeters * heightInMeters);
      setYBmi(bmi);
    } else {
      setYBmi(null);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:px-8">
        
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://www.shutterstock.com/image-vector/indikator-bmi-on-white-background-260nw-2100889945.jpg"
            alt="BMI Indicator"
          />
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            BMI CALCULATOR
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Weight in KG
              </label>
              <input
                type="number"
                value={weight}
                placeholder="Enter Weight"
                required
                className="mt-2 block w-full rounded-md border py-2 px-3"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Height in CM
              </label>
              <input
                type="number"
                value={height}
                placeholder="Enter Height"
                required
                className="mt-2 block w-full rounded-md border py-2 px-3"
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
            >
              Calculate BMI
            </button>
          </form>
        </div>

        <div className="mt-10 w-full max-w-2xl">
          <BmiChart ybmi={ybmi} />
        </div>

      </div>

      <Footer />
    </div>
  );
}
