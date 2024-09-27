import sequelize from "@/lib/sequelize";
import Servicios from "@/models/Servicios";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const data = await Servicios.findAll();
    const jsonData = data.map((item) => item.get({ plain: true }));
    return NextResponse.json(jsonData, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
