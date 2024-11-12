import { cleanStringForURL } from "@/app/helpers/StringHelper";
import { UploadFile } from "@/helpers/files";
import sequelize from "@/lib/sequelize";
import Servicios from "@/models/Servicios";
import ServiciosPage from "@/models/ServiciosPage";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await sequelize.sync();
  try {
    const idService = params.id;
    console.log(params.id);
    const serviciosPage = await ServiciosPage.findOne({
      where: { idService: idService },
    });
    return NextResponse.json(serviciosPage);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  await sequelize.sync();
  try {
    const idService = params.id;
    const data = await request.formData();
    const file = await data.get("file");
    let filePath;
    if (file) {
      const uploadFile = await UploadFile(file, "serviciosPage");
      filePath = uploadFile.filePath;
    }
    const slug = cleanStringForURL(data.get("tittle"));
    const existingService = await Servicios.findOne({
      attributes: ["slug"],
      where: { id: idService },
    });
    const newServicePage = await ServiciosPage.create({
      idService: idService,
      tittle: data.get("tittle"),
      slug: slug,
      content: data.get("content"),
      mediaContent: filePath,
    });
    return NextResponse.json(newServicePage, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const data = await request.formData();
    const file = await data.get("file");
    let filePath;
    if (file) {
      const uploadFile = await UploadFile(file, "serviciosPage");
      filePath = uploadFile.filePath;
    } else {
      filePath = data.get("imagePage");
    }
    await ServiciosPage.update(
      {
        tittle: data.get("tittle"),
        content: data.get("content"),
        mediaContent: filePath,
      },
      { where: { idService: id } }
    );
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
