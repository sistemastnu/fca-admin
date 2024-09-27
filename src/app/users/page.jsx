async function getUsers(params) {
  const response = await fetch("http:localhost:3000/api/users", {
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

export default async function Users() {
  const data = await getUsers();
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName={"Users"} />
        <div className="flex flex-row items-end justify-end gap-4">
          <ButtonWithIcon
            tittle={"Agregar Usuario"}
            icon={<Image src={iconPlus} width={20} height={20} alt="icon" />}
            refa="users/add"
          />
        </div>
        <div className="overflow-hidden mt-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <TableThree data={data} t1={"Username"} t2={"Email"} t3={"Rol"} />
        </div>
      </DefaultLayout>
    </>
  );
}
