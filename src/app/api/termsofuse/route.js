import sequelize from "@/lib/sequelize";
import TermOfUSe from "@/models/TermsOfUse";
import { NextResponse } from "next/server";

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.json();
    const findOne = await TermOfUSe.findOne();
    if (findOne) {
      await TermOfUSe.update(
        { content: data.content, slugs: "terminos" },
        { where: { id: findOne.id } }
      );
      return NextResponse.json(
        { message: "Terms of use updated" },
        { status: 200 }
      );
    }
    const termOfUSe = await TermOfUSe.create({
      content: data.content,
      slugs: "terminos",
    });
    return NextResponse.json({ message: "Terms of use created", termOfUSe });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function GET() {
  await sequelize.sync();
  try {
    const termOfUSe = await TermOfUSe.findOne();
    return NextResponse.json(termOfUSe);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
