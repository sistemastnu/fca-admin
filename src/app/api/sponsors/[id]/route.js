import sequelize from "@/lib/sequelize";
import Sponsors from "@/models/Sponsors";
import { NextResponse } from "next/server";
import { UploadFile } from "@/helpers/files";

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
    console.log(data);
    const file = data.get("file");
    let filePath;
    let relativePath;

    if (file) {
      const upload = await UploadFile(file, "sponsors");
      filePath = upload.filePath;
      relativePath = upload.relativePath;
    } else {
      filePath = data.get("photoSponsor");
      relativePath = data.get("relativePath");
    }

    const sponsor = await Sponsors.update(
      {
        sponsorName: data.get("sponsorName"),
        photoSponsor: filePath,
      },
      { where: { id: id } }
    );
    return NextResponse.json(sponsor);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
