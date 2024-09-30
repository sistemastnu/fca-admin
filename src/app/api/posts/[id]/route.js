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
    const data = await request.json();
    const changeStatus = data.changeStatus;
    console.log(changeStatus);
    if (changeStatus) {
      await Posts.update(
        { status: changeStatus == "active" ? "disabled" : "active" },
        { where: { id: id } }
      );
      return NextResponse.json({ message: "Status changed" }, { status: 200 });
    }

    // await Posts.update({}, { where: { id: id } });

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
