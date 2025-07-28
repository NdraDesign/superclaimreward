"use client";

import { useState } from "react";
import { claimReward } from "@/lib/claim";
import { useAccount } from "wagmi";
import Image from "next/image";

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const [status, setStatus] = useState("");
  const [reward, setReward] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleClaim = async () => {
    if (!isConnected || !address) {
      setStatus("Wallet not connected.");
      return;
    }

    setLoading(true);
    setStatus("⏳ Memeriksa fee & memproses klaim...");
    const result = await claimReward(address);
    setLoading(false);

    if (result.success) {
      setReward(result);
      setStatus(`🎉 Kamu dapat ${result.reward} (${result.amount})`);
    } else {
      setStatus(result.message || "❌ Gagal klaim.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-black to-gray-900 text-white">
      {/* Logo Zora */}
      <div className="mb-6">
        <Image
          src="/zora-logo.png" // pastikan kamu simpan logo ini di `public/zora-logo.png`
          alt="Zora Logo"
          width={80}
          height={80}
          className="opacity-80"
        />
      </div>

      {/* Judul */}
      <h1 className="text-3xl font-bold mb-4 animate-pulse">🎁 Claim Your Reward Box</h1>

      {/* Tombol Klaim */}
      <button
        onClick={handleClaim}
        disabled={loading}
        className={`px-6 py-3 rounded-lg text-lg font-medium transition ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? "Processing..." : "Claim Reward"}
      </button>

      {/* Status & Loading */}
      {status && <p className="mt-4 text-sm text-center">{status}</p>}

      {/* Spinner */}
      {loading && (
        <div className="mt-6 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      )}

      {/* Link Transaksi */}
      {reward?.txHash && (
        <a
          href={`https://basescan.org/tx/${reward.txHash}`}
          target="_blank"
          className="mt-4 text-blue-400 underline"
        >
          🔗 Lihat Transaksi di BaseScan
        </a>
      )}
    </main>
  );
                }
