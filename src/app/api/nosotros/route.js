import sequelize from "@/lib/sequelize";
import Nosotros from "@/models/Nosotros";
import Sponsors from "@/models/Sponsors";
import TeamNosotros from "@/models/TeamNosotros";
import { NextResponse } from "next/server";
import { UploadFile } from "@/helpers/files";

export async function GET() {
  try {
    await sequelize.sync();
    const nosotrosInfo = await Nosotros.findOne();
    const sponsors = await Sponsors.findAll();
    const teamNosotros = await TeamNosotros.findAll();
    const data = {
      nosotrosInfo,
      sponsors,
      teamNosotros,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.formData();
    console.log(data);
    const file = await data.get("file");
    let filePath;
    let relativePath;
    if (file) {
      const upload = await UploadFile(file, "nosotros");
      filePath = upload.filePath;
      relativePath = upload.relativePath;
    } else {
      filePath = data.get("photoUrl");
      relativePath = data.get("relativePath");
    }
    const nosotros = await Nosotros.create({
      tittle: data.get("tittle"),
      content: data.get("content"),
      photoUrl: filePath,
      relativePath: relativePath,
    });
    return NextResponse.json(nosotros, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  await sequelize.sync(request);
  try {
    const data = await request.formData();
    const file = await data.get("file");
    let filePath;
    let relativePath;
    if (file) {
      const upload = await UploadFile(file, "nosotros");
      filePath = upload.filePath;
      relativePath = upload.relativePath;
    } else {
      filePath = data.get("photoUrl");
      relativePath = data.get("relativePath");
    }
    await Nosotros.update(
      {
        tittle: data.get("tittle"),
        content: data.get("content"),
        photoUrl: filePath,
        relativePath: relativePath,
      },
      { where: { id: data.get("id") } }
    );
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
