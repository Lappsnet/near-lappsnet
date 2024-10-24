"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function KeyStatisticsChart() {
  const data = {
    labels: [
      "Market Cap",
      "Global Users",
      "Stablecoin Deposits",
      "Commission Fees",
      "24/7 Access",
    ],
    datasets: [
      {
        label: "Statistics",
        data: [150, 25, 10, 1, 24], // Valores representativos (en billones, millones, millones, bajo costo, horas)
        backgroundColor: [
          "#00ED97",
          "#000000",
          "#008080",
          "#00A9A9",
          "#242829",
        ],
        borderColor: "#00ED97",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Esto ayuda a que el gráfico se ajuste bien en diferentes tamaños
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Statistics Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center px-4 md:px-0">
      <h1 className="text-3xl md:text-5xl text-center font-bold mt-4">
        XFY D-Money: $150B Market Cap, 25M Users, $10M Deposits
      </h1>
      <p className="text-base md:text-lg max-w-3xl text-center mt-4 text-transparent bg-clip-text leading-relaxed bg-gradient-to-r from-slate-800 to-slate-400">
        XFY D-Money is making digital finance accessible to everyone, offering
        competitive interest rates, extra-low fees, and 24/7 access to empower
        users globally.
      </p>

      <div
        className="w-full max-w-full md:max-w-5xl mt-8 md:mt-12"
        style={{ height: "400px" }}
      >
        <Bar
          data={data}
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              legend: {
                ...options.plugins.legend,
                position: "top",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
