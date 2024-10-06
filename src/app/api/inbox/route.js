import sequelize from "@/lib/sequelize";
import Messages from "@/models/Messages";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const messages = await Messages.findAll();
    return NextResponse.json(messages);
  } catch (e) {
    return NextResponse.json({});
  }
}

export async function POST(request) {}
