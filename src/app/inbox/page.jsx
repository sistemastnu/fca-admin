import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import HeaderInbox from "@/components/Inbox/content/HeaderInbox";
import Pagination from "@/components/Inbox/pagination/pagination";
import SideBarInbox from "@/components/Inbox/Sidebar/SidebarInbox";
import MessageTable from "@/components/Inbox/tables/MessagesTable";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Inbox() {
  const session = await getServerSession(authOptions);
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Inbox"} />
      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div
          className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:flex"
          x-data="{inboxSidebarToggle: false}"
        >
          <SideBarInbox />
          <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark lg:w-4/5">
            <HeaderInbox />
            <MessageTable />
            <Pagination />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
