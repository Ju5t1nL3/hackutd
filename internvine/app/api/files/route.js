import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Create form data for Pinata
    const formData = new FormData();
    formData.append("file", file);

    // Upload to Pinata
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Failed to upload to Pinata: ${res.statusText}`);
    }

    const uploadData = await res.json();

    // Create signed URL
    const url = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${uploadData.IpfsHash}`;
    
    return NextResponse.json({ url }, { status: 200 });
  } catch (e) {
    console.error('Upload error:', e);
    return NextResponse.json(
      { error: "Internal Server Error", details: e.message },
      { status: 500 }
    );
  }
}