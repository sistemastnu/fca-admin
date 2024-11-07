import sequelize from "@/lib/sequelize";
import { NextResponse } from "next/server";
import { Posts } from "@/models/associations/associations";
import { Tags } from "@/models/associations/associations";
import { User } from "@/models/associations/associations";
import { fn, col, where, Op } from "sequelize";

export const revalidate = 0;

export async function GET(request, { params }) {
  const { id } = params;
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
        "createdAt",
        "timeRead",
        [sequelize.literal(`GROUP_CONCAT(Tags.tag)`), "post_tags"],
      ],
      include: [
        {
          model: Tags,
          attributes: [],
        },
        {
          model: User,
          attributes: [
            "fullName",
            "email",
            "profilePhoto",
            "bio",
            "occupation",
          ],
        },
      ],
      where: {
        prettyUrl: id,
      },
      group: ["Posts.id"],
    });

    const post = posts[0];

    const tagNames = post.getDataValue("post_tags").split(",");

    const recomendations = await Posts.findAll({
      attributes: [
        "id",
        "tittle",
        "content",
        "image",
        "description",
        "prettyUrl",
        "createdAt",
        "timeRead",
      ],
      include: [
        {
          model: Tags,
          where: {
            tag: {
              [Op.in]: tagNames,
            },
          },
          attributes: [],
        },
        {
          model: User,
          attributes: [
            "fullName",
            "email",
            "profilePhoto",
            "bio",
            "occupation",
          ],
        },
      ],
      where: {
        prettyUrl: id, // Si necesitas filtrar por un id específico del post
      },
      group: ["Posts.id"],
    });

    const results = {
      post,
      recomendations,
    };

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
