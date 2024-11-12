import sequelize from "@/lib/sequelize";
import SocialMedia from "@/models/SocialMedia";
import { NextResponse } from "next/server";

export default async function GET() {
  await sequelize.sync();
  try {
    const socialMedia = await SocialMedia.findAll();
    return NextResponse.json(socialMedia);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
