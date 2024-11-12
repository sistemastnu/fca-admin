import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ButtonWithIcon from "../ui/Button";
import Image from "next/image";

export default function Socials() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Redes Sociales"} />
      <div className="flex flex-row items-end justify-end gap-4">
        <ButtonWithIcon
          tittle={"Agregar una Red Social"}
          icon={<Image src={iconPlus} width={20} height={20} alt="icon" />}
          linkTo={"socials/add"}
        />
      </div>
      <div className="overflow-hidden mt-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"></div>
    </DefaultLayout>
  );
}
