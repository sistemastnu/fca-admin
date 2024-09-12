import sequelize from "@/lib/sequelize";
import Opinions from "@/models/Opinion";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const users = await Opinions.findAll();
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
