"use client";

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ButtonWithIcon from "../ui/Button";
import iconPlus from "../../../public/icons/plus.svg";
import Image from "next/image";
import useSWR from "swr";
import Loader from "@/components/common";
import TableOpinions from "@/components/Opinions/TableOpinions";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Options = () => {
  const { data, mutate } = useSWR("/api/opinions", fetcher);
  const refreshData = () => {
    mutate();
  };

  if (!data) return <Loader />;
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Opiniones"} />
      <div className="flex flex-row items-end justify-end gap-4">
        <ButtonWithIcon
          tittle={"Add a Opinions"}
          icon={<Image src={iconPlus} width={20} height={20} alt="icon" />}
          linkTo={"opinions/add"}
        />
      </div>
      <div className=" overflow-hidden mt-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TableOpinions data={data} refreshData={refreshData} />
      </div>
    </DefaultLayout>
  );
};
export default Options;
