const SideBarInbox = () => {
  return (
    <>
      <div className="fixed bottom-0 top-22.5 z-999 flex w-[230px] -translate-x-[120%] flex-col rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark lg:static lg:w-1/5 lg:translate-x-0 lg:border-none false">
        <button className="absolute -right-20 z-99999 block rounded-md border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden false">
          <svg
            className="h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path d="M 22.1875 2.28125 L 20.78125 3.71875 L 25.0625 8 L 4 8 L 4 10 L 25.0625 10 L 20.78125 14.28125 L 22.1875 15.71875 L 28.90625 9 Z M 9.8125 16.28125 L 3.09375 23 L 9.8125 29.71875 L 11.21875 28.28125 L 6.9375 24 L 28 24 L 28 22 L 6.9375 22 L 11.21875 17.71875 Z"></path>
          </svg>
        </button>
        <div className="px-4 pt-4">
          <button className="flex w-full rounded-md bg-primary px-5.5 py-2.5 font-medium text-white">
            Compose
          </button>
        </div>
        <div className="no-scrollbar max-h-full overflow-auto py-6">
          <ul className="flex flex-col gap-2">
            <li>
              <a
                className="relative flex items-center gap-2.5 px-5 py-2.5 font-medium duration-300 ease-linear before:absolute before:left-0 before:h-0 before:w-1 before:bg-primary before:duration-300 before:ease-linear hover:bg-primary/5 hover:text-primary hover:before:h-full"
                href="/"
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
                href="/"
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
                href="/"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4348_2010)">
                    <path
                      d="M10.4687 10.3125V5.28125C10.4687 4.90625 10.1562 4.59375 9.78125 4.59375C9.40625 4.59375 9.09375 4.90625 9.09375 5.28125V10.5938C9.09375 10.7813 9.15625 10.9687 9.28125 11.0937L12.75 14.625C12.875 14.75 13.0625 14.8437 13.25 14.8437C13.4375 14.8437 13.5937 14.7813 13.75 14.6563C14.0312 14.375 14.0312 13.9375 13.75 13.6562L10.4687 10.3125Z"
                      fill=""
                    ></path>
                    <path
                      d="M10 0.46875C4.78125 0.46875 0.5625 4.75 0.5625 10C0.5625 15.25 4.8125 19.5312 10 19.5312C15.1875 19.5312 19.4375 15.25 19.4375 10C19.4375 4.75 15.2188 0.46875 10 0.46875ZM10 18.125C5.5625 18.125 1.9375 14.4688 1.9375 10C1.9375 5.53125 5.5625 1.875 10 1.875C14.4375 1.875 18.0625 5.53125 18.0625 10C18.0625 14.4688 14.4375 18.125 10 18.125Z"
                      fill=""
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_4348_2010">
                      <rect width="20" height="20" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                Snoozed
              </a>
            </li>
            <li>
              <a
                className="relative flex items-center gap-2.5 px-5 py-2.5 font-medium duration-300 ease-linear before:absolute before:left-0 before:h-0 before:w-1 before:bg-primary before:duration-300 before:ease-linear hover:bg-primary/5 hover:text-primary hover:before:h-full"
                href="/"
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
                    d="M18.625 9.28125C18.5 9.0625 18.3125 8.90625 18.0937 8.78125L3.68747 0.718748C3.43747 0.593748 3.15622 0.531248 2.87497 0.562498C2.59372 0.593748 2.34372 0.687498 2.12497 0.874998C1.90622 1.0625 1.74997 1.3125 1.68747 1.5625C1.59372 1.84375 1.62497 2.125 1.71872 2.40625L4.40622 10L1.71872 17.5937C1.62497 17.875 1.62497 18.1562 1.68747 18.4062C1.74997 18.6875 1.90622 18.9062 2.12497 19.0937C2.34372 19.2812 2.59372 19.375 2.87497 19.4062C2.90622 19.4062 2.96872 19.4062 2.99997 19.4062C3.21872 19.4062 3.46872 19.3437 3.68747 19.2187L18.0937 11.1562C18.3125 11.0312 18.5 10.875 18.625 10.6562C18.75 10.4375 18.8125 10.1875 18.8125 9.96875C18.8125 9.75 18.75 9.5 18.625 9.28125ZM3.06247 1.96875L16.125 9.28125H5.65622L3.06247 1.96875ZM3.06247 18.0312L5.68747 10.7187H16.1562L3.06247 18.0312Z"
                    fill=""
                  ></path>
                </svg>
                Sent
              </a>
            </li>
            <li>
              <a
                className="relative flex items-center gap-2.5 px-5 py-2.5 font-medium duration-300 ease-linear before:absolute before:left-0 before:h-0 before:w-1 before:bg-primary before:duration-300 before:ease-linear hover:bg-primary/5 hover:text-primary hover:before:h-full"
                href="/"
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
                    d="M7.21875 18.0625H3.21875C2.90625 18.0625 2.65625 17.8125 2.65625 17.5V2.5C2.65625 2.1875 2.90625 1.9375 3.21875 1.9375H10.2812V5.9375C10.2812 6.3125 10.5938 6.65625 11 6.65625H14.9688V8.75C14.9688 9.125 15.2812 9.46875 15.6875 9.46875C16.0938 9.46875 16.4062 9.15625 16.4062 8.75V6.125C16.4062 5.78125 16.25 5.4375 16 5.1875L11.625 0.937499C11.375 0.687499 11.0312 0.562499 10.6875 0.562499H3.1875C2.125 0.531249 1.25 1.4375 1.25 2.5V17.5C1.25 18.5625 2.125 19.4688 3.21875 19.4688H7.25C7.625 19.4688 7.96875 19.1562 7.96875 18.75C7.96875 18.3438 7.625 18.0625 7.21875 18.0625ZM11.6562 2.9375L14 5.25H11.6562V2.9375Z"
                    fill=""
                  ></path>
                  <path
                    d="M18.5 11.75C18.25 11.5 18 11.25 17.75 11C17.5312 10.7813 17.3125 10.5312 17.0625 10.3125C16.9375 10.1563 16.75 10.0313 16.5313 10C16.2813 9.96875 16.0313 10.0312 15.8438 10.1875L10.4062 15.5938C10.25 15.75 10.1562 15.9062 10.0937 16.0938L9.3125 18.4687L9.1875 18.8438L9.40625 19.125C9.5 19.25 9.6875 19.4375 10.0312 19.4375H10.1563L12.625 18.625C12.8125 18.5625 13 18.4687 13.125 18.3125L18.5 12.9688C18.6562 12.8125 18.75 12.5938 18.75 12.3438C18.75 12.125 18.6562 11.9062 18.5 11.75ZM16.4062 11.625C16.5312 11.75 16.6562 11.875 16.75 12C16.875 12.125 17 12.25 17.125 12.375L16.7813 12.7188L16.0625 12L16.4062 11.625ZM12.1563 17.3125L11.0625 17.6562L11.4062 16.5625L15.0312 12.9375L15.75 13.6563L12.1563 17.3125Z"
                    fill=""
                  ></path>
                </svg>
                Drafts
              </a>
            </li>
            <li>
              <a
                className="relative flex items-center gap-2.5 px-5 py-2.5 font-medium duration-300 ease-linear before:absolute before:left-0 before:h-0 before:w-1 before:bg-primary before:duration-300 before:ease-linear hover:bg-primary/5 hover:text-primary hover:before:h-full"
                href="/"
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
                    d="M8.46875 10.5625H6.78125C6.40625 10.5625 6.0625 10.875 6.0625 11.2812C6.0625 11.6875 6.375 12 6.78125 12H8.46875C8.84375 12 9.1875 11.6875 9.1875 11.2812C9.1875 10.875 8.875 10.5625 8.46875 10.5625Z"
                    fill=""
                  ></path>
                  <path
                    d="M13.1875 10.5625H11.5C11.125 10.5625 10.7812 10.875 10.7812 11.2812C10.7812 11.6875 11.0937 12 11.5 12H13.1875C13.5625 12 13.9062 11.6875 13.9062 11.2812C13.9062 10.875 13.5938 10.5625 13.1875 10.5625Z"
                    fill=""
                  ></path>
                  <path
                    d="M17.8125 8.84375V5.15625C18.125 5.09375 18.3438 4.8125 18.3438 4.46875C18.3438 4.09375 18.0312 3.75 17.625 3.75H16.5625C16.1875 3.75 15.8438 4.0625 15.8438 4.46875C15.8438 4.78125 16.0625 5.0625 16.375 5.15625V8.6875H16C15.625 7.34375 14.375 6.3125 12.9062 6.3125H7.125C5.65625 6.3125 4.40625 7.3125 4.03125 8.6875H3.0625C1.6875 8.6875 0.53125 9.8125 0.53125 11.2188V11.3438C0.53125 12.7188 1.65625 13.875 3.0625 13.875H4.03125C4.40625 15.2188 5.65625 16.25 7.125 16.25H12.9375C14.4062 16.25 15.6562 15.25 16.0312 13.875H16.9375C18.3125 13.875 19.4688 12.75 19.4688 11.3438V11.2188C19.4688 10.125 18.75 9.1875 17.8125 8.84375ZM1.96875 11.3438V11.2188C1.96875 10.5938 2.46875 10.0938 3.09375 10.0938H3.9375V12.4375H3.0625C2.4375 12.4375 1.96875 11.9375 1.96875 11.3438ZM12.9375 14.8125H7.125C6.125 14.8125 5.3125 14 5.3125 13V9.53125C5.3125 8.53125 6.125 7.71875 7.125 7.71875H12.9375C13.9375 7.71875 14.75 8.53125 14.75 9.53125V13C14.7188 14 13.9062 14.8125 12.9375 14.8125ZM18.0625 11.3438C18.0625 11.9688 17.5625 12.4688 16.9375 12.4688H16.125V10.125H16.9375C17.5625 10.125 18.0625 10.625 18.0625 11.25V11.3438Z"
                    fill=""
                  ></path>
                </svg>
                Spam
              </a>
            </li>
            <li>
              <a
                className="relative flex items-center gap-2.5 px-5 py-2.5 font-medium duration-300 ease-linear before:absolute before:left-0 before:h-0 before:w-1 before:bg-primary before:duration-300 before:ease-linear hover:bg-primary/5 hover:text-primary hover:before:h-full"
                href="/"
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
