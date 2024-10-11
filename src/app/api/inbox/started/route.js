import sequelize from "@/lib/sequelize";
import Messages from "@/models/Messages";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const messages = await Messages.findAll({ where: { label: "started" } });
    return NextResponse.json(messages);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
