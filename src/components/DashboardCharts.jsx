import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function DashboardCharts({ dashboard }) {
  const pieData = {
    labels: dashboard.category_data.map((item) => item.category),
    datasets: [
      {
        data: dashboard.category_data.map((item) => item.count),
        backgroundColor: [
          "#1976d2",
          "#388e3c",
          "#f57c00",
          "#d32f2f",
          "#7b1fa2",
        ],
      },
    ],
  };

  const barData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Complaints",
        data: [
          dashboard.high,
          dashboard.medium,
          dashboard.low,
        ],
        backgroundColor: [
          "#d32f2f",
          "#f57c00",
          "#388e3c",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "40px",
        flexWrap: "wrap",
        marginTop: "40px",
        marginBottom: "40px",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          Complaints by Category
        </h3>

        <Pie data={pieData} />
      </div>

      <div
        style={{
          width: "550px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          Severity Distribution
        </h3>

        <Bar data={barData} />
      </div>
    </div>
  );
}

export default DashboardCharts;