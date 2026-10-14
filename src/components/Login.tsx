import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { handleLogin } from '../authentication/firebaseAuth';
import { FirebaseError } from 'firebase/app';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await handleLogin(formData.email, formData.password);
      console.log("login success");

      navigate("/");
      console.log("Logging in user data:", formData);
    }
    catch (err) {
      const firebaseError = err as FirebaseError;
      console.log(firebaseError.code);

      if (firebaseError.code == "auth/invalid-credential") {
        setErrorMessage("Wrong email or password");
      } else if (firebaseError.code == "auth/too-many-requests") {
        setErrorMessage("Too many requests. Please try again later");
      } else if (firebaseError.code) {
        setErrorMessage("Error logging in");
      };
    };
  };

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
      <form id="loginForm" onSubmit={handleSubmit} className="space-y-6">

        {/* Header */}
        <div className="text-center pb-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Please enter your details to sign in</p>
        </div>

        {/* Email Field Group */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 text-left">
            Email Address
          </label>
          <input
            className="w-full border border-solid border-gray-300 bg-white px-3 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field Group */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-gray-800 text-left">
              Password
            </label>
          </div>
          <input
            className="w-full border border-solid border-gray-300 bg-white px-3 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <p className="text-center text-sm text-red-500">{errorMessage}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold text-sm rounded-xl py-3 hover:bg-gray-800 transition-colors cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 mt-2"
        >
          Login
        </button>

        {/* Footer Link Navigation */}
        <p className="text-center text-sm text-gray-500 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-purple-600 hover:text-purple-800 transition-colors">
            Register for free
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;