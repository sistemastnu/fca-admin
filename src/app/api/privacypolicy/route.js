import sequelize from "@/lib/sequelize";
import Privacity from "@/models/Privacidad";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const data = await Privacity.findOne();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.json();
    const findOne = await Privacity.findOne();
    if (findOne) {
      await findOne.update(
        { content: data.content },
        { where: { id: findOne.id } }
      );
      return NextResponse.json({ message: "Update Success" }, { status: 200 });
    }
    await Privacity.create({ content: data.content });
    return NextResponse.json({ message: "Created Success" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
