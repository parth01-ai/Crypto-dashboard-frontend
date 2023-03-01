import React from "react";
import numeral from "numeral";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, plugins);

export const data = {
  type: "Pie",

  labels: ["Bitcoin" ,"Ethereum", "Tether"],

  datasets: [
    {
      label: "invest in $",
      data: [375, 375, 250],

      backgroundColor: [
        "rgba(54, 162, 235)",
        "rgba(255, 99, 132)",
        "rgb(83, 219, 142)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 0,
    },
  ],
};

const option = {
  plugins: {
    layout: {
      padding: 15,
    },
    legend: {
      position: "right",
      align: "center",
      labels: { fontColor: "Black" },
    },
    plugins: {
      datalabels: {
        formatter: (value) => numeral(value / 100000000).format(`E0,0`),
      },
    },
  },
};

export function PieChart() {
  return (
    <>
      <div className="piechart" style={{ width: "70%"}}>
        <Pie data={data} options={option} />
      </div>
    </>
  );
}
