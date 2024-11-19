import sequelize from "@/lib/sequelize";
import Privacity from "@/models/Privacidad";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  await sequelize.sync();
  try {
    const data = await Privacity.findOne();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
