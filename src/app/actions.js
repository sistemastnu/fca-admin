"use server";

import Messages from "@/models/Messages";

export async function changeLabel(label, id) {
  try {
    const updated = await Messages.update(
      {
        label,
      },
      { where: { id } }
    );
    if (updated) {
      return { message: "Updated sucesfully" };
    } else {
      return { message: "No se pudo actualizar el mensaje" };
    }
  } catch (e) {
    return { error: e.message };
  }
}
