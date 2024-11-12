"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ButtonWithIcon from "../ui/Button";
import Image from "next/image";
import TableThree from "@/components/Tables/TableThree";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Socials() {
  const { data, loading, error } = useSWR("/api/socials", fetcher);
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
      <div className="overflow-hidden mt-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TableThree data={data} t1={"Nombre"} t2={"status"} t3={"Enlace"} />
      </div>
    </DefaultLayout>
  );
}
