import sequelize from "@/lib/sequelize";
import TeamNosotros from "@/models/TeamNosotros";
import Nosotros from "@/models/Nosotros";
import Sponsors from "@/models/Sponsors";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const [team, nosotrosInfo, sponsors] = await Promise.all([
      TeamNosotros.findAll(),
      Nosotros.findOne(),
      Sponsors.findAll(),
    ]);
    return NextResponse.json({ team, nosotrosInfo, sponsors });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
