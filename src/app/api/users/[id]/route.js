import sequelize from "@/lib/sequelize";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await sequelize.sync();
    const { id } = params;
    const user = await User.findOne({ where: { id } });
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await sequelize.sync();
    const { id } = params;
    const data = await request.json();
    await User.update(
      {
        username: data.username,
        rol: data.rol,
        email: data.email,
      },
      { where: { id: id } }
    );
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
