"use client";
import TextAreaForm from "@/components/FormUI/TextAreaForm";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import { useState } from "react";

const GoogleTagComponent = ({
  isEnabled,
  setEnabled,
  idToggle,
  setGoogleInformation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleVisibility = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoogleInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEnabled = () => {
    setEnabled(!isEnabled);
    setGoogleInformation((prev) => ({
      ...prev,
      isGoogleEnabled: !isEnabled,
    }));
  };

  return (
    <div className="">
      <div className="flex flex-row justify-between pb-2">
        <button
          onClick={toggleVisibility}
          className="font-bold text-xl text-black"
        >
          Google Tag:
        </button>
        <SwitcherOne
          enabled={isEnabled}
          setEnabled={setEnabled}
          idToggle={idToggle}
          onChange={toggleEnabled}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-3">
          <TextAreaForm
            tittle={"Etiqueta HTML Google Site Verification"}
            rows={3}
            onChange={handleChange}
            id="htmlSiteVerification"
            name="htmlSiteVerification"
          />
          <TextAreaForm
            tittle={"Codigo Google Tag Manager (Head)"}
            rows={3}
            onChange={handleChange}
            id="tagHead"
            name="tagHead"
          />
          <TextAreaForm
            tittle={"Codigo Google Tag Manager (Body)"}
            rows={3}
            id="tagBody"
            name="tagBody"
            onChange={handleChange}
          />
          <TextAreaForm
            tittle={"Codigo Google Analytics"}
            rows={3}
            onChange={handleChange}
            id="googleAnalytics"
            name="googleAnalytics"
          />
        </div>
      </div>
    </div>
  );
};

export default GoogleTagComponent;
