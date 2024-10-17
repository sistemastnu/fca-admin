import { UploadFile } from "@/helpers/files";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const data = await request.formData();
    const file = data.get("upload");
    const uploadFile = await UploadFile(file, "posts");
    console.log(file);
    return NextResponse.json({ url: uploadFile.filePath });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
