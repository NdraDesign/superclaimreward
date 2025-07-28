import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

// 🔐 Env
const ALCHEMY_KEY = process.env.ALCHEMY_API_KEY!;
const RPC_URL = process.env.ALCHEMY_RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

// 🎯 Konfigurasi
const alchemy = new Alchemy({ apiKey: ALCHEMY_KEY, network: Network.BASE_MAINNET });
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const TOKEN_LIST = [
  {
    name: "Mikasa",
    address: "0xcf0403dfe22de14e0091ebbb2f497846bc52810e",
    amount: "1000",
    decimals: 18,
  },
  {
    name: "Toxic",
    address: "0xf814f1de68e78e5c1962875e1c122ff4c8321c6d",
    amount: "100",
    decimals: 18,
  },
  {
    name: "Drink",
    address: "0xb9d2bb5c3aaa3764fa506236a31b359fe37c6232",
    amount: "5",
    decimals: 18,
  },
  {
    name: "Mitalik",
    address: "0xb57ba0c63324817157d0c9afcd6276fd8f67ca3a",
    amount: "4",
    decimals: 18,
  },
];

// Fungsi pilih reward random
function getRandomReward() {
  const randomIndex = Math.floor(Math.random() * TOKEN_LIST.length);
  return TOKEN_LIST[randomIndex];
}

// Fungsi kirim token
async function sendToken(to: string) {
  const reward = getRandomReward();
  const abi = ["function transfer(address to, uint amount) returns (bool)"];
  const contract = new ethers.Contract(reward.address, abi, wallet);
  const amount = ethers.utils.parseUnits(reward.amount, reward.decimals);

  const tx = await contract.transfer(to, amount);
  await tx.wait();

  return {
    name: reward.name,
    txHash: tx.hash,
    amount: reward.amount,
  };
}

// ✅ Handler utama
export async function POST(req: Request) {
  try {
    const { address } = await req.json();
    if (!address) return new Response(JSON.stringify({ error: "No address" }), { status: 400 });

    // ✅ Cek apakah sudah bayar fee 0.1 ETH
    const transfers = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: address,
      toAddress: "0xB4b681BB5a44d2294E04E0eBB55BA9C0F85D7621",
      category: ["external"],
    });

    const hasPaid = transfers.transfers.some(
      (tx) => tx.asset === "ETH" && parseFloat(tx.value || "0") >= 0.1
    );

    if (!hasPaid) {
      return new Response(JSON.stringify({ success: false, message: "Fee not paid" }), { status: 403 });
    }

    // ✅ Kirim reward
    const reward = await sendToken(address.toLowerCase());

    return new Response(
      JSON.stringify({
        success: true,
        reward: reward.name,
        amount: reward.amount,
        txHash: reward.txHash,
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
                                         }
