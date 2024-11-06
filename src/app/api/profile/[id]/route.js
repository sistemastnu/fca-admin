import sequelize from "@/lib/sequelize";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const user = await User.findOne({ where: { id } });
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await sequelize.sync();
  try {
    const { id } = params;
    const data = await request.json();
    console.log(data);
    await User.update(
      {
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        bio: data.bio,
      },
      { where: { id } }
    );
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
