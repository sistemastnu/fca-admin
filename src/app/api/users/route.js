import sequelize from "@/lib/sequelize";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request) {
  await sequelize.sync();
  try {
    const users = await User.findAll();
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  await sequelize.sync();
  try {
    const data = await request.json();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(data);
    await User.create({
      username: data.username,
      password: hashedPassword,
      email: data.email,
      status: "active",
      rol: data.rol,
    });
    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
