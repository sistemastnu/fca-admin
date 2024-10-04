import { writeFile } from "fs/promises";
import path from "path";

export async function UploadFile(file, folder) {
  const directory = "public/assets/" + folder;
  if (!file) {
    return Error("File Missing");
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  const filePath = path.join(process.cwd(), directory, filename);
  await writeFile(filePath, buffer);

  return {
    filePath,
    relativePath: "/assets/" + folder + "/" + filename,
  };
}