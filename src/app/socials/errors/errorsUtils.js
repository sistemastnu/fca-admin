import { isLink } from "@/utils/stringUtils";
import { toast } from "sonner";

export function checkErrors(data, file) {
  if (!data.name) {
    toast.error("El título es requerido");
    return true;
  }
  if (!data.link) {
    toast.error("El link es requerido");
    return true;
  }
  if (!isLink(data.link)) {
    toast.error("El link no es válido");
    return true;
  }

  if (file == null) {
    toast.error("El icono es requerido");
    return true;
  }

  return false;
}
