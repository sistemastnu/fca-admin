import sequelize from "@/lib/sequelize";
import Nosotros from "@/models/Nosotros";
import Sponsors from "@/models/Sponsors";
import TeamNosotros from "@/models/TeamNosotros";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sequelize.sync();
    const nosotrosInfo = await Nosotros.findOne();
    const sponsors = await Sponsors.findAll();
    const teamNosotros = await TeamNosotros.findAll();
    const data = {
      nosotrosInfo,
      sponsors,
      teamNosotros,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await sequelize.sync();
  } catch (error) {}
}
