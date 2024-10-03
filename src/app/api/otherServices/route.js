import sequelize from "@/lib/sequelize";
import OtherServices from "@/models/OtherServices";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sequelize.sync();
    const otherServices = await OtherServices.findAll();
    return NextResponse.json(otherServices);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.json();
    await OtherServices.create(
      {
        title: data.tittle,
        content: data.content,
      },
      { where: { id: data.idService } }
    );
    return NextResponse.json({ status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await sequelize.sync();
    const data = await request.json();
    for (const item in data) {
      await OtherServices.update(
        {
          order: data[item].order,
        },
        {
          where: { id: data[item].id },
        }
      );
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
