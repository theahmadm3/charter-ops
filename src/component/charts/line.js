import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Line Chart",
    // },
  },
};

const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < labels.length; i++) {
    data.push(Math.floor(Math.random() * (100 - 40 + 1) + 0));
  }
  return data;
};

const data = {
  labels,
  datasets: [
    {
      label: "A",
      data: generateRandomData(),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "#1F6FE2",
    },
    {
      label: "B",
      data: generateRandomData(),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "#F3D25E",
    },
  ],
};

const LineChart = () => {
  return <Line options={options} data={data} />;
};

export default LineChart;
