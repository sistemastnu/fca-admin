async function getOpinions() {
  const response = await fetch(`${process.env.NEXT_URL}/api/opinions/`, {
    method: "GET",
  });
  return response.json();
}

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import TableThree from "@/components/Tables/TableThree";
import Image from "next/image";
import iconPlus from "../../../public/icons/plus.svg";
import ButtonWithIcon from "../ui/Button";

export default async function Opinions() {
  const data = await getOpinions();
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Posts"} />
      <div className="flex flex-row items-end justify-end gap-4">
        <ButtonWithIcon
          tittle={"Add a Opinion"}
          icon={<Image src={iconPlus} width={20} height={20} alt="icon" />}
          refa="posts/add"
        />
      </div>
      <div className="overflow-hidden mt-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TableThree data={data} />
      </div>
    </DefaultLayout>
  );
}
