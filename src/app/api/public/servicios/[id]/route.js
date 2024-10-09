import sequelize from "@/lib/sequelize";
import ServiciosPage from "@/models/ServiciosPage";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const servicios = await ServiciosPage.findOne({
      where: { idService: id },
    });
    return NextResponse.json(servicios);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
