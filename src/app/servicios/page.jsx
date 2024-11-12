"use client";

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Loader from "@/components/common";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import SortableList from "./Components/SortableList";
import useSWR from "swr";
import ButtonForm from "@/components/FormUI/ButtonForm";
import { useRouter } from "next/navigation";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Servicios() {
  const router = useRouter();
  const { data: dataServicios, mutate: mutateServicios } = useSWR(
    "/api/servicios",
    fetcher
  );
  const { data: dataOtherServices, mutate: mutateOtherServices } = useSWR(
    "/api/otherServices",
    fetcher
  );
  const handleClick = () => {
    router.push("/servicios/add");
  };
  if (!dataServicios || !dataOtherServices) return <Loader />;

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Servicios"} />
      <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3 mb-9">
        <SortableList
          data={dataServicios}
          apiUrl="/api/servicios"
          mutate={mutateServicios}
        />
      </div>

      <div>
        <h2 className="text-title-md2 font-semibold text-black dark:text-white mb-6">
          {"Servicios Especializados"}
        </h2>
        <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-4">
          <SortableList
            data={dataOtherServices}
            apiUrl="/api/otherServices"
            mutate={mutateOtherServices}
          />
        </div>
      </div>
      <ButtonForm onClick={handleClick} text="Add a service" />
    </DefaultLayout>
  );
}
