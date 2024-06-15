import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const AverageBarGraph = ({ data }) => {
  const chartRef = useRef(null);
  const [filter, setFilter] = useState("new"); // Default filter is "new"

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const labels = data.map((item) => {
        const date = new Date(item.timestamp);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      });
  
      const averageMSRPData = {
        new: calculateAverageMSRP(data, "new"),
        used: calculateAverageMSRP(data, "used"),
        cpo: calculateAverageMSRP(data, "cpo"),
      };
  
      const filteredData = averageMSRPData[filter];
  
      const filteredLabels = labels.filter(date => filteredData[date] > 0); // Filter labels where data value is greater than 0
  
      const chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: filteredLabels,
          datasets: [
            {
              label: `${capitalizeFirstLetter(filter)} Avg. MSRP`,
              data: filteredLabels.map((date) => filteredData[date] || 0),
              backgroundColor: getBackgroundColor(filter),
              borderColor: getBorderColor(filter),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return "$" + value.toLocaleString();
                },
              },
            },
          },
        },
      });
  
      return () => chart.destroy();
    }
  }, [data, filter]);
  

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getBackgroundColor = (filter) => {
    switch (filter) {
      case "new":
        return "rgba(54, 162, 235, 0.2)";
      case "used":
        return "rgba(255, 99, 132, 0.2)";
      case "cpo":
        return "rgba(75, 192, 192, 0.2)";
      default:
        return "rgba(54, 162, 235, 0.2)";
    }
  };

  const getBorderColor = (filter) => {
    switch (filter) {
      case "new":
        return "rgba(54, 162, 235, 1)";
      case "used":
        return "rgba(255, 99, 132, 1)";
      case "cpo":
        return "rgba(75, 192, 192, 1)";
      default:
        return "rgba(54, 162, 235, 1)";
    }
  };

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

const calculateAverageMSRP = (data, condition) => {
  const averageMSRP = {};
  const filteredData = data.filter((item) => item.condition === condition);

  filteredData.forEach((item) => {
    const date = new Date(item.timestamp);
    const key = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    if (!averageMSRP[key]) {
      averageMSRP[key] = 0;
    }
    averageMSRP[key] += parseFloat(item.price.replace(" USD", ""));
  });

  Object.keys(averageMSRP).forEach((key) => {
    averageMSRP[key] = averageMSRP[key] / filteredData.length;
  });

  return averageMSRP;
};

export default AverageBarGraph;
