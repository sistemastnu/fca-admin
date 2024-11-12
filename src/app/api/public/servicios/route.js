import sequelize from "@/lib/sequelize";
import Servicios from "@/models/Servicios";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  await sequelize.sync();
  try {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    });
    const servicios = await Servicios.findAll({
      attributes: ["slug", "title"],
    });
    return NextResponse.json(servicios);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// Manejar la solicitud OPTIONS para el preflight CORS
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
