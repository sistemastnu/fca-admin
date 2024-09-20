import { NextResponse } from "next/server";
export async function GET() {
  try {
    const [response1, response2] = await Promise.all([]);
    const data1 = await response1.json();
    const data2 = await response2.json();
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 200,
      }
    );
  }
}
