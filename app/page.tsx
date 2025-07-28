'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [reward, setReward] = useState<string | null>(null);

  const handleClaim = async () => {
    // Simulasi reward sementara (nanti diganti API)
    const rewards = ['💰 USDC', '🔥 Mikasa', '☣️ Toxic', '🥤 Drink', '🤖 Mitalik'];
    const random = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(random);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center">🎁 Claim Your Crypto Box</h1>

      <p className="text-lg md:text-xl text-gray-300 text-center max-w-xl">
        Get a random reward — it could be USDC or one of our special tokens: Mikasa, Toxic, Drink, or Mitalik.
      </p>

      <button
        onClick={handleClaim}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition"
      >
        🚀 Claim Now
      </button>

      {reward && (
        <div className="text-2xl text-green-400 font-bold animate-pulse">
          You got: {reward} 🎉
        </div>
      )}

      <Link
        href="https://warpcast.com/~/compose?text=Claim%20your%20box%20and%20get%20special%20token%20or%20USDC"
        target="_blank"
        className="mt-4 underline text-blue-400 hover:text-blue-300"
      >
        🔄 Share this on Warpcast
      </Link>
    </main>
  );
}
