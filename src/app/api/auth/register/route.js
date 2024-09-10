import sequelize from "@/lib/sequelize";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  await sequelize.sync();

  try {
    const data = await request.json();
    const userFound = await User.findOne({ where: { email: data.email } });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }
    const usernameFound = await User.findOne({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = User.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      rol: data.rol,
    });
    const { password: _, ...user } = newUser;
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
