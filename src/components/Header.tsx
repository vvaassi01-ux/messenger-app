import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { createPortal } from 'react-dom';
import { useAuth } from '../hooks/useAuth';
import { handleLogOut } from '../authentication/firebaseAuth';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Navigation states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock background window scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLogOutClick = async () => {
    try {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      await handleLogOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const avatarLetter = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 z-50 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 hover:opacity-90 transition-opacity z-50"
        >
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

        {/* 🖥️ DESKTOP NAVIGATION DOCK (Hidden on Mobile) */}
        {user ? (
          <div className="hidden md:flex items-center gap-1 bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100/80">
            <Link to="/messages" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-purple-700 hover:bg-purple-50/60 transition-all font-bold text-sm">
              <span>💬</span> Messages
            </Link>
            <Link to="/community" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-purple-700 hover:bg-purple-50/60 transition-all font-bold text-sm">
              <span>👥</span> Our Community
            </Link>
            <Link to="/about" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-purple-700 hover:bg-purple-50/60 transition-all font-bold text-sm">
              <span>ℹ️</span> About us
            </Link>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-xs font-medium text-gray-600">End-to-end encrypted messaging</p>
          </div>
        )}

        {/* RIGHT CONTROL ACTIONS */}
        <div className="flex items-center gap-4">

          {/* 🖥️ DESKTOP PROFILE BAR SYSTEM */}
          {user ? (
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 to-green-500 text-white font-bold text-sm flex items-center justify-center cursor-pointer shadow-sm hover:opacity-90 transition-opacity focus:outline-none"
              >
                {avatarLetter}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-xs font-bold text-gray-800 truncate">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogOutClick}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold border-t border-gray-50 transition-colors text-left cursor-pointer"
                  >
                    🚪 Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-black">Log In</Link>
              <Link to="/register" className="text-sm font-medium text-white bg-black px-4 py-2 rounded-lg shadow-sm">Register</Link>
            </div>
          )}

          {/* 📱 MINIMALIST 2-LINE MORPHING HAMBURGER ICON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-2xl text-zinc-900 hover:text-purple-600 transition-colors focus:outline-none z-50 cursor-pointer relative"
          >
            <span
              className={`absolute transition-opacity duration-200 ease-in-out font-light ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
              ☰
            </span>

            <span
              className={`absolute transition-opacity duration-200 ease-in-out font-light ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
              ✕
            </span>
          </button>
        </div>
      </div>

      {/* 📱 SEAMLESS MOBILE DROP-DOWN (With click-away-to-close backdrop portal) */}
      {createPortal(
        <>
          {/* 1. INVISIBLE BACKDROP LAYER: Only mounts when menu is open */}
          {mobileMenuOpen && (
            <div 
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 w-screen h-screen bg-transparent z-35" 
            />
          )}

          {/* 2. THE DROP-DOWN CONTENT MENU */}
          <div 
            className={`md:hidden fixed top-[73px] left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col justify-between shadow-xl rounded-b-xl transition-all duration-300 ease-in-out origin-top transform z-40 ${
              mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none'
            }`}
          >
            {/* Scrollable interior section */}
            <div className="overflow-y-auto space-y-4 max-h-[60vh] pb-2">
              {user ? (
                <>
                  {/* Profile Card Summary */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-1">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 to-green-500 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {avatarLetter}
                    </div>
                    <div className="flex flex-col overflow-hidden text-left">
                      <span className="text-[9px] font-bold text-purple-600 uppercase tracking-wider">Secure Account</span>
                      <span className="text-xs font-bold text-gray-800 truncate">{user.email}</span>
                    </div>
                  </div>

                  <Link to="/messages" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all text-left">
                    <span className="text-base">💬</span> Messages
                  </Link>
                  <Link to="/community" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all text-left">
                    <span className="text-base">👥</span> Our Community
                  </Link>
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all text-left">
                    <span className="text-base">ℹ️</span> About Us
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full bg-gray-50 text-gray-900 border border-gray-200 text-center font-bold p-2.5 rounded-xl block text-sm">
                    Log In
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full bg-black text-white text-center font-bold p-2.5 rounded-xl block text-sm">
                    Register for Free
                  </Link>
                </div>
              )}
            </div>

            {/* 🚪 LOGOUT ACTION BUTTON */}
            {user && (
              <div className="pt-4 mt-2 border-t border-gray-100 bg-white">
                <button
                  type="button"
                  onClick={handleLogOutClick}
                  className="w-full bg-red-50 text-red-600 font-bold p-2.5 rounded-xl flex items-center justify-center gap-2 border border-red-100 hover:bg-red-100 transition-colors cursor-pointer text-sm"
                >
                  <span>🚪</span> Log Out of Account
                </button>
              </div>
            )}
          </div>
        </>,
        document.body
      )}
    </header>
  );
};

export default Header;
