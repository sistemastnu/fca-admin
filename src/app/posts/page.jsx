"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import TablePosts from "@/components/Posts/tablePosts";
import Image from "next/image";
import iconPlus from "../../../public/icons/plus.svg";
import ButtonWithIcon from "../ui/Button";
import useSWR from "swr";
import Loader from "@/components/common";
import { useSession } from "next-auth/react";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Opinions() {
  const { data: session, status } = useSession(); // Obtén información de la sesión
  const isLoadingSession = status === "loading";
  console.log(session);
  const { data, mutate, isLoading } = useSWR(
    session?.user.role === "editor"
      ? `/api/posts/postsByUsers/${session.user.id}`
      : `/api/posts`,
    fetcher
  );
  const refreshData = () => {
    mutate();
  };
  console.log;
  if (isLoading) return <Loader />;

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Posts"} />
      <div className="flex flex-row items-end justify-end gap-4">
        <ButtonWithIcon
          tittle={"Add a Post"}
          icon={<Image src={iconPlus} width={20} height={20} alt="icon" />}
          linkTo={"posts/add"}
        />
      </div>
      <div className="overflow-hidden mt-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TablePosts data={data} refreshData={refreshData} />
      </div>
    </DefaultLayout>
  );
}
