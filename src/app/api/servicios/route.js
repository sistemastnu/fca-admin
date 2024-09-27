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

export async function PUT(request) {
  await sequelize.sync();
  try {
    const data = await request.json();

    for (const item in data) {
      await Servicios.update(
        {
          order: data[item].order,
        },
        {
          where: { id: data[item].id },
        }
      );
    }

    return NextResponse.json({ status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.json();
    const newService = await Servicios.update(data);
    return NextResponse.json(newService.get({ plain: true }), { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
