import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    return NextResponse.json({ message: "Data received", data });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
