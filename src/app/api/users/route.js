import sequelize from "@/lib/sequelize";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  await sequelize.sync();
  try {
    const users = await User.findAll();
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
