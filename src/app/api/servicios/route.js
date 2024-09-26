import sequelize from "@/lib/sequelize";
import Servicios from "@/models/Servicios";
import { NextResponse } from "next/server";

export async function GET(params) {
  await sequelize.sync();
  try {
    const data = await Servicios.findAll();
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
