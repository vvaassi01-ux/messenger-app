import React from 'react';
// 1. Import Link from React Router
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo and Brand Name */}
        {/* Clicking the logo redirects back to home screen */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="h-9 w-9 bg-gradient-to-br from-purple-600 to-green-500 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-lg tracking-tighter">T</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900 tracking-tight leading-none">Text It</span>
            <span className="text-[10px] font-semibold text-green-600 tracking-wider uppercase mt-1">
              🔒 Safe & Secure
            </span>
          </div>
        </Link>

        {/* Center Tagline */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <p className="text-xs font-medium text-gray-600">
            End-to-end encrypted messaging
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* 2. Swapped native <button> with <Link to="/login"> */}
          <Link 
            to="/login" 
            className="text-sm font-semibold text-gray-700 hover:text-black transition-colors cursor-pointer px-3 py-2"
          >
            Log In
          </Link>
          
          {/* 3. Swapped native <button> with <Link to="/register"> */}
          <Link 
            to="/register" 
            className="text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors cursor-pointer px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-center"
          >
            Register
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
