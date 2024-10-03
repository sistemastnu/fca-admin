import sequelize from "@/lib/sequelize";
import Sponsors from "@/models/Sponsors";

export async function POST(request) {
  try {
    await sequelize.sync();
    const data = await request.formData();
    const directory = "public/assets/";
    const file = data.get("photoUrl");
    if (!file) {
      return NextResponse.json(
        { message: "Not File Received" },
        { status: 500 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(" ", "_");
    const filePath = path.join(process.cwd(), directory + filename);
    await writeFile(filePath, buffer);

    const sponsors = await Sponsors.create({
      sponsorsName: data.get("name"),
      descriptions: data.get("descriptions"),
      photoSponsor: filePath,
      status: "active",
    });

    return NextResponse.json(sponsors, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await sequelize.sync();
    const id = params.id;
    const contentType = request.headers.get("Content-Type");
    console.log(contentType);
    if (contentType.includes("application/json")) {
      const data = await request.json();
      const changeStatus = data.changeStatus;

      if (changeStatus) {
        await Sponsors.update(
          {
            status: changeStatus == "active" ? "disabled" : "active",
          },
          { where: { id: id } }
        );
      }
    }
  } catch (e) {
    NextResponse.json({ message: e.message }, { status: 500 });
  }
}
