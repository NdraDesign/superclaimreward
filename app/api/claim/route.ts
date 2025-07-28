import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Simulasi pengambilan reward acak
  const rewards = ['💰 USDC', '🔥 Mikasa Token', '☣️ Toxic Token', '🥤 Drink Token', '🤖 Mitalik Token'];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];

  // Return reward sebagai JSON
  return NextResponse.json({ reward });
}
