import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { handleSignUp } from '../authentication/firebaseAuth';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleSignUp(formData.email, formData.password);
      navigate("/");
    }
    catch (error: unknown) {
console.log("Error occurred trying to register", error);

    }
  };

  return (
    <div className="w-full max-w-lg bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 my-8">
      <form id="registerForm" onSubmit={handleSubmit} className="space-y-5">

        {/* Header */}
        <div className="text-center pb-1">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Join Text It and start messaging securely</p>
        </div>

        {/* First & Last Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800 text-left">
              First Name
            </label>
            <input
              className="w-full border border-solid border-gray-300 bg-white px-3 py-2 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-800 text-left">
              Last Name
            </label>
            <input
              className="w-full border border-solid border-gray-300 bg-white px-3 py-2 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        {/* Username Field */}
        <div className="space-y-1.5">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-800 text-left">
            Username
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-400 text-sm font-medium">@</span>
            <input
              className="w-full border border-solid border-gray-300 bg-white pl-8 pr-3 py-2 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 text-left">
            Email Address
          </label>
          <input
            className="w-full border border-solid border-gray-300 bg-white px-3 py-2 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-800 text-left">
            Password
          </label>
          <input
            className="w-full border border-solid border-gray-300 bg-white px-3 py-2 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold text-sm rounded-xl py-3 mt-2 hover:bg-gray-800 transition-colors cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Register Account
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-800 transition-colors">
            Sign In
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Register;
