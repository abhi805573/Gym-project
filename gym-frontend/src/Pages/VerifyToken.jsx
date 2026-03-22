import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import http from "../configs/http";


const VerifyToken = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please enter a token", { position: "bottom-center" });
      return;
    }
    setLoading(true);
    try {
      const response = await http.get(`/api/users/verify?token=${token}`);
      if (response.status === 200) {
        toast.success("Token Verified", { position: "bottom-center" });
        localStorage.setItem("isTokenVerified", "true");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred during verification", { position: "bottom-center" });
      console.log("Verification error:", err);
      localStorage.setItem("isTokenVerified", "false");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="pt-8 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Verify Token
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter Verification Token
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Verification Token
                  </label>
                  <input
                    onChange={(e) => setToken(e.target.value)}
                    type="text"
                    value={token}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your token"
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
                  value={loading ? "Verifying..." : "Verify"}
                  disabled={loading}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default VerifyToken;