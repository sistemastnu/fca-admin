import sequelize from "@/lib/sequelize";
import Inbox from "@/app/inbox/page";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const inbox = await Inbox.findAll();
    return NextResponse.json(inbox);
  } catch (e) {
    return NextResponse.json({});
  }
}

export async function POST(request) {}
