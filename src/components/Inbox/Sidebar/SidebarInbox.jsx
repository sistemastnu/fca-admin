const SideBarInbox = ({ onClickStarted, onClickInbox, onClickTrash }) => {
  return (
    <>
      <div className="fixed bottom-0 top-22.5 z-999 flex w-[230px] -translate-x-[120%] flex-col rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark lg:static lg:w-1/5 lg:translate-x-0 lg:border-none false">
        <div className="no-scrollbar max-h-full overflow-auto py-6">
          <ul className="flex flex-col gap-2">
            <li>
              <a
                className="relative flex items-center gap-2.5 px-5 py-2.5 font-medium duration-300 ease-linear before:absolute before:left-0 before:h-0 before:w-1 before:bg-primary before:duration-300 before:ease-linear hover:bg-primary/5 hover:text-primary hover:before:h-full"
                onClick={onClickInbox}
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.75 10.6875C18.375 10.6875 18.0625 11 18.0625 11.375V17C18.0625 17.3125 17.8125 17.5625 17.5 17.5625H2.5C2.1875 17.5625 1.9375 17.3125 1.9375 17V11.375C1.9375 11 1.625 10.6875 1.25 10.6875C0.875 10.6875 0.5625 11 0.5625 11.375V17C0.5625 18.0625 1.4375 18.9375 2.5 18.9375H17.5C18.5625 18.9375 19.4375 18.0625 19.4375 17V11.375C19.4375 11.0313 19.125 10.6875 18.75 10.6875Z"
                    fill=""
                  ></path>
                  <path
                    d="M9.28125 12.9688C9.46875 13.1563 9.75 13.2813 10 13.2813C10.25 13.2813 10.5312 13.1875 10.7187 13L13.6875 10.0625C13.9687 9.78125 13.9687 9.34375 13.6875 9.0625C13.4062 8.78125 12.9687 8.78125 12.6875 9.0625L10.7187 11.0312V1.71875C10.7187 1.34375 10.4062 1.03125 10.0312 1.03125C9.65625 1.03125 9.34375 1.34375 9.34375 1.71875V11.0312L7.375 9.0625C7.09375 8.78125 6.65625 8.78125 6.375 9.0625C6.09375 9.34375 6.09375 9.78125 6.375 10.0625L9.28125 12.9688Z"
                    fill=""
                  ></path>
                </svg>
                Inbox
              </a>
            </li>
            <li>
              <a
                className="relative flex items-center gap-2.5 px-5 py-2.5 font-medium duration-300 ease-linear before:absolute before:left-0 before:h-0 before:w-1 before:bg-primary before:duration-300 before:ease-linear hover:bg-primary/5 hover:text-primary hover:before:h-full"
                onClick={onClickStarted}
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4348_2007)">
                    <path
                      d="M5.03112 19.4375C4.74987 19.4375 4.46862 19.3437 4.24987 19.1875C3.81237 18.875 3.56237 18.3125 3.65612 17.7812L4.46862 12.75L0.968622 9.15625C0.593622 8.78125 0.468622 8.21875 0.624872 7.6875C0.781122 7.1875 1.21862 6.8125 1.71862 6.75L6.56237 5.96875L8.74987 1.375C8.99987 0.875 9.46862 0.5625 9.99987 0.5625C10.5311 0.5625 11.0311 0.875 11.2499 1.375L13.4374 5.9375L18.2499 6.6875C18.7499 6.78125 19.1874 7.125 19.3436 7.625C19.5311 8.15625 19.3749 8.71875 18.9999 9.09375L15.5311 12.7187L16.3436 17.7812C16.4374 18.3437 16.2186 18.875 15.7499 19.1875C15.3124 19.5 14.7811 19.5312 14.3124 19.2812L9.99987 16.9375L5.68737 19.2812C5.49987 19.4062 5.24987 19.4375 5.03112 19.4375ZM1.96862 8.125C1.96862 8.125 1.96862 8.15625 1.96862 8.1875L5.62487 11.9375C5.84362 12.1562 5.93737 12.5 5.90612 12.8125L5.06237 18.0312C5.06237 18.0312 5.06237 18.0312 5.06237 18.0625L9.56237 15.625C9.84362 15.4687 10.1874 15.4687 10.4999 15.625L14.9999 18.0625C14.9999 18.0625 14.9999 18.0625 14.9999 18.0312L14.1561 12.7812C14.0936 12.4687 14.2186 12.1562 14.4374 11.9062L18.0936 8.15625C18.1249 8.125 18.0936 8.09375 18.0936 8.09375L13.0624 7.3125C12.7499 7.25 12.4686 7.0625 12.3436 6.75L9.99987 2L7.74987 6.78125C7.62487 7.0625 7.34362 7.28125 7.03112 7.34375L1.96862 8.125Z"
                      fill=""
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_4348_2007">
                      <rect width="20" height="20" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                Started
              </a>
            </li>
            <li>
              <a
                className="relative flex items-center gap-2.5 px-5 py-2.5 font-medium duration-300 ease-linear before:absolute before:left-0 before:h-0 before:w-1 before:bg-primary before:duration-300 before:ease-linear hover:bg-primary/5 hover:text-primary hover:before:h-full"
                onClick={onClickTrash}
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2813 2.75H12.875V2.21875C12.875 1.28125 12.125 0.53125 11.1875 0.53125H8.78125C7.84375 0.53125 7.09375 1.28125 7.09375 2.21875V2.75H4.6875C3.78125 2.75 3.03125 3.5 3.03125 4.40625V5.34375C3.03125 6.03125 3.4375 6.59375 4.03125 6.84375L4.53125 17.6562C4.59375 18.6875 5.40625 19.4687 6.4375 19.4687H13.4687C14.5 19.4687 15.3437 18.6562 15.375 17.6562L15.9375 6.8125C16.5312 6.5625 16.9375 5.96875 16.9375 5.3125V4.375C16.9375 3.5 16.1875 2.75 15.2813 2.75ZM8.53125 2.21875C8.53125 2.0625 8.65625 1.9375 8.8125 1.9375H11.2188C11.375 1.9375 11.5 2.0625 11.5 2.21875V2.75H8.5625V2.21875H8.53125ZM4.46875 4.40625C4.46875 4.28125 4.5625 4.15625 4.71875 4.15625H15.2813C15.4063 4.15625 15.5312 4.25 15.5312 4.40625V5.34375C15.5312 5.46875 15.4375 5.59375 15.2813 5.59375H4.71875C4.59375 5.59375 4.46875 5.5 4.46875 5.34375V4.40625V4.40625ZM13.5 18.0625H6.5C6.21875 18.0625 6 17.8437 6 17.5937L5.5 7H14.5312L14.0313 17.5937C14 17.8437 13.7812 18.0625 13.5 18.0625Z"
                    fill=""
                  ></path>
                  <path
                    d="M10 9.71875C9.625 9.71875 9.28125 10.0313 9.28125 10.4375V15.2813C9.28125 15.6563 9.59375 16 10 16C10.375 16 10.7187 15.6875 10.7187 15.2813V10.4062C10.7187 10.0312 10.375 9.71875 10 9.71875Z"
                    fill=""
                  ></path>
                  <path
                    d="M12.9065 10.3125C12.5315 10.2812 12.1877 10.5937 12.1565 10.9687L11.969 14.5625C11.9377 14.9375 12.2502 15.2812 12.6252 15.3125H12.6565C13.0315 15.3125 13.344 15.0312 13.344 14.6562L13.5315 11.0625C13.594 10.6562 13.2815 10.3437 12.9065 10.3125Z"
                    fill=""
                  ></path>
                  <path
                    d="M7.0627 10.3125C6.6877 10.3437 6.3752 10.6562 6.40645 11.0625L6.6252 14.6875C6.65645 15.0625 6.96895 15.3437 7.3127 15.3437H7.34395C7.71895 15.3125 8.03145 15 8.0002 14.5937L7.8127 10.9687C7.78145 10.5937 7.4377 10.2812 7.0627 10.3125Z"
                    fill=""
                  ></path>
                </svg>
                Trash
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default SideBarInbox;
