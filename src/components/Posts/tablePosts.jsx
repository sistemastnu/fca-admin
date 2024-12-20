"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "../common/Spinner";

const TablePosts = ({ data, refreshData }) => {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`posts/edit/${id}`);
  };

  const handleActive = async (id, currentStatus) => {
    const body = {
      changeStatus: currentStatus,
    };
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.status == 200) {
      toast.success("Status updated");
      refreshData();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Tittle
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Publish
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
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
                      {dataItem.tittle}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Date(dataItem.publish_at).toLocaleDateString(
                        "en-US"
                      )}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                        dataItem.status === "active"
                          ? "bg-success text-success"
                          : dataItem.status === "inactive"
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
                        onClick={() => handleEdit(dataItem.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() =>
                          handleActive(dataItem.id, dataItem.status)
                        }
                      >
                        Active
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11"
                >
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePosts;
