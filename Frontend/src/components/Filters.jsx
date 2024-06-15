import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVehicleMake, setDuration } from "./inventorySlice";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.inventory.filters);
  const inventory = useSelector((state) => state.inventory.items);

  const [selectedMakes, setSelectedMakes] = useState(filters.vehicleMake || []);
  const [selectedDurations, setSelectedDurations] = useState(
    filters.duration || []
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMakeChange = (make) => {
    setSelectedMakes((prev) => {
      if (prev.includes(make)) {
        return prev.filter((item) => item !== make);
      } else {
        return [...prev, make];
      }
    });
  };

  const handleDurationChange = (duration) => {
    setSelectedDurations((prev) => {
      if (prev.includes(duration)) {
        return prev.filter((item) => item !== duration);
      } else {
        return [...prev, duration];
      }
    });
  };

  const applyFilters = () => {
    dispatch(setVehicleMake(selectedMakes));
    dispatch(setDuration(selectedDurations));
  };

  const removeFilters = () => {
    setSelectedMakes([]);
    setSelectedDurations([]);
    dispatch(setVehicleMake([]));
    dispatch(setDuration([]));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="mt-4 mr-4">
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="p-2 bg-white text-black shadow-md rounded-md flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
            <div>Filters Data By</div>
          </button>

          <div className="">
            {isMenuOpen && (
              <div className="fixed top-0 left-0 w- h-full bg-white border-r border-gray-200 shadow-md z-50 p-4 overflow-y-auto max-h-screen">
                <button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 text-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
                <div className="">
                  <div className=" ">
                    <h2 className="text-xl font-bold ">Filter Data By</h2>
                    <div className="flex justify-center mb-4">
                      <hr className="w-[95%] bg-gray-300 border-0 h-px" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2  ">Make</h3>
                      {[...new Set(inventory.map((item) => item.brand))].map(
                        (make) => (
                          <label key={make} className="block mb-1">
                            <input
                              type="checkbox"
                              checked={selectedMakes.includes(make)}
                              onChange={() => handleMakeChange(make)}
                              className="mr-2"
                            />
                            {make}
                          </label>
                        )
                      )}
                    </div>
                    <div className="flex justify-center my-8">
                      <hr className="w-[95%] bg-gray-300 border-0 h-px" />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-bold mb-2 ">Duration</h3>
                      {[
                        "lastMonth",
                        "thisMonth",
                        "last3Months",
                        "last6Months",
                        "thisYear",
                        "lastYear",
                      ].map((duration) => (
                        <label key={duration} className="block mb-1">
                          <input
                            type="checkbox"
                            checked={selectedDurations.includes(duration)}
                            onChange={() => handleDurationChange(duration)}
                            className="mr-2"
                          />
                          {duration
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                      ))}
                    </div>
                    <div className="mt-2 gap-2 flex justify-between">
                      <button
                        onClick={applyFilters}
                        className="px-4 py-2 bg-orange-500 text-sm text-white rounded-md"
                      >
                        Apply Filter
                      </button>
                      <button
                        onClick={removeFilters}
                        className="px-4 py-2 border border-orange-500 text-sm text-orange-500 rounded-md"
                      >
                        Remove All Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
