"use client";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import FormLayout from "@/components/layouts/FormLayout";
import InputForm from "@/components/FormUI/InputForm";
import SelectFile from "@/components/common/SelectFile";

const AddService = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Add a Service"} />
      <FormLayout tittle="Add">
        <InputForm tittle={"Title"} />
        <InputForm tittle={"Order"} />
        <SelectFile />
      </FormLayout>
    </DefaultLayout>
  );
};

export default AddService;
