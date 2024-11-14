"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Loader from "@/components/common";
import ButtonForm from "@/components/FormUI/ButtonForm";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import FormLayout from "@/components/layouts/FormLayout";
import { fetcher } from "@/lib/fetchUtils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const RichTextXL = dynamic(() => import("@/components/FormUI/RichTextXL"), {
  ssr: false,
});

const PrivacyPolicy = () => {
  const [editorData, setEditorData] = useState();
  const { data, isLoading } = useSWR("/api/privacypolicy/", fetcher);
  useEffect(() => {
    if (data) {
      setEditorData(data.content);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/privacypolicy/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: editorData }),
    });
    console.log(response);
    if (response.status === 200) {
      toast.success("Success");
    } else {
      toast.error("Error: " + response.status);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Privacy Policy"} />
      <FormLayout>
        <RichTextXL editorData={editorData} setEditorData={setEditorData} />
        <div className="pt-3">
          <ButtonForm onClick={handleSubmit} />
        </div>
      </FormLayout>
    </DefaultLayout>
  );
};

export default PrivacyPolicy;
