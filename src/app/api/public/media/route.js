import sequelize from "@/lib/sequelize";
import SocialMedia from "@/models/SocialMedia";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  await sequelize.sync();
  try {
    const data = await SocialMedia.findAll({ where: { status: "active" } });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse();
  }
}
