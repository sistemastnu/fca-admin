import sequelize from "@/lib/sequelize";
import { NextResponse } from "next/server";
import { Posts } from "@/models/associations/associations";
import { Tags } from "@/models/associations/associations";
import { fn, col } from "sequelize";
export const revalidate = 0;

export async function GET() {
  await sequelize.sync();
  try {
    const posts = await Posts.findAll({
      attributes: [
        "id",
        "tittle",
        "content",
        "image",
        "description",
        "prettyUrl",
        [fn("GROUP_CONCAT", col("Tags.tag")), "post_tags"],
      ],
      include: [
        {
          model: Tags,
          attributes: [],
        },
      ],
      group: ["Posts.id"],
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
