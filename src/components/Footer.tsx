import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // 🛠️ CHANGED: Removed 'fixed bottom-0 left-0 z-50' and switched to a normal, static block layout
    <footer className="w-full bg-zinc-950 border-t border-zinc-800 px-6 py-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand Name & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gradient-to-br from-purple-600 to-green-500 rounded-lg flex items-center justify-center shadow-xs">
              <span className="text-white font-black text-xs tracking-tighter">T</span>
            </div>
            <span className="text-md font-black text-white tracking-tight">Text It</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            &copy; {currentYear} Text It. All rights reserved.
          </p>
        </div>

        {/* Center Side: Trust Badge */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800/80">
          <span className="text-green-400">🛡️</span>
          <span>Your data is 100% encrypted & never shared.</span>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex items-center gap-6 text-xs font-medium text-zinc-400">
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link to="/security" className="hover:text-white transition-colors">
            Security Practices
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
