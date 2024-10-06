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
    ] = await Promise.all([
      Contactanos.findOne(),
      Nosotros.findOne(),
      OtherServices.findAll(),
      TeamNosotros.findAll(),
      Sponsors.findAll(),
      Tags.findAll(),
      Servicios.findAll(),
      Posts.findAll(),
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
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
