import sequelize from "@/lib/sequelize";
import FacebookTag from "@/models/FacebookTag";
import GoogleTag from "@/models/GoogleAnalyticsTag";
import Seo from "@/models/Seo";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const facebookTagInfo = await FacebookTag.findOne();
    const googleTagInfo = await GoogleTag.findOne();
    const respond = {
      facebookTag: facebookTagInfo,
      googleTag: googleTagInfo,
    };
    return NextResponse.json(respond);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(params) {
  await sequelize.sync();
  try {
    const data = await params.json();
    await Seo.create(data);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request) {
  await sequelize.sync();
  try {
    const data = await request.json();
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
