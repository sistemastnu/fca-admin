import Posts from "@/models/Posts";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const posts = await Posts.findAll({ where: { userId: id } });
    return NextResponse.json(posts);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: e.status });
  }
}
