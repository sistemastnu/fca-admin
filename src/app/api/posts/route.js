import { UploadFile } from "@/helpers/files";
import sequelize from "@/lib/sequelize";
import { Posts } from "@/models/associations/associations";
import { Tags } from "@/models/associations/associations";

import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const posts = await Posts.findAll();
    return NextResponse.json(posts);
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request) {
  await sequelize.sync();
  try {
    const info = request.json();
    console.log(info);
    //return NextResponse.json({});
  } catch (e) {
    return NextResponse.json(
      { message: e.message },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.formData();
    const directory = "public/assets/";
    const file = data.get("file");
    const tags = data.getAll("tags[]");
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    if (!file) {
      return NextResponse.json(
        { message: "Not File Received" },
        { status: 500 }
      );
    }
    const uploadFile = await UploadFile(file, "posts");

    const userCreated = await Posts.create({
      tittle: data.get("tittle"),
      content: data.get("content"),
      publish_at: now,
      image: uploadFile.filePath,
      relativePath: uploadFile.relativePath,
      status: "active",
    });

    await Promise.all(
      tags.map(async (element) => {
        return Tags.create({
          tag: element,
          idPost: userCreated.id,
        });
      })
    );

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
