import InputForm from "@/components/FormUI/InputForm";
import TextAreaForm from "@/components/FormUI/TextAreaForm";

const GoogleTagComponent = () => {
  return (
    <div className="">
      <h1 className="font-bold text-xl text-black pb-2">Google Tag:</h1>
      <div className="flex flex-col gap-3">
        <TextAreaForm
          tittle={"Etiqueta HTML Google Site Verification"}
          rows={3}
        />
        <TextAreaForm tittle={"Codigo Google Tag Manager (Head)"} rows={3} />
        <TextAreaForm tittle={"Codigo Google Tag Manager (Body)"} rows={3} />
        <TextAreaForm tittle={"Codigo Google Analytics"} rows={3} />
      </div>
    </div>
  );
};

export default GoogleTagComponent;
