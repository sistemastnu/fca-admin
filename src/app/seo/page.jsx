"use client";

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import ButtonForm from "@/components/FormUI/ButtonForm";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import FormLayout from "@/components/layouts/FormLayout";
import useSWR from "swr";
import { fetcher } from "@/lib/fetchUtils";
import GoogleTagComponent from "./GoogleTag/GoogleTagComponent";
import FacebookTagComponent from "./FacebookTag/FacebookTagComponent";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/common";

const Seo = () => {
  const { data, isLoading } = useSWR("/api/seo/", fetcher);
  const [isGoogleEnabled, setGoogleEnabled] = useState(false);
  const [isFacebookEnabled, setFacebookEnabled] = useState(false);
  const [facebookTag, setFacebookTag] = useState({
    htmlVerification: "",
    pixelHead: "",
    pixelBody: "",
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
  useEffect(() => {
    if (data) {
      console.log("dentro del useEffect");
      if (data.googleTag != null) {
        setGoogleTag({
          htmlSiteVerification: data.googleTag.htmlSiteVerification ?? "",
          tagHead: data.googleTag.tagHead ?? "",
          tagBody: data.googleTag.tagBody ?? "",
          googleAnalytics: data.googleTag.googleAnalytics ?? "",
          isGoogleEnabled: data.googleTag.isGoogleEnabled ?? false,
        });
        setGoogleEnabled(data.googleTag.status);
      }

      if (data.facebookTag != null) {
        setFacebookTag({
          htmlVerification: data.facebookTag.htmlVerification ?? "",
          pixelHead: data.facebookTag.pixelHead ?? "",
          pixelBody: data.facebookTag.pixelBody ?? "",
          siteTitle: data.facebookTag.siteTitle ?? "",
          siteUrl: data.facebookTag.siteUrl ?? "",
          description: data.facebookTag.description ?? "",
          metakeywords: data.facebookTag.metakeywords ?? "",
          isFacebookEnabled: data.facebookTag.status ?? false,
        });
        setFacebookEnabled(data.facebookTag.status);
      }
    }
  }, [data]);

  if (isLoading) return <Loader />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      googleTag,
      facebookTag,
    };
    const response = await fetch("/api/seo/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      toast.success("SEO tags acutalizados Correctamente");
    } else {
      toast.success("Ocurrio un error actualizando los SEO TAGS");
    }
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
          googleInformation={googleTag}
        />
        <div className="border-t border-gray-300 my-4" />
        <FacebookTagComponent
          isEnabled={isFacebookEnabled}
          setEnabled={setFacebookEnabled}
          idToggle={"facebookToggle"}
          facebookInformation={facebookTag}
          setFacebookInformation={setFacebookTag}
        />

        <ButtonForm onClick={handleSubmit} />
      </FormLayout>
    </DefaultLayout>
  );
};

export default Seo;
