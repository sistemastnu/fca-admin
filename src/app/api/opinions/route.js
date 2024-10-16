import { UploadFile } from "@/helpers/files";
import sequelize from "@/lib/sequelize";
import Opinions from "@/models/Opinion";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const opinions = await Opinions.findAll();
    return NextResponse.json(opinions);
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.formData();
    const file = data.get("photo");

    const uploadFile = await UploadFile(file, "opinions");
    await Opinions.create({
      name: data.get("name"),
      position: data.get("position"),
      descriptions: data.get("description"),
      photo: uploadFile.filePath,
      relativePath: uploadFile.relativePath,
      stars: "5",
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
