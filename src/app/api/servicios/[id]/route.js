import { UploadFile } from "@/helpers/files";
import sequelize from "@/lib/sequelize";
import Servicios from "@/models/Servicios";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const servicios = await Servicios.findByPk(id);
    return NextResponse.json(servicios, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    console.log(id);
    const data = await request.formData();
    const file = data.get("file");
    let filePath;
    let relativePath;
    if (file) {
      const uploadFile = await UploadFile(file, "servicios/page");
      filePath = uploadFile.filePath;
      relativePath = uploadFile.relativePath;
    } else {
      filePath = data.get("imagePage");
      relativePath = data.get("relativePath");
    }
    await Servicios.update(
      {
        contentPage: data.get("contentPage"),
        imagePage: filePath,
      },
      { where: { id: id } }
    );
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
