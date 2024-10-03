import sequelize from "@/lib/sequelize";
import Sponsors from "@/models/Sponsors";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await sequelize.sync();
    const id = params.id;
    const contentType = request.headers.get("Content-Type");
    if (contentType.includes("application/json")) {
      const data = await request.json();
      const changeStatus = data.changeStatus;
      if (changeStatus) {
        await Sponsors.update(
          {
            status: changeStatus == "active" ? "disabled" : "active",
          },
          { where: { id: id } }
        );
        return NextResponse.json({ status: 200 });
      }
    }
    const data = await request.formData();
    const directory = "public/assets/";
    const file = data.get("photoUrl");
    let filePath;
    if (!file) {
      return NextResponse.json(
        { message: "Not File Received" },
        { status: 500 }
      );
    }

    if (typeof file === "string") {
      filePath = file;
    } else if (file instanceof File || file instanceof Blob) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replaceAll(" ", "_");
      filePath = path.join(process.cwd(), directory + filename);
      await writeFile(filePath, buffer);
    }

    const sponsor = await Sponsors.update(
      {
        name: data.get("name"),
        descriptions: data.get("descriptions"),
        photoUrl: filePath,
        status: "active",
        position: data.get("position"),
      },
      { where: { id: id } }
    );
    return NextResponse.json(sponsor);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
