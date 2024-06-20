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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul"];

const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < labels.length; i++) {
    data.push(Math.floor(Math.random() * (100 - 40 + 1) + 0));
  }
  return data;
};

export const data = {
  labels,
  datasets: [
    {
      label: "",
      data: generateRandomData(),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}
