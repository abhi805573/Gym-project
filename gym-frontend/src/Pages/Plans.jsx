import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Plans = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">GymFlow Membership Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pb-20">
          {/* Monthly Plan */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Plan</h2>
            <p className="text-gray-700 mb-4">
              Get access to all facilities and classes for one month. Join today Visit our branch.
            </p>
            <p className="text-gray-700 mb-4">
              Ideal for beginners, this plan includes access to cardio equipment, free weights, and one group class per week. Perfect for testing the waters or maintaining a short-term fitness goal.
            </p>
            <div className="flex justify-start items-center mt-6">
              <span className="text-lg font-bold">Rs. 999</span>
            </div>
          </div>

          {/* Quarterly Plan */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quarterly Plan</h2>
            <p className="text-gray-700 mb-4">
              Get access to all facilities and classes for three months. Save 6.6%!
            </p>
            <p className="text-gray-700 mb-4">
              Designed for those committing to a seasonal fitness journey, this plan offers unlimited access to all classes and a nutrition guide to kickstart your progress.
            </p>
            <div className="flex justify-start items-center mt-6">
              <div className="space-x-2">
                <span className="text-lg font-bold">Rs. 2799</span>
                <span className="text-gray-600 line-through">Rs. 2997</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">6.6% Discount</div>
          </div>

          {/* Semi-Annual Plan */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Semi-Annual Plan</h2>
            <p className="text-gray-700 mb-4">
              Get access to all facilities and classes for six months. Save 19.9%!
            </p>
            <p className="text-gray-700 mb-4">
              Perfect for serious fitness enthusiasts, this plan includes unlimited gym access and a tailored workout plan to maximize your six-month transformation.
            </p>
            <div className="flex justify-start items-center mt-6">
              <div className="space-x-2">
                <span className="text-lg font-bold">Rs. 4799</span>
                <span className="text-gray-600 line-through">Rs. 5994</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">19.9% Discount</div>
          </div>

          {/* Yearly Plan */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Yearly Plan</h2>
            <p className="text-gray-700 mb-4">
              Get access to all facilities and classes for one year. Save 20.7%!
            </p>
            <p className="text-gray-700 mb-4">
              The ultimate commitment for long-term fitness, this plan offers unlimited access, a custom nutrition plan, and priority booking for popular classes.
            </p>
            <div className="flex justify-start items-center mt-6">
              <div className="space-x-2">
                <span className="text-lg font-bold">Rs. 9499</span>
                <span className="text-gray-600 line-through">Rs. 11988</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">20.7% Discount</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Plans;