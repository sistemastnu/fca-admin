"use client";
const FormLayout = ({ children, handleSubmit, tittle = "Default" }) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">{tittle}</h3>
          </div>
          <div className="p-7">
            <form
              action="#"
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  e.preventDefault();
                }
              }}
            >
              {children}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
