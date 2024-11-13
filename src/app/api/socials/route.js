import { UploadFile } from "@/helpers/files";
import sequelize from "@/lib/sequelize";
import SocialMedia from "@/models/SocialMedia";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const socialMedia = await SocialMedia.findAll();
    return NextResponse.json(socialMedia);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.formData();
    const file = data.get("icon");
    const uploadFile = await UploadFile(file, "socials");

    await SocialMedia.create({
      name: data.get("title"),
      icon: uploadFile.filePath,
      status: "active",
      link: data.get("link"),
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
