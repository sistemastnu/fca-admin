import sequelize from "@/lib/sequelize";
import ServiciosPage from "@/models/ServiciosPage";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const serviciosPage = await ServiciosPage.findOne();
    return NextResponse.json(serviciosPage);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {}
