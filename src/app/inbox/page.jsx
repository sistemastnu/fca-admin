import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import HeaderInbox from "@/components/Inbox/content/HeaderInbox";
import SideBarInbox from "@/components/Inbox/Sidebar/SidebarInbox";
import DefaultLayout from "@/components/layouts/DefaultLayout";

const Inbox = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Inbox"} />
      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div
          className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:flex"
          x-data="{inboxSidebarToggle: false}"
        >
          <SideBarInbox />
          <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark lg:w-4/5">
            <HeaderInbox />
            <div className="h-full">
              <table className="h-full w-full table-auto">
                <thead>
                  <tr className="flex border-y border-stroke dark:border-strokedark">
                    <th className="w-[65%] py-6 pl-4 pr-4 lg:pl-10 xl:w-1/4">
                      <label
                        htmlFor="checkbox-1"
                        className="flex cursor-pointer select-none items-center font-medium"
                      >
                        <div className="relative">
                          <input
                            id="checkbox-1"
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
                  <tr className="flex cursor-pointer items-center hover:bg-whiten dark:hover:bg-boxdark-2">
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
                        <span className="pr-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-[#E5E7EE] dark:fill-[#E5E7EE]/70"
                          >
                            <path
                              d="M11.1034 3.81714C11.4703 3.07397 12.53 3.07397 12.8968 3.81714L14.8577 7.7896C15.0032 8.08445 15.2844 8.28891 15.6098 8.33646L19.9964 8.97763C20.8163 9.09747 21.1431 10.1053 20.5495 10.6835L17.3769 13.7735C17.1411 14.0033 17.0334 14.3344 17.0891 14.6589L17.8376 19.0231C17.9777 19.8401 17.1201 20.4631 16.3865 20.0773L12.4656 18.0153C12.1742 17.8621 11.8261 17.8621 11.5347 18.0153L7.61377 20.0773C6.88014 20.4631 6.02259 19.8401 6.16271 19.0231L6.91122 14.6589C6.96689 14.3344 6.85922 14.0033 6.62335 13.7735L3.45082 10.6835C2.85722 10.1053 3.18401 9.09747 4.00392 8.97763L8.39051 8.33646C8.71586 8.28891 8.99704 8.08445 9.14258 7.7896L11.1034 3.81714Z"
                              fill=""
                            ></path>
                          </svg>
                        </span>
                        Musharof Chowdhury
                      </div>
                    </td>
                    <td className="hidden w-3/5 p-4 xl:block">
                      <p>
                        Some note &amp; Lorem Ipsum available alteration in some
                        form.
                      </p>
                    </td>
                    <td className="w-[35%] py-4 pl-4 pr-4 lg:pr-10 xl:w-[20%]">
                      <p className="text-right text-xs xl:text-base">
                        17 Oct, 2024
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-stroke p-4 dark:border-strokedark sm:px-6">
              <p className="text-base font-medium text-black dark:text-white md:text-lg">
                1-5 of 29
              </p>
              <div className="flex items-center justify-end space-x-3">
                <button className="flex h-7.5 w-7.5 items-center justify-center rounded border border-stroke bg-whiten hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:bg-whiten/30">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.25 10C14.8023 10 15.25 9.55228 15.25 9C15.25 8.44771 14.8023 8 14.25 8L14.25 10ZM3.75 9L3.04289 8.29289C2.65237 8.68342 2.65237 9.31658 3.04289 9.70711L3.75 9ZM8.29289 14.9571C8.68342 15.3476 9.31658 15.3476 9.70711 14.9571C10.0976 14.5666 10.0976 13.9334 9.70711 13.5429L8.29289 14.9571ZM9.7071 4.45711C10.0976 4.06658 10.0976 3.43342 9.7071 3.04289C9.31658 2.65237 8.68342 2.65237 8.29289 3.04289L9.7071 4.45711ZM14.25 8L3.75 8L3.75 10L14.25 10L14.25 8ZM9.70711 13.5429L4.4571 8.29289L3.04289 9.70711L8.29289 14.9571L9.70711 13.5429ZM4.4571 9.70711L9.7071 4.45711L8.29289 3.04289L3.04289 8.29289L4.4571 9.70711Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <button className="flex h-7.5 w-7.5 items-center justify-center rounded border border-stroke bg-whiten hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:bg-whiten/30">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.75 8C3.19772 8 2.75 8.44772 2.75 9C2.75 9.55229 3.19772 10 3.75 10V8ZM14.25 9L14.9571 9.70711C15.3476 9.31658 15.3476 8.68342 14.9571 8.29289L14.25 9ZM9.70711 3.04289C9.31658 2.65237 8.68342 2.65237 8.29289 3.04289C7.90237 3.43342 7.90237 4.06658 8.29289 4.45711L9.70711 3.04289ZM8.29289 13.5429C7.90237 13.9334 7.90237 14.5666 8.29289 14.9571C8.68342 15.3476 9.31658 15.3476 9.70711 14.9571L8.29289 13.5429ZM3.75 10H14.25V8H3.75V10ZM8.29289 4.45711L13.5429 9.70711L14.9571 8.29289L9.70711 3.04289L8.29289 4.45711ZM13.5429 8.29289L8.29289 13.5429L9.70711 14.9571L14.9571 9.70711L13.5429 8.29289Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Inbox;
