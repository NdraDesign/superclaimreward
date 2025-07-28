import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY || "ISI_API_KEY_KAMU_DI_SINI",
  network: Network.BASE_MAINNET,
};

const alchemy = new Alchemy(config);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const address = body.address?.toLowerCase();

    if (!address) {
      return new Response(JSON.stringify({ error: "Address is required" }), { status: 400 });
    }

    // Cek riwayat transaksi yang masuk ke wallet fee
    const history = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      toAddress: "0xB4b681BB5a44d2294E04E0eBB55BA9C0F85D7621",
      fromAddress: address,
      category: ["external"],
    });

    const hasPaid = history.transfers.some((tx) => {
      return parseFloat(tx.value || "0") >= 0.1 && tx.asset === "ETH";
    });

    return Response.json({ success: hasPaid });
  } catch (error) {
    console.error("Error in claim route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
