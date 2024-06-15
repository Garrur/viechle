import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "./inventorySlice";
import InventoryBarGraph from "../graph/InventoryBarGraph";
import AverageBarGraph from "../graph/Average";
import Filters from "./Filters"; // Import Filters component
import Table from "./Table";

const Dashboard = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.items);
  const status = useSelector((state) => state.inventory.status);
  const filters = useSelector((state) => state.inventory.filters);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInventory());
    }
  }, [status, dispatch]);

  const filteredInventory = inventory.filter((item) => {
    const selectedMakes = filters.vehicleMake || [];
    const selectedDurations = filters.duration || [];
    const matchesMake =
      selectedMakes.length === 0 || selectedMakes.includes(item.brand);
    const matchesDuration =
      selectedDurations.length === 0 ||
      selectedDurations.some((duration) =>
        filterByDuration(item.timestamp, duration)
      );
    return matchesMake && matchesDuration;
  });

  const getFormattedDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const getUnitCount = (condition) => {
    return filteredInventory.filter((item) => item.condition === condition)
      .length;
  };

  const getTotalMSRP = (condition) => {
    const total = filteredInventory
      .filter((item) => item.condition === condition)
      .reduce(
        (acc, item) => acc + parseFloat(item.price.replace(" USD", "")),
        0
      );
    return total.toLocaleString();
  };

  const getAverageMSRP = (condition) => {
    const filteredData = filteredInventory.filter(
      (item) => item.condition === condition
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

  return (
    <>
      <div className="dashboard">
        <div className="flex justify-between items-center gap-4 w-1578 ">
          <h1 className="text-2xl font-bold ml-4 mt-4">Inventory</h1>

          <div className="flex justify-end">
            <Filters />
          </div>
        </div>
        <div className="flex justify-center my-8">
        <hr className="w-[95%] bg-gray-300 border-0 h-px" />
        </div>
        {status === "loading" && <div>Loading...</div>}
        {status === "succeeded" && (
          <div>
            <div>
              <div className="shadow-xl p-4">
                <h3 className="flex items-start gap-11 w-1367 h-23 shadow-md font-bold">
                  Recent Gathered Data {getFormattedDate()}
                </h3>
                <div className="flex items-center justify-between p-6 gap-4 w-full h-auto bg-white rounded-lg">
                  <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-300">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {getUnitCount("new")}
                      <div className="text-orange-500">New Units</div>
                    </h5>
                  </div>
                  <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-300">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      ${getTotalMSRP("new")}
                      <div className="text-orange-500">New MSRP</div>
                    </h5>
                  </div>
                  <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-300">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      ${getAverageMSRP("new")}
                      <div className="text-orange-500">New Avg. MSRP</div>
                    </h5>
                  </div>
                  <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-300">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {getUnitCount("used")}
                      <div className="text-orange-500">Used Units</div>
                    </h5>
                  </div>
                  <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-300">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      ${getTotalMSRP("used")}
                      <div className="text-orange-500">Used MSRP</div>
                    </h5>
                  </div>
                  <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-300">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      ${getAverageMSRP("used")}
                      <div className="text-orange-500">Used Avg. MSRP</div>
                    </h5>
                  </div>
                  <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-2xl hover:bg-gray-300">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {getUnitCount("cpo")}
                      <div className="text-orange-500">CPO</div>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 overflow-x-scroll">
              <div className="w-full mt-4">
                <div className="mt-2">
                  <h2 className="font-bold m-4">Inventory Count</h2>
                  <div className="shadow border-slate-200 border m-8 rounded-md">
                    <InventoryBarGraph data={filteredInventory} />
                  </div>
                </div>
              </div>

              <div className="w-full mt-4">
                <div className="mt-2">
                  <h2 className="font-bold m-4">Average MSRP</h2>
                  <div className="shadow border-slate-200 border m-8 rounded-md">
                    <AverageBarGraph data={filteredInventory} />
                  </div>
                </div>
              </div>

              <div className="w-full mt-2 ">
                <div className="mt-2">
                  <h2 className="font-bold m-4">History Log</h2>
                  <div className="shadow border-slate-200 border m-8 rounded-md">
                    <Table filteredInventory={filteredInventory} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {status === "failed" && <div>Error loading data.</div>}
      </div>
    </>
  );
};

const filterByDuration = (timestamp, duration) => {
  const date = new Date(timestamp);
  const now = new Date();
  switch (duration) {
    case "lastMonth":
      const lastMonth = new Date();
      lastMonth.setMonth(now.getMonth() - 1);
      return date > lastMonth;
    case "thisMonth":
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    case "last3Months":
      const last3Months = new Date();
      last3Months.setMonth(now.getMonth() - 3);
      return date > last3Months;
    case "last6Months":
      const last6Months = new Date();
      last6Months.setMonth(now.getMonth() - 6);
      return date > last6Months;
    case "thisYear":
      return date.getFullYear() === now.getFullYear();
    case "lastYear":
      return date.getFullYear() === now.getFullYear() - 1;
    default:
      return true;
  }
};

export default Dashboard;
