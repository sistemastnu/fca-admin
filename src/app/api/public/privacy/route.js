import sequelize from "@/lib/sequelize";
import Privacity from "@/models/Privacidad";

export async function GET() {
  await sequelize.sync();
  try {
    const data = await Privacity.findOne();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
