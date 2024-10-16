import { UploadFile } from "@/helpers/files";
import sequelize from "@/lib/sequelize";
import OtherServices from "@/models/OtherServices";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sequelize.sync();
    const otherServices = await OtherServices.findAll();
    return NextResponse.json(otherServices);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.formData();
    const file = data.get("file");
    let filePath;
    let relativePath;
    if (file) {
      const uploadFile = await UploadFile(file, "servicios");
      filePath = uploadFile.filePath;
      relativePath = uploadFile.relativePath;
    } else {
      relativePath = data.get("relativePath");
      filePath = data.get("photo");
    }

    await OtherServices.update(
      {
        title: data.get("tittle"),
        content: data.get("content"),
        photo: filePath,
        relativePath: relativePath,
      },
      { where: { id: data.get("idService") } }
    );
    return NextResponse.json({ status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await sequelize.sync();
    const data = await request.json();
    for (const item in data) {
      await OtherServices.update(
        {
          order: data[item].order,
        },
        {
          where: { id: data[item].id },
        }
      );
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
