"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ButtonWithIcon from "../ui/Button";
import Image from "next/image";
import TableThree from "@/components/Tables/TableThree";
import useSWR from "swr";
import iconPlus from "../../../public/icons/plus.svg";
import TableSocials from "@/components/Socials/TableSocial";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Socials() {
  const { data, loading, error, mutate } = useSWR("/api/socials", fetcher);

  const refreshData = () => {
    mutate();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Redes Sociales"} />
      <div className="flex flex-row items-end justify-end gap-4">
        <ButtonWithIcon
          tittle={"Agregar una Red Social"}
          icon={<Image src={iconPlus} width={20} height={20} alt="icon" />}
          linkTo={"socials/social"}
        />
      </div>
      <div className="overflow-hidden mt-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TableSocials data={data} refreshData={refreshData} />
      </div>
    </DefaultLayout>
  );
}
