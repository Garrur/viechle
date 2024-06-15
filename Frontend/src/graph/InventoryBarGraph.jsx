import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const InventoryBarGraph = ({ data }) => {
  const chartRef = useRef(null);
  const [filter, setFilter] = useState("new"); // Default filter is "new"

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const filteredData = data.filter((item) => item.condition === filter);
  
      const labels = filteredData.map((item) => {
        const date = new Date(item.timestamp);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      });
  
      const dataCounts = labels.map(
        (date) =>
          filteredData.filter(
            (item) =>
              `${new Date(item.timestamp).getMonth() + 1}/${new Date(
                item.timestamp
              ).getDate()}/${new Date(item.timestamp).getFullYear()}` === date
          ).length
      );
  
      const filteredLabels = labels.filter((_, index) => dataCounts[index] > 0); // Filter labels where count is greater than 0
  
      const chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: filteredLabels,
          datasets: [
            {
              label: `${filter.toUpperCase()} Units Count`,
              data: dataCounts.filter((_, index) => dataCounts[index] > 0),
              backgroundColor: "#c2410c", // Blue color
              borderColor: "rgba(194, 65, 12, 0.2)", // Border color
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 10, // Max value for y-axis
            },
          },
        },
      });
  
      return () => chart.destroy();
    }
  }, [data, filter]); // Watch for changes in `data` and `filter`
  

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // Check if `data` is not an array or empty
 

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mt-4 mb-2">
        <div
          className={`cursor-pointer py-2 px-4 rounded-md ${
            filter === "new"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleFilterChange("new")}
        >
          New
        </div>
        <div
          className={`cursor-pointer py-2 px-4 rounded-md ${
            filter === "used"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleFilterChange("used")}
        >
          Used
        </div>
        <div
          className={`cursor-pointer py-2 px-4 rounded-md ${
            filter === "cpo"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleFilterChange("cpo")}
        >
          CPO
        </div>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default InventoryBarGraph;
