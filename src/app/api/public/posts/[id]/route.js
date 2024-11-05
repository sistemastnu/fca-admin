import sequelize from "@/lib/sequelize";
import { NextResponse } from "next/server";
import { Posts } from "@/models/associations/associations";
import { Tags } from "@/models/associations/associations";
import { fn, col } from "sequelize";

export const revalidate = 0;

export async function GET(request, { params }) {
  const { id } = params;
  await sequelize.sync();
  try {
    const posts = await Posts.findOne({
      attributes: [
        "id",
        "tittle",
        "content",
        "image",
        "description",
        "prettyUrl",
      ],
      include: [
        {
          model: Tags,

          attributes: [],
        },
      ],
      where: {
        prettyUrl: id,
      },
      group: ["Posts.id"],
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
