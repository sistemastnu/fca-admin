import User from "@/models/User";
import Messages from "@/models/Messages";
import { NextResponse } from "next/server";
import sequelize from "@/lib/sequelize";

export async function POST(request) {
  await sequelize.sync();
  try {
    const { sender, receiverEmail, body, phoneNumber, firstName, lastName } =
      await request.json();

    const newMessage = await Messages.create({
      firstName: firstName,
      lastName: lastName,
      sender: sender,
      receiver: receiverEmail,
      body,
      phoneNumber: phoneNumber,
      status: "unread",
      label: "inbox",
    });

    if (newMessage) {
      return NextResponse.json({ status: 200 });
    }
  } catch (e) {
    //console.log(e.message);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
