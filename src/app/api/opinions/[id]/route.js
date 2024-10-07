import sequelize from "@/lib/sequelize";
import Opinions from "@/models/Opinion";
import { UploadFile } from "@/helpers/files";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    console.log(id);
    const opinion = await Opinions.findByPk(id);
    return NextResponse.json(opinion);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const data = await request.formData();
    const file = data.get("photo");
    let relativePath;
    let path;
    if (typeof file === "object") {
      const uploadFile = await UploadFile(file, "opinions");
      relativePath = uploadFile.relativePath;
      path = uploadFile.filePath;
    } else {
      relativePath = data.get("relativePath");
      path = data.get("photo");
    }
    const updateDate = {
      name: data.get("name"),
      descriptions: data.get("description"),
      position: data.get("position"),
      photo: path,
      relativePath: relativePath,
    };

    await Opinions.update(updateDate, { where: { id } });
    return NextResponse.json(
      { message: "Opinion updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
