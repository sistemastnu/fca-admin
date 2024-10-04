"use client";
import SponsorsModal from "./SponsorsModal";
import { useState } from "react";
import { toast } from "sonner";

const TableSponsors = ({ data, refreshData }) => {
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleActive = async (id, currentStatus) => {
    const body = {
      changeStatus: currentStatus,
    };
    const response = await fetch(`/api/sponsors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      toast.success("Status updated");
      refreshData();
    } else {
      toast.error("Something went wrong");
    }
  };
  const handleEdit = (dataItem) => {
    setSelectedSponsor(dataItem);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedSponsor(null);
    setIsModalOpen(true);
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-end py-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleCreate}
          >
            Agrega Un Nuevo Sponsor
          </button>
        </div>
        {isModalOpen && (
          <SponsorsModal
            data={selectedSponsor}
            refreshData={refreshData}
            closeModal={() => setIsModalOpen(false)}
          />
        )}

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white ">
                Name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((dataItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {dataItem.sponsorName}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                        dataItem.status === "active"
                          ? "bg-success text-success"
                          : dataItem.status === "disabled"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                      }`}
                    >
                      {dataItem.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => handleEdit(dataItem)}
                      >
                        Edit
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() =>
                          handleActive(dataItem.id, dataItem.status)
                        }
                      >
                        {dataItem.status.charAt(0).toUpperCase() +
                          dataItem.status.slice(1)}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSponsors;
