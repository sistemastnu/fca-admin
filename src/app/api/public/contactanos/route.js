import Contactanos from "@/models/Contactanos";
import { NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";

export async function GET() {
  await sequelize.sync();
  try {
    const contactanos = await Contactanos.findOne();
    return NextResponse.json(contactanos);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
