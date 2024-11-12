import sequelize from "@/lib/sequelize";
import { NextResponse } from "next/server";
import SocialMedia from "@/models/SocialMedia";

export default async function GET(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const socialMedia = await SocialMedia.findOne({ where: { id: id } });
    return NextResponse.json(socialMedia);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
