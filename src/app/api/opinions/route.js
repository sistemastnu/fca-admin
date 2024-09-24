import sequelize from "@/lib/sequelize";
import Opinions from "@/models/Opinion";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const opinions = await Opinions.findAll();
    return NextResponse.json(opinions);
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(params) {}
