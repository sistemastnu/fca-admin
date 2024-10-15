import sequelize from "@/lib/sequelize";
import Messages from "@/models/Messages";
import { NextResponse } from "next/server";

export async function GET(request) {
  await sequelize.sync();
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = parseInt(searchParams.get("pageSize")) || 10;
  const offset = (page - 1) * pageSize;
  try {
    const messages = await Messages.findAll({
      limit: pageSize,
      offset: offset,
    });
    const totalMessages = await Messages.count();
    return NextResponse.json({
      messages,
      totalPages: Math.ceil(totalMessages / pageSize),
      currentPage: page,
      pageSize: pageSize,
    });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {}
