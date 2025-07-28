'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [address, setAddress] = useState('');
  const [reward, setReward] = useState<string | null>(null);
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = async () => {
    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      alert('Please enter a valid wallet address.');
      return;
    }

    const res = await fetch('/api/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });

    const data = await res.json();
    setReward(data.reward);
    setIsClaimed(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center px-6 py-12 space-y-8">
      <div className="flex flex-col items-center space-y-3 text-center">
        <h1 className="text-5xl font-extrabold animate-fade-in">🎁 Claim Your Mystery Crypto Box</h1>
        <div className="flex items-center space-x-2 text-gray-300 text-sm">
          <img src="/zora.png" alt="Zora logo" className="w-5 h-5 rounded-sm" />
          <span className="opacity-80">Part of Zora Event</span>
        </div>
      </div>

      <p className="text-lg text-gray-300 max-w-xl text-center">
        Enter your Base wallet address to claim your reward.
      </p>

      {/* Address Input */}
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="0x..."
        className="w-full max-w-md px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 placeholder-gray-500"
      />

      {!isClaimed && (
        <button
          onClick={handleClaim}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl text-xl font-semibold shadow-lg transition transform hover:scale-105"
        >
          🚀 Claim Now
        </button>
      )}

      {reward && (
        <div className="text-3xl font-bold text-green-400 animate-bounce">
          🎉 You received: {reward}
        </div>
      )}

      <Link
        href="https://warpcast.com/~/compose?text=Claim%20your%20box%20and%20get%20special%20token%20or%20USDC"
        target="_blank"
        className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow-md transition"
      >
        🔗 Share on Warpcast
      </Link>
    </main>
  );
      }
