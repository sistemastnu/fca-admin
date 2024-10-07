import sequelize from "@/lib/sequelize";
import FirstPageContent from "@/models/FirstPageContent";
import { NextResponse } from "next/server";
import { where } from "sequelize";

export async function POST(request) {
  await sequelize.sync();
  const data = await request.json();
  try {
    const first = await FirstPageContent.findOne();
    console.log(first);
    if (!first) {
      const created = await FirstPageContent.create(data);
      return NextResponse.json(created);
    }
    const updated = await first.update(data, { where: { id: data.id } });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  await sequelize.sync();
  try {
    const firstPageContent = await FirstPageContent.findOne();
    return NextResponse.json(firstPageContent);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
