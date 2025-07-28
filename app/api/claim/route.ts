import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { address } = body;

  console.log('Wallet address received:', address);

  // Simulasi pengambilan reward
  const rewards = ['💰 USDC', '🔥 Mikasa Token', '☣️ Toxic Token', '🥤 Drink Token', '🤖 Mitalik Token'];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];

  return NextResponse.json({ reward });
}
