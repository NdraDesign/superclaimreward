import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

// Wallet tujuan fee 0.1 ETH
const FEE_RECEIVER = '0xB4b681BB5a44d2294E04E0eBB55BA9C0F85D7621';
const MIN_FEE = ethers.utils.parseEther('0.1'); // 0.1 ETH

// Alchemy Base Mainnet provider
const provider = new ethers.providers.JsonRpcProvider('https://base-mainnet.g.alchemy.com/v2/WoUhKTn3B3X6vENI_OyH4');

export async function POST(req: Request) {
  const body = await req.json();
  const { address } = body;

  if (!ethers.utils.isAddress(address)) {
    return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
  }

  // Ambil history transaksi dari address tersebut
  const history = await provider.getHistory(address);

  // Cek apakah ada transaksi ke wallet fee dengan min 0.1 ETH
  const hasPaid = history.some((tx) => {
    return (
      tx.to?.toLowerCase() === FEE_RECEIVER.toLowerCase() &&
      tx.value.gte(MIN_FEE)
    );
  });

  if (!hasPaid) {
    return NextResponse.json({ error: 'Please send 0.1 ETH to claim reward' }, { status: 403 });
  }

  // Kalau sudah bayar → kasih reward acak
  const rewards = ['💰 USDC', '🔥 Mikasa Token', '☣️ Toxic Token', '🥤 Drink Token', '🤖 Mitalik Token'];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];

  return NextResponse.json({ reward });
}
