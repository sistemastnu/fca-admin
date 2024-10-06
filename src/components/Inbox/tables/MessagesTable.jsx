"use client";
import Star from "@/components/Icons/Star";
import { changeLabel } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MessageTable = ({ data, refreshData }) => {
  const router = useRouter();
  const startedLabel = async (label, id, e) => {
    e.stopPropagation();
    const started = label === "started" ? "inbox" : "started";
    try {
      const response = await changeLabel(started, id);
      refreshData();
      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to change label.");
    }
  };
  return (
    <div className="h-full">
      <table className="h-full w-full table-auto">
        <thead>
          <tr className="flex border-y border-stroke dark:border-strokedark">
            <th className="w-[65%] py-6 pl-4 pr-4 lg:pl-10 xl:w-1/4">
              <label
                htmlFor="checkbox-1"
                className="flex cursor-pointer select-none items-center font-medium"
              >
                Sender
              </label>
            </th>
            <th className="hidden w-3/5 px-4 py-6 xl:block">
              <p className="text-left font-medium">Subject</p>
            </th>
            <th className="w-[35%] py-6 pl-4 pr-4 lg:pr-10 xl:w-[20%]">
              <p className="text-right font-medium">Date</p>
            </th>
          </tr>
        </thead>
        <tbody className="block h-full max-h-full overflow-auto py-4">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((dataItem, key) => {
              const date = new Date(dataItem.createdAt);
              const options = {
                day: "numeric",
                month: "short",
                year: "numeric",
              };
              const formattedDate = date.toLocaleDateString("en-US", options);
              const started = dataItem.label == "started" ? true : false;
              return (
                <tr
                  key={key}
                  className="flex cursor-pointer items-center hover:bg-whiten dark:hover:bg-boxdark-2"
                  onClick={() =>
                    router.push(`/inbox/viewMessage/${dataItem.id}`)
                  }
                >
                  <td className="w-[65%] py-4 pl-4 pr-4 lg:pl-10 xl:w-1/4">
                    <div className="flex items-center">
                      <label
                        htmlFor="checkbox-2"
                        className="flex cursor-pointer select-none items-center text-sm font-medium sm:text-base"
                      >
                        <div className="relative">
                          <input
                            id="checkbox-2"
                            className="tableCheckbox sr-only"
                            type="checkbox"
                          />
                          <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded-[3px] border-[.5px] border-stroke bg-gray-2 text-white dark:border-strokedark dark:bg-boxdark-2">
                            <span className="opacity-0">
                              <svg width="14" height="14" viewBox="0 0 10 10">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8.62796 2.20602C8.79068 2.36874 8.79068 2.63256 8.62796 2.79528L4.04463 7.37861C3.88191 7.54133 3.61809 7.54133 3.45537 7.37861L1.37204 5.29528C1.20932 5.13256 1.20932 4.86874 1.37204 4.70602C1.53476 4.5433 1.79858 4.5433 1.96129 4.70602L3.75 6.49473L8.03871 2.20602C8.20142 2.0433 8.46524 2.0433 8.62796 2.20602Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </label>
                      <Star
                        onClick={(e) =>
                          startedLabel(dataItem.label, dataItem.id, e)
                        }
                        started={started}
                      />
                      {dataItem.sender}
                    </div>
                  </td>
                  <td className="hidden w-3/5 p-4 xl:block">
                    <p>{dataItem.subject}</p>
                  </td>
                  <td className="w-[35%] py-4 pl-4 pr-4 lg:pr-10 xl:w-[20%]">
                    <p className="text-right text-xs xl:text-base">
                      {formattedDate}
                    </p>
                  </td>
                </tr>
              );
            })
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
  );
};

export default MessageTable;
