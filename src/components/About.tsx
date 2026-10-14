import React from 'react';
import { useNavigate } from 'react-router';

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="w-screen rounded-2xl max-w-full min-h-[100dvh] bg-white text-gray-900 flex flex-col font-sans overflow-x-hidden selection:bg-purple-200">

      {/* 🚀 HERO SECTION */}
      <section className="relative px-6 py-20 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto z-10">
        {/* Subtle Ambient Color Blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 left-1/3 w-60 h-60 bg-green-400/10 rounded-full blur-3xl -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-100 bg-purple-50/50 text-xs font-semibold text-purple-700 mb-6 backdrop-blur-xs animate-fade-in">
          <span>🔒</span> Private, Serverless Mentality
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight">
          Your conversations belong to <span className="bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent">you.</span> Not us.
        </h1>

        <p className="mt-6 text-base md:text-lg font-medium text-gray-500 max-w-2xl leading-relaxed">
          We built a platform where security isn't a premium feature toggle—it's the baseline. Connect, exchange, and chat with absolute digital solitude across web and mobile.
        </p>
      </section>

      {/* 🛠️ THE CORE VALUES */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Value 1 */}
        <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-purple-200 transition-all group">
          <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg font-bold mb-4 group-hover:scale-105 transition-transform">
            🔑
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Zero-Knowledge Architecture</h3>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            Your cryptographic keys never leave your local device storage. We cannot read your text records, intercept files, or sell metadata because we literally don't hold the keys to open them.
          </p>
        </div>

        {/* Value 2 */}
        <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-green-200 transition-all group">
          <div className="h-10 w-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-lg font-bold mb-4 group-hover:scale-105 transition-transform">
            📱
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Universal Continuity</h3>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            Seamlessly pivot your conversations from your home workstation web window to your smartphone app. Secure end-to-end loops follow your personal user identities layout instantly.
          </p>
        </div>

        {/* Value 3 */}
        <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-purple-200 transition-all group">
          <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-lg font-bold mb-4 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Zero Friction Channels</h3>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            No heavy setups, phone number requirements, or bloated tracking pixels. Enter a unique handle, open an encrypted loop, and start real-time interaction right away.
          </p>
        </div>

      </section>

      {/* 📖 OUR MISSION PARALLAX STYLE ACCENT */}
      <section className="w-full bg-gradient-to-br from-zinc-900 to-black text-white px-6 py-16 md:py-24 my-12 relative overflow-hidden">
        {/* Visual accents referencing your messages view gradient */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-tl from-purple-900/20 to-green-500/10 pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">Why we built this app</h2>
            <p className="text-xs md:text-sm text-zinc-400 font-medium leading-relaxed">
              Modern digital messaging networks became data brokers first and privacy spaces second. We created this space to strip away commercial surveillance, returning text messaging to its purest form: secure, direct, and intimate talking threads between friends.
            </p>
          </div>
          <div className="shrink-0 flex gap-3 bg-zinc-800/40 p-4 rounded-2xl border border-zinc-700/30 backdrop-blur-md">
            <div className="flex flex-col text-center px-4">
              <span className="text-2xl font-black text-purple-400">100%</span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Encrypted</span>
            </div>
            <div className="w-[1px] bg-zinc-700/50 self-stretch" />
            <div className="flex flex-col text-center px-4">
              <span className="text-2xl font-black text-green-400">0</span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Logs Kept</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🤝 CALL TO ACTION / FOOTER */}
      <section className="px-6 py-12 max-w-3xl mx-auto text-center mt-auto w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to open a channel?</h3>
        <p className="text-xs text-gray-400 font-medium mb-6">Launch your secure dashboard dashboard room stack and coordinate privately with contacts today.</p>
        <button onClick={() => navigate("/messages")} className="h-10 px-6 rounded-xl bg-black text-white text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer shadow-sm">
        Go to Messenger
      </button>
      <div className="border-t border-gray-100 mt-12 pt-6 text-[10px] font-medium text-gray-400">
        &copy; {new Date().getFullYear()} Your App Name. All structural transmission loops secured with end-to-end standard protocols.
      </div>
    </section>

    </div >
  );
}
