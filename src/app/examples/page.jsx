"use client";

import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/components/RichTexts/Jedit"), {
  ssr: false,
});

const RichTexts = dynamic(() => import("@/components/FormUI/RichText"), {
  ssr: false,
});
export default function Example() {
  return <RichTexts />;
}
