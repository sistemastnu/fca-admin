import { UploadFile } from "@/helpers/files";
import sequelize from "@/lib/sequelize";
import ServiciosEspePage from "@/models/ServiciosEspecializadosPage";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await sequelize.sync();
  try {
    const idService = params.id;
    console.log(params.id);
    const serviciosPage = await ServiciosEspePage.findOne({
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
      const uploadFile = await UploadFile(file, "serviciosEspePage");
      filePath = uploadFile.filePath;
    }
    const newServicePage = await ServiciosEspePage.create({
      idService: idService,
      tittle: data.get("tittle"),
      content: data.get("content"),
      mediaContent: filePath,
    });
    return NextResponse.json(newServicePage);
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
      const uploadFile = await UploadFile(file, "serviciosEspePage");
      filePath = uploadFile.filePath;
    } else {
      filePath = data.get("imagePage");
    }
    await ServiciosEspePage.update(
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
