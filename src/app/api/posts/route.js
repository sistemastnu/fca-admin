import sequelize from "@/lib/sequelize";
import Posts from "@/models/Posts";
import { NextResponse } from "next/response";

export async function GET(request) {
  await sequelize.sync();
  try {
    const posts = await Posts.findAll();
    return NextResponse.json(posts);
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

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.json();
    Posts.create({
      tittle: data.tittle,
      content: data.content,
      author_id: data.author_id,
      publish_at: data.publish_at,
      slug: data.slug,
      image: data.image,
    });
    return NextResponse.json(
      {
        message: "Sucess",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
