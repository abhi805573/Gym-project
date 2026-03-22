import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import http from "../configs/http";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuth") === "true";

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  const handleLogin = async (payload) => {
    setLoading(true);
    try {
      const response = await http.post(`/api/users/login`, payload);

      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem("access_token", token);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("role", user.role);
        localStorage.setItem("userEmail", user.email);

        toast.success("Login Successful ✅");

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid Email or Password ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuth, navigate]);

  return (
    <div>
      <Navbar />

      <section className="bg-gradient-to-b from-[#0f172a] to-[#0b1320] min-h-screen flex items-center justify-center px-6 py-12">
        
        <div className="w-full max-w-md bg-[#1e293b] rounded-xl shadow-2xl p-8 border border-gray-700">

          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            GymFlow Login
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-[#334155] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg bg-[#334155] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-300"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Links */}
            <div className="text-sm text-center mt-4 text-gray-300">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </div>

            <div className="text-sm text-center text-gray-300">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

          </form>
        </div>
      </section>

      <Toaster />
    </div>
  );
};

export default Login;
