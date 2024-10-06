import User from "@/models/User";
import Messages from "@/models/Messages";
import { NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";

export async function POST(request) {
  await sequelize.sync();
  try {
    const { sender, receiverEmail, subject, body } = await request.json();
    const newMessage = await Messages.create({
      sender: sender,
      receiver: receiverEmail,
      subject,
      body,
    });
    if (newMessage) {
      return NextResponse.json({ status: 200 });
    }
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
