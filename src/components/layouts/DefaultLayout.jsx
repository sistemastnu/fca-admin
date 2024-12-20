"use client";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import { Toaster } from "sonner";
import { useSession } from "next-auth/react";
import Loader from "../common";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { status } = useSession();
  if (status === "loading") {
    return <Loader />;
  }
  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <Toaster richColors />
            <div className="mx-auto min-h-screen max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
