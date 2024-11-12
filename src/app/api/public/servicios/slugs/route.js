import Servicios from "@/models/Servicios";
import { NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";

export const revalidate = 0;

export async function GET() {
  await sequelize.sync();
  try {
    const slugs = await Servicios.findAll({ attributes: ["slug"] });
    return NextResponse.json(slugs);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 200 });
  }
}
