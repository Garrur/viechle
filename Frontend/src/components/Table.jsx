import React, { useState } from "react";

const Table = ({ filteredInventory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page state
  const itemsPerPageOptions = [5, 10, 15, 20];

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "short", day: "2-digit", year: "2-digit" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  const getUnitCount = (condition, date) => {
    return filteredInventory.filter(
      (item) =>
        item.condition === condition && formatDate(item.timestamp) === date
    ).length;
  };

  const getTotalMSRP = (condition, date) => {
    const total = filteredInventory
      .filter(
        (item) =>
          item.condition === condition && formatDate(item.timestamp) === date
      )
      .reduce(
        (acc, item) => acc + parseFloat(item.price.replace(" USD", "")),
        0
      );
    return total.toLocaleString();
  };

  const getAverageMSRP = (condition, date) => {
    const filteredData = filteredInventory.filter(
      (item) =>
        item.condition === condition && formatDate(item.timestamp) === date
    );
    if (filteredData.length === 0) return "0";
    const total = filteredData.reduce(
      (acc, item) => acc + parseFloat(item.price.replace(" USD", "")),
      0
    );
    const average = total / filteredData.length;
    return average.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const uniqueDates = [
    ...new Set(filteredInventory.map((item) => formatDate(item.timestamp))),
  ];

  const totalPages = Math.ceil(uniqueDates.length / itemsPerPage);
  const paginatedDates = uniqueDates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-4 mt-3 ml-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>

              <th scope="col" className=" py-3">
                Date
              </th>
            </div>
            <th scope="col" className="px-6 py-3">
              New Inventory
            </th>
            <th scope="col" className="px-6 py-3">
              New Total MSRP
            </th>
            <th scope="col" className="px-6 py-3">
              New Average MSRP
            </th>
            <th scope="col" className="px-6 py-3">
              Used Inventory
            </th>
            <th scope="col" className="px-6 py-3">
              Used Total MSRP
            </th>
            <th scope="col" className="px-6 py-3">
              Used Average MSRP
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedDates.map((date) => (
            <tr
              key={date}
              className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-200"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {date}
              </td>
              <td className="px-6 py-4">{getUnitCount("new", date)}</td>
              <td className="px-6 py-4">${getTotalMSRP("new", date)}</td>
              <td className="px-6 py-4">${getAverageMSRP("new", date)}</td>
              <td className="px-6 py-4">{getUnitCount("used", date)}</td>
              <td className="px-6 py-4">${getTotalMSRP("used", date)}</td>
              <td className="px-6 py-4">${getAverageMSRP("used", date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="flex items-center justify-end pt-4 gap-4"
        aria-label="Table navigation"
      >
        <div className="flex items-center">
          <span className="text-sm font-normal text-gray-500">
            Rows per page:
          </span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="mx-2 py-1 px-2  rounded"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center ">
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={handlePrevPage}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white  rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              onClick={handleNextPage}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              disabled={currentPage === totalPages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Table;
