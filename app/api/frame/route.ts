// app/api/frame/route.ts
export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Claim Your Box</title>
        <meta property="og:title" content="🎁 Claim Your Reward Box" />
        <meta property="og:image" content="https://superclaimreward.vercel.app/zora.png" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://superclaimreward.vercel.app/zora.png" />
        <meta name="fc:frame:button:1" content="Claim Reward" />
        <meta name="fc:frame:post_url" content="https://superclaimreward.vercel.app/api/claim" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            background: linear-gradient(to bottom right, #000, #1a1a1a);
            color: white;
            font-family: sans-serif;
            text-align: center;
            padding: 40px;
          }
          .logo {
            opacity: 0.8;
            margin-bottom: 20px;
          }
          h1 {
            font-size: 24px;
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { opacity: 0.8; }
            50% { opacity: 1; }
            100% { opacity: 0.8; }
          }
        </style>
      </head>
      <body>
        <img src="https://superclaimreward.vercel.app/zora.png" alt="Zora" width="80" class="logo" />
        <h1>🎁 Claim Your Reward Box</h1>
        <p>Klaim hadiah kamu dari SuperClaim Event!</p>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
