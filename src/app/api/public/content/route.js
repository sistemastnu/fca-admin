import sequelize from "@/lib/sequelize";
import Nosotros from "@/models/Nosotros";
import OtherServices from "@/models/OtherServices";
import TeamNosotros from "@/models/TeamNosotros";
import Sponsors from "@/models/Sponsors";
import { NextResponse } from "next/server";
import Servicios from "@/models/Servicios";
import Contactanos from "@/models/Contactanos";
import FirstPageContent from "@/models/FirstPageContent";
import { Posts } from "@/models/associations/associations";
import { Tags } from "@/models/associations/associations";
import { User } from "@/models/associations/associations";
import Opinions from "@/models/Opinion";
import { col, fn } from "sequelize";
import SocialMedia from "@/models/SocialMedia";

export const revalidate = 0;

export async function GET() {
  try {
    await sequelize.sync();
    const [
      contactanos,
      nosotros,
      otherServices,
      teamNosotros,
      sponsors,
      servicios,
      posts,
      firstPageContent,
      opinions,
      socialMedia,
    ] = await Promise.all([
      Contactanos.findOne(),
      Nosotros.findOne(),
      OtherServices.findAll(),
      TeamNosotros.findAll(),
      Sponsors.findAll(),
      Servicios.findAll(),
      Posts.findAll({
        attributes: [
          "id",
          "tittle",
          "content",
          "image",
          "description",
          "prettyUrl",
          "createdAt",
          [fn("GROUP_CONCAT", col("Tags.tag")), "post_tags"],
        ],
        include: [
          {
            model: Tags,
            attributes: [],
          },
          {
            model: User,
            attributes: ["fullName", "email", "profilePhoto", "bio"],
          },
        ],
        group: ["posts.id"],
      }),
      FirstPageContent.findOne(),
      Opinions.findAll(),
      SocialMedia.findAll(),
    ]);

    return NextResponse.json({
      contactanos,
      nosotros,
      otherServices,
      teamNosotros,
      sponsors,
      servicios,
      posts,
      firstPageContent,
      opinions,
      socialMedia,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
