import React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="w-full max-w-5xl mx-auto text-center space-y-16 py-12 px-4">
      
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Security Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-semibold shadow-sm animate-pulse">
          <span>🛡️</span>
          <span>Military-Grade End-to-End Encryption</span>
        </div>

        {/* Main Value Proposition */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Your Words. <br className="sm:hidden" />
          <span className="text-gray-900">Your Privacy.</span> <br />
          Completely Secured.
        </h1>

        {/* Subtext description */}
        <p className="text-lg sm:text-xl font-medium text-white/90 max-w-2xl mx-auto leading-relaxed">
          Text It is built from the ground up to protect your digital conversations. We don't read your logs, store your encryption keys, or sell your meta-data. Ever.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            to="/register" 
            className="w-full sm:w-auto bg-gray-950 text-white font-semibold text-base rounded-xl px-8 py-3.5 hover:bg-gray-800 transition-colors cursor-pointer shadow-lg text-center"
          >
            Start Texting Safely
          </Link>
          <Link 
            to="/login" 
            className="w-full sm:w-auto bg-white/90 backdrop-blur-md text-gray-900 border border-white/40 font-semibold text-base rounded-xl px-8 py-3.5 hover:bg-white transition-colors cursor-pointer shadow-lg text-center"
          >
            Sign In to Account
          </Link>
        </div>
      </div>

      {/* Feature Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        
        {/* Feature 1 */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 text-left space-y-3">
          <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
            🔐
          </div>
          <h3 className="text-lg font-black text-gray-900">Zero-Knowledge Storage</h3>
          <p className="text-sm font-medium text-gray-600 leading-relaxed">
            Your chat data is fully encrypted *before* it leaves your machine. Even if someone intercepts it, it reads as complete gibberish.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 text-left space-y-3">
          <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
            💥
          </div>
          <h3 className="text-lg font-black text-gray-900">Self-Destructing Logs</h3>
          <p className="text-sm font-medium text-gray-600 leading-relaxed">
            Take absolute control over your messaging footprints. Set automatic timers to completely wipe chat histories across all target devices.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 text-left space-y-3">
          <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
            🕵️
          </div>
          <h3 className="text-lg font-black text-gray-900">No Tracking Identifiers</h3>
          <p className="text-sm font-medium text-gray-600 leading-relaxed">
            We do not log your real phone numbers, tracking cookies, or network IP address locations. Sign up completely anonymously.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;
