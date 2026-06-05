import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  try {
    if (!API_URL) {
      return NextResponse.json(
        {
          success: false,
          error: "Thiếu NEXT_PUBLIC_API_URL.",
        },
        { status: 500 },
      );
    }

    const payload = await request.json();

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await res.text();

    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: text || "API không trả về JSON hợp lệ.",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Lỗi không xác định.",
      },
      { status: 500 },
    );
  }
}
