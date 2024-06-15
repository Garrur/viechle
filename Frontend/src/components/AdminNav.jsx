import React from "react";

const AdminNav = () => {
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between bg-gray-800 p-3 text-white">
          <div className="flex gap-2">
            <div className="flex items-center">
              <img
                src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1718427600&semt=sph"
                alt="Logo"
                className="w-6 h-6 mr-2"
              />
              <span className="font-bold">Admin Console</span>
            </div>
            <div className="bg-white text-black py-0.5 px-1 text-xs rounded-2xl cursor-pointer">
              ADMIN VIEW
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-orange-500 gap-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288"
                />
              </svg>

              <span>Support</span>
            </div>

            <div className="shadow-md rounded-sm bg-gray-800">
              <button
                data-dropdown
                className="flex items-center px-2 py-1 focus:outline-none bg-gray-600 rounded-lg"
                type="button"
                x-data="{ open: false }"
                onClick={() =>
                  document
                    .querySelector("[data-dropdown-items]")
                    .classList.toggle("hidden")
                }
              >
                <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-md">
                  <svg
                    className="absolute w-10 h-10 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>

                <span className="ml-2 text-xs text-white hidden md:inline-block">
                  Jane
                </span>
                <svg
                  className="fill-current w-2 text-orange-500 ml-2"
                  viewBox="0 0 407.437 407.437"
                >
                  <path d="M386.258 91.567l-182.54 181.945L21.179 91.567 0 112.815 203.718 315.87l203.719-203.055z" />
                </svg>

                <div
                  data-dropdown-items
                  className="hidden text-xs text-left absolute top-0 right-0 mt-12 mr-2 bg-white rounded border border-gray-400 shadow"
                >
                  <ul>
                    <li className="px-3 py-2 bg-gray-600 rounded-md">
                      <a href="#">Log out</a>
                    </li>
                  </ul>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
