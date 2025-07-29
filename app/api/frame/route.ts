// app/api/frame/route.ts
export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="og:title" content="Claim Your Box" />
        <meta property="og:image" content="https://superclaimreward.vercel.app/zora.png" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:button:1" content="Claim Now" />
        <meta name="fc:frame:post_url" content="https://superclaimreward.vercel.app/api/claim" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <p>Claim your reward in Farcaster Frame</p>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
