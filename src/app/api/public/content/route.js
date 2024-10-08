import sequelize from "@/lib/sequelize";
import Nosotros from "@/models/Nosotros";
import OtherServices from "@/models/OtherServices";
import TeamNosotros from "@/models/TeamNosotros";
import Sponsors from "@/models/Sponsors";
import Tags from "@/models/Tags";
import { NextResponse } from "next/server";
import Servicios from "@/models/Servicios";
import Posts from "@/models/Posts";
import Contactanos from "@/models/Contactanos";
import FirstPageContent from "@/models/FirstPageContent";
import Opinions from "@/models/Opinion";

export async function GET() {
  try {
    await sequelize.sync();
    const [
      contactanos,
      nosotros,
      otherServices,
      teamNosotros,
      sponsors,
      tags,
      servicios,
      posts,
      firstPageContent,
      opinions,
    ] = await Promise.all([
      Contactanos.findOne(),
      Nosotros.findOne(),
      OtherServices.findAll(),
      TeamNosotros.findAll(),
      Sponsors.findAll(),
      Tags.findAll(),
      Servicios.findAll(),
      Posts.findAll(),
      FirstPageContent.findOne(),
      Opinions.findAll(),
    ]);

    return NextResponse.json({
      contactanos,
      nosotros,
      otherServices,
      teamNosotros,
      sponsors,
      tags,
      servicios,
      posts,
      firstPageContent,
      opinions,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
