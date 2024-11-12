import sequelize from "@/lib/sequelize";
import Servicios from "@/models/Servicios";
import ServiciosPage from "@/models/ServiciosPage";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const searchServiceWithSlug = await Servicios.findOne({
      where: { slug: id },
    });
    const idService = searchServiceWithSlug.id;
    const servicios = await ServiciosPage.findOne({
      where: { idService: idService },
    });
    return NextResponse.json(servicios);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
