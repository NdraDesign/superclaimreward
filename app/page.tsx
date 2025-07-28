'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [reward, setReward] = useState<string | null>(null);
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = () => {
    const rewards = ['💰 USDC', '🔥 Mikasa Token', '☣️ Toxic Token', '🥤 Drink Token', '🤖 Mitalik Token'];
    const random = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(random);
    setIsClaimed(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center px-6 py-12 space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">🎁 Claim Your Mystery Crypto Box</h1>
        <p className="text-xl text-gray-300 max-w-xl mx-auto">
          Click the button below to claim a mystery reward — USDC or exclusive tokens like Mikasa, Toxic, Drink, and Mitalik!
        </p>
      </div>

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
