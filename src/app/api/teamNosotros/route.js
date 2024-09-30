import sequelize from "@/lib/sequelize";
import TeamNosotros from "@/models/TeamNosotros";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request) {
  try {
    await sequelize.sync();
    const data = await request.formData();
    const directory = "public/assets/";
    const file = data.get("photoUrl");
    if (!file) {
      return NextResponse.json(
        { message: "Not File Received" },
        { status: 500 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(" ", "_");
    const filePath = path.join(process.cwd(), directory + filename);
    await writeFile(filePath, buffer);

    const teamNosotros = await TeamNosotros.create({
      name: data.get("name"),
      descriptions: data.get("descriptions"),
      photoUrl: filePath,
      status: "active",
      position: data.get("position"),
    });

    return NextResponse.json(teamNosotros, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await sequelize.sync();
    const id = params.id;
    const data = await request.json();
    const changeStatus = data.changeStatus;
    if (changeStatus) {
      await TeamNosotros.update(
        {
          status: changeStatus == "active" ? "disabled" : "active",
        },
        { where: { id: id } }
      );
    }
  } catch (e) {
    NextResponse.json({ message: e.message }, { status: 500 });
  }
}
