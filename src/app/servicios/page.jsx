import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Card from "@/components/common/Card";
import DefaultLayout from "@/components/layouts/DefaultLayout";

const Servicios = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName={"Servicios"} />
        <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Servicios;
