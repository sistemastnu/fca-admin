import sequelize from "@/lib/sequelize";
import TermOfUSe from "@/models/TermsOfUse";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const data = await TermOfUSe.findOne();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}