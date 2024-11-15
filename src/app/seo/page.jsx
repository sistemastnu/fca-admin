"use client";

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import ButtonForm from "@/components/FormUI/ButtonForm";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import FormLayout from "@/components/layouts/FormLayout";
import useSWR from "swr";
import { fetcher } from "@/lib/fetchUtils";
import GoogleTagComponent from "./GoogleTag/GoogleTagComponent";
import FacebookTagComponent from "./FacebookTag/FacebookTagComponent";
import { useState } from "react";

const Seo = () => {
  const { data, isLoading } = useSWR("/api/seo/", fetcher);
  const [isGoogleEnabled, setGoogleEnabled] = useState(false);
  const [isFacebookEnabled, setFacebookEnabled] = useState(false);
  const [facebookTag, setFacebookTag] = useState({
    htmlVerification: "",
    pixel: "",
    siteTitle: "",
    siteUrl: "",
    description: "",
    metakeywords: "",
    isFacebookEnabled,
  });
  const [googleTag, setGoogleTag] = useState({
    htmlSiteVerification: "",
    tagHead: "",
    tagBody: "",
    googleAnalytics: "",
    isGoogleEnabled,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      googleTag,
      facebookTag,
    };
    await fetch("/api/seo/", {
      method: "POSt",
      body: JSON.stringify(data),
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"SEO"} />
      <FormLayout>
        <GoogleTagComponent
          isEnabled={isGoogleEnabled}
          setEnabled={setGoogleEnabled}
          idToggle={"googleToggle"}
          setGoogleInformation={setGoogleTag}
        />
        <div className="border-t border-gray-300 my-4" />
        <FacebookTagComponent
          isEnabled={isFacebookEnabled}
          setEnabled={setFacebookEnabled}
          idToggle={"facebookToggle"}
          setFacebookInformation={setFacebookTag}
        />

        <ButtonForm onClick={handleSubmit} />
      </FormLayout>
    </DefaultLayout>
  );
};

export default Seo;
