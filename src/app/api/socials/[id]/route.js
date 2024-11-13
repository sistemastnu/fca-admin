import sequelize from "@/lib/sequelize";
import { NextResponse } from "next/server";
import SocialMedia from "@/models/SocialMedia";
import { where } from "sequelize";
import { UploadFile } from "@/helpers/files";

export async function GET(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const socialMedia = await SocialMedia.findOne({ where: { id: id } });
    return NextResponse.json(socialMedia);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const data = await request.formData();
    const icon = data.get("icon");
    let upIcon;
    if (typeof icon === "string") {
      upIcon = data.get("icon");
    } else {
      const uploadIcon = UploadFile(icon, "socials");
      upIcon = uploadIcon.filePath;
    }

    await SocialMedia.update(
      {
        name: data.get("name"),
        link: data.get("link"),
        icon: upIcon,
      },
      { where: { id: id } }
    );
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const getSocial = await SocialMedia.findOne({ where: { id: id } });
    await SocialMedia.update(
      {
        status: getSocial.status == "active" ? "inactive" : "active",
      },
      { where: { id: getSocial.id } }
    );
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
