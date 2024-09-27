import sequelize from "@/lib/sequelize";
import Contactanos from "@/models/Contactanos";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const info = await Contactanos.findOne();
    return NextResponse.json(info, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.json();
    const updated = await Contactanos.update(
      {
        informacionEmp: data.inf,
        ubicacion: data.ubi,
        telefono: data.tel,
        mail: data.mail,
      },
      { where: { id: data.id } }
    );

    return NextResponse.json({ message: updated }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
