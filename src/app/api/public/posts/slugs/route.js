import sequelize from "@/lib/sequelize";
import Posts from "@/models/Posts";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const slugs = await Posts.findAll({ attributes: ["prettyUrl"] });
    return NextResponse.json(slugs);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
