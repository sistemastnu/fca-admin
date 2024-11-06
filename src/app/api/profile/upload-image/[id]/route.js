import { UploadFile } from "@/helpers/files";
import sequelize from "@/lib/sequelize";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const data = await request.formData();
    const file = data.get("image");
    const uploadFile = await UploadFile(file, "profile");
    await User.update(
      {
        profilePhoto: uploadFile.filePath,
      },
      { where: { id } }
    );
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
