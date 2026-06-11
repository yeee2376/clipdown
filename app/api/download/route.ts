import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    console.log("Received URL:", url);

    if (!url || !url.includes("tiktok.com")) {
      return NextResponse.json(
        { error: "Please provide a valid TikTok URL" },
        { status: 400 }
      );
    }

    const response = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: `url=${encodeURIComponent(url)}&hd=1`,
    });

    const data = await response.json();
    console.log("Tikwm response:", JSON.stringify(data));

    if (data.code !== 0) {
      return NextResponse.json(
        { error: "Could not fetch video. Try again." },
        { status: 500 }
      );
    }

    const video = data.data;

    return NextResponse.json({
      status: "success",
      data: {
        title: video.title || "TikTok Video",
        cover: video.cover || null,
        videoNoWatermark: video.hdplay || video.play || null,
        videoHD: video.hdplay || null,
        audio: video.music || null,
        author: video.author?.nickname || null,
        duration: video.duration || null,
      },
    });

  } catch (error: any) {
    console.error("Download error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}