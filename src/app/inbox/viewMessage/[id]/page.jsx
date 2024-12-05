"use client";

import useSWR from "swr";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Loader from "@/components/common";
import { useState } from "react";
import dynamic from "next/dynamic";

const fetcher = (url) => fetch(url).then((r) => r.json());

const RichText = dynamic(() => import("@/components/FormUI/RichText"), {
  loading: () => <Loader />,
  ssr: false,
});

const ViewMessage = ({ params }) => {
  const id = params.id;
  const { data } = useSWR(`/api/inbox/${id}`, fetcher);
  const [response, setResponse] = useState("");
  if (!data) return <Loader />;
  const mostrarBodyConSaltosDeLinea = (texto) => {
    return texto.split("\n").map((linea, index) => <p key={index}>{linea}</p>);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponse(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(response);
    // const responseData = {
    //   message_id: id,
    //   body: response.response,
    // };
    // await fetch(`/api/inbox/reply`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(responseData),
    // });
    // setResponse("");
    // alert("Message sent successfully");
    // window.location.href = "/inbox";
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"View Message"} />
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <p className="text-black text-bold mb-4">
            From: <strong>{data.sender}</strong>
            <br />
            Phone: <strong>{data.phoneNumber}</strong>
            <br />
            Name: <strong>{data.firstName}</strong>
            <br />
            Last Name: <strong>{data.lastName}</strong>
          </p>
          <p className="text-black text-bold mb-4"></p>
          <div className="space-y-4 text-base text-black">
            {mostrarBodyConSaltosDeLinea(data.body)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Reply</h3>
          <RichText />
          <div>
            <button
              onClick={handleSubmit}
              className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewMessage;
