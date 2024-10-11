"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Loader from "@/components/common";
import HeaderInbox from "@/components/Inbox/content/HeaderInbox";
import Pagination from "@/components/Inbox/pagination/pagination";
import SideBarInbox from "@/components/Inbox/Sidebar/SidebarInbox";
import MessageTable from "@/components/Inbox/tables/MessagesTable";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Inbox() {
  const { data, mutate } = useSWR("/api/inbox/", fetcher);
  if (!data) return <Loader />;
  const refreshData = () => {
    mutate();
  };
  const handleClickStarted = async () => {
    const newData = await fetch("/api/inbox/started").then((res) => res.json());
    mutate(newData, false);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Inbox"} />
      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div
          className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:flex"
          x-data="{inboxSidebarToggle: false}"
        >
          <SideBarInbox
            onClickStarted={handleClickStarted}
            onClickInbox={refreshData}
          />
          <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark lg:w-4/5">
            <HeaderInbox refreshData={refreshData} />
            <MessageTable data={data} refreshData={refreshData} />
            <Pagination />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
