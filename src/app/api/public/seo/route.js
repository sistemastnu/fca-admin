import sequelize from "@/lib/sequelize";
import FacebookTag from "@/models/FacebookTag";
import GoogleTag from "@/models/GoogleAnalyticsTag";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  await sequelize.sync();
  try {
    const googleTag = await GoogleTag.findOne({ where: { status: 1 } });
    const facebookTag = await FacebookTag.findOne({ where: { status: 1 } });
    const response = {
      googleTag,
      facebookTag,
    };

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
