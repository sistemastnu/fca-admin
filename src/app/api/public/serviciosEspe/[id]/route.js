import ServiciosEspePage from "@/models/ServiciosEspecializadosPage";
import { NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";

export async function GET(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const serviciosEspePage = await ServiciosEspePage.findOne({
      where: { idService: id },
    });
    return NextResponse.json(serviciosEspePage);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
