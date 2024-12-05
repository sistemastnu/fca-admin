import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function POST(req) {
  try {
    const { to, subject, text, html } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_USER_PASSWORD,
      },
    });

    const mailOptiions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptiions);

    return NextResponse(
      { status: 200 },
      { message: "Correo enviado correctamente." }
    );
  } catch (e) {
    return NextResponse({ status: 500 }, { message: e.message });
  }
}
