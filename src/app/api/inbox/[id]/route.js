import Messages from "@/models/Messages";
import { NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";

export async function GET(request, { params }) {
  try {
    await sequelize.sync();
    const { id } = params;
    const message = await Messages.findByPk(id);
    return NextResponse.json(message);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
