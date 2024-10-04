import sequelize from "@/lib/sequelize";
import Sponsors from "@/models/Sponsors";
import { NextResponse } from "next/server";
import { UploadFile } from "@/helpers/files";

export async function POST(request) {
  try {
    await sequelize.sync();
    const data = await request.formData();
    const file = data.get("file");
    const fileUploaded = await UploadFile(file, "sponsors");

    const sponsors = await Sponsors.create({
      sponsorName: data.get("sponsorName"),
      photoSponsor: fileUploaded.filePath,
      relativePath: fileUploaded.relativePath,
      status: "active",
    });

    return NextResponse.json(sponsors, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await sequelize.sync();
    const id = params.id;
    const contentType = request.headers.get("Content-Type");
    console.log(contentType);
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
      }
    }
  } catch (e) {
    NextResponse.json({ message: e.message }, { status: 500 });
  }
}
