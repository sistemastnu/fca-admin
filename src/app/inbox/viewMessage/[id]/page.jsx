"use client";

import useSWR from "swr";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Loader from "@/components/common";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((r) => r.json());

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
          <h2 className="text-xl font-bold text-black dark:text-white">
            Subject: {data.subject}
          </h2>
          <p className="text-base text-gray-600 mb-4">
            From: {data.sender}
            <br />
            To: {data.receiver}
          </p>
          <div className="space-y-4 text-base text-black">
            {mostrarBodyConSaltosDeLinea(data.body)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Reply</h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            rows="4"
            placeholder="Type your response here..."
            name="response"
            id="response"
            value={response}
            onChange={handleChange}
          ></textarea>
          <button
            onClick={handleSubmit}
            className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewMessage;
