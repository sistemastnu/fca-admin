"use client";
import { useRouter } from "next/navigation";
import ModalConfirmation from "../Modals/ModalConfirmation";
import { useState } from "react";
import { toast } from "sonner";

const TableThree = ({ data, t1, t2, t3, t4, refreshData }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleEdit = (id) => {
    router.push(`users/edit/${id}`);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    setModalOpen(false);
    try {
      const response = await fetch(`/api/users/${selectedId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        refreshData();
        toast.success("User deleted successfully.");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error("Error deleting user.");
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                {t1}
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                {t2}
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                {t3}
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
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
                      {dataItem.username}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {dataItem.email}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                        dataItem.status === "Paid"
                          ? "bg-success text-success"
                          : dataItem.status === "Unpaid"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                      }`}
                    >
                      {dataItem.rol}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => handleEdit(dataItem.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          handleDelete(dataItem.id);
                        }}
                      >
                        Delete
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
      {/* Modal */}
      {modalOpen && (
        <ModalConfirmation
          onConfirm={confirmDelete}
          onCancel={() => setModalOpen(false)}
          tittle={"Eliminar Usuario"}
          subTitle={"Estas seguro que deseas eliminar al usuario"}
          buttonName={"Eliminar"}
        />
      )}
    </div>
  );
};

export default TableThree;
