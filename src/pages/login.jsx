import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {

    let newErrors = {};

    // Email validation
    if (!email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    // Password validation
    if (password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Must contain uppercase letter";
    }

    if (!/[0-9]/.test(password)) {
      newErrors.password =
        "Must contain number";
    }

    if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password =
        "Must contain special character";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {

    if (validate()) {

      // Demo Login
      if (
        email === "admin@gmail.com" &&
        password === "Admin@123"
      ) {
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative bg-[#060816]">

      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-600 rounded-full blur-[140px] opacity-30"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-pink-600 rounded-full blur-[140px] opacity-30"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[420px] glass p-10 rounded-3xl border border-white/10 shadow-2xl"
      >

        {/* Logo */}
        <h1 className="text-5xl font-bold text-center mb-3">
          <span className="text-purple-400">Loan</span>
          <span className="text-pink-400">AI</span>
        </h1>

        <p className="text-center text-gray-400 mb-10">
          AI Powered Loan Recovery Agent
        </p>

        {/* EMAIL */}
        <div className="mb-6">

          <label className="text-gray-300 mb-2 block">
            Email
          </label>

          <div className="flex items-center bg-white/10 p-4 rounded-xl border border-white/10">

            <FaEnvelope className="text-purple-400" />

            <input
              type="email"
              placeholder="example@gmail.com"
              className="bg-transparent outline-none ml-3 w-full text-white"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          {errors.email && (
            <p className="text-red-400 mt-2 text-sm">
              {errors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-6">

          <label className="text-gray-300 mb-2 block">
            Password
          </label>

          <div className="flex items-center bg-white/10 p-4 rounded-xl border border-white/10">

            <FaLock className="text-pink-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="bg-transparent outline-none ml-3 w-full text-white"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-400 mt-2 text-sm">
              {errors.password}
            </p>
          )}

          {/* Password Rules */}
          <div className="mt-4 text-sm text-gray-400 space-y-1">
            <p>✔ Minimum 8 characters</p>
            <p>✔ One uppercase letter</p>
            <p>✔ One number</p>
            <p>✔ One special character</p>
          </div>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold text-lg shadow-lg"
        >
          Login
        </motion.button>

        {/* Demo Credentials */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Demo:
          <br />
          admin@gmail.com
          <br />
          Admin@123
        </div>

      </motion.div>
    </div>
  );
}