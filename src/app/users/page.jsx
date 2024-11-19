"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import TableThree from "@/components/Tables/TableThree";
import Image from "next/image";
import iconPlus from "../../../public/icons/plus.svg";
import ButtonWithIcon from "../ui/Button";
import useSWR from "swr";
import Loader from "@/components/common";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Users() {
  // const data = await getUsers();
  const { data, mutate } = useSWR("/api/users", fetcher);
  if (!data) return <Loader />;

  const refreshData = () => {
    mutate();
  };
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName={"Users"} />
        <div className="flex flex-row items-end justify-end gap-4">
          <ButtonWithIcon
            tittle={"Add User"}
            icon={<Image src={iconPlus} width={20} height={20} alt="icon" />}
            linkTo="users/add"
          />
        </div>
        <div className="overflow-hidden mt-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <TableThree
            data={data}
            t1={"Username"}
            t2={"Email"}
            t3={"Rol"}
            refreshData={refreshData}
          />
        </div>
      </DefaultLayout>
    </>
  );
}
