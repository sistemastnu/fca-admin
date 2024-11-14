"use client";

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import ButtonForm from "@/components/FormUI/ButtonForm";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import FormLayout from "@/components/layouts/FormLayout";
import useSWR from "swr";
import { fetcher } from "@/lib/fetchUtils";
import GoogleTagComponent from "./GoogleTag/GoogleTagComponent";
import FacebookTagComponent from "./FacebookTag/FacebookTagComponent";

const Seo = () => {
  const { data, isLoading } = useSWR("/api/seo/", fetcher);
  console.log(data);
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"SEO"} />
      <FormLayout>
        <GoogleTagComponent />
        <div className="border-t border-gray-300 my-4" />
        <FacebookTagComponent />
        <ButtonForm />
      </FormLayout>
    </DefaultLayout>
  );
};

export default Seo;
