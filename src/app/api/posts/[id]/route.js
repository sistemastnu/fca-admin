import { UploadFile } from "@/helpers/files";
import sequelize from "@/lib/sequelize";
import Posts from "@/models/Posts";
import Tags from "@/models/Tags";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await sequelize.sync();
    const { id } = params;
    const post = await Posts.findOne({ where: { id } });
    const tags = await Tags.findAll({ where: { idPost: id } });
    const realPost = {
      post,
      tags,
    };

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(realPost, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await sequelize.sync();
    const tag = await request.json();
    const destroy = await Tags.destroy({ where: { tag: tag.tag } });
    return NextResponse.json({ message: destroy }, { status: 200 });
    // await Tags.destroy({where:});
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await sequelize.sync();
    const id = params.id;
    const contentType = request.headers.get("Content-Type");
    let imageUrl;
    let relativePath;
    if (contentType.includes("application/json")) {
      const status = await request.json();
      const changeStatus = status.changeStatus;
      if (changeStatus) {
        await Posts.update(
          { status: changeStatus == "active" ? "disabled" : "active" },
          { where: { id: id } }
        );
        return NextResponse.json(
          { message: "Status changed" },
          { status: 200 }
        );
      }
    }
    const data = await request.formData();
    const file = data.get("file");
    const tags = data.getAll("tags[]");
    if (file) {
      const uploadFile = await UploadFile(file, "posts");
      imageUrl = uploadFile.filePath;
      relativePath = uploadFile.relativePath;
    } else {
      imageUrl = data.get("image");
      relativePath = data.get("relativePath");
    }
    await Posts.update(
      {
        tittle: data.get("tittle"),
        content: data.get("content"),
        description: data.get("description"),
        image: imageUrl,
        relativePath: relativePath,
        status: "active",
      },
      { where: { id: id } }
    );
    await updateTags({
      userCreated: id,
      newTags: tags,
    });

    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

async function updateTags({ userCreated, newTags }) {
  const currentTags = await Tags.findAll({
    where: { idPost: userCreated },
  });

  const currentTagsArray = currentTags.map((tag) => tag.tag);
  const tagsToDelete = currentTagsArray.filter((tag) => !newTags.includes(tag));
  const tagsToInsert = newTags.filter((tag) => !currentTagsArray.includes(tag));
  await Promise.all([
    ...tagsToDelete.map((tag) =>
      Tags.destroy({
        where: {
          tag: tag,
          idPost: userCreated,
        },
      })
    ),
    ...tagsToInsert.map((tag) =>
      Tags.create({
        tag: tag,
        idPost: userCreated,
      })
    ),
  ]);
}
