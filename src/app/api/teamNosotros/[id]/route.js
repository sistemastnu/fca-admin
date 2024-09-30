import sequelize from "@/lib/sequelize";
import TeamNosotros from "@/models/TeamNosotros";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await sequelize.sync();
    const id = params.id;
    const data = await request.json();
    const changeStatus = data.changeStatus;
    if (changeStatus) {
      await TeamNosotros.update(
        {
          status: changeStatus == "active" ? "disabled" : "active",
        },
        { where: { id: id } }
      );
      return NextResponse.json({ status: 200 });
    }
  } catch (e) {
    NextResponse.json({ message: e.message }, { status: 500 });
  }
}
