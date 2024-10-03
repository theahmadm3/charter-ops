import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
  },
};

export function BarChart({ chartData, chartTitle }) {
  const activityLog = useSelector((state) => state?.users);

  // Chart options - add the title dynamically if passed as a prop
  const dynamicOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        display: Boolean(chartTitle),
        text: chartTitle || "",
      },
    },
  };

  return <Bar options={dynamicOptions} data={chartData} />;
}