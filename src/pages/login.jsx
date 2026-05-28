import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {

    let newErrors = {};

    // EMAIL VALIDATION
    if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Enter a valid email";
    }

    // PASSWORD VALIDATION
    if (password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    if (validate()) {

      const data = await loginUser(email, password);

      if (data.message === "Login successful") {
        navigate("/dashboard");
      } else {
        alert("Invalid Login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060816] text-white px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/10">

        <h1 className="text-5xl font-bold text-center mb-3 text-purple-400">
          LoanAI
        </h1>

        <p className="text-center text-gray-300 mb-10">
          Loan Recovery Agent Login
        </p>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* EMAIL */}
          <div>

            <label className="block mb-2 text-lg">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#1B1E3A] outline-none"
            />

            {errors.email && (
              <p className="text-red-400 mt-2">
                {errors.email}
              </p>
            )}

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block mb-2 text-lg">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#1B1E3A] outline-none"
            />

            {errors.password && (
              <p className="text-red-400 mt-2">
                {errors.password}
              </p>
            )}

          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-xl font-bold hover:scale-105 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}