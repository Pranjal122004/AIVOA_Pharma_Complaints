import { useEffect, useState } from "react";
import API from "../services/api";

function ComplaintTable({ refresh }) {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch complaints
  const fetchComplaints = () => {
    API.get("/complaints")
      .then((response) => {
        setComplaints(response.data);
      })
      .catch((error) => console.log(error));
  };

  // Update complaint status
  const updateStatus = (id, status) => {
    API.put(`/complaints/${id}/status?status=${status}`)
      .then(() => {
        fetchComplaints();
      })
      .catch((error) => console.log(error));
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "ID",
      "Customer",
      "Product",
      "Severity",
      "Status",
      "Category",
    ];

    const rows = complaints.map((item) => [
      item.id,
      item.customer_name,
      item.product_name,
      item.severity,
      item.status,
      item.category,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "complaints.csv";
    link.click();
  };

  useEffect(() => {
    fetchComplaints();
  }, [refresh]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>All Complaints</h2>

      <br />

      <input
        type="text"
        placeholder="Search by Customer or Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "350px",
          borderRadius: "8px",
          border: "1px solid gray",
          marginRight: "20px",
        }}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          marginRight: "20px",
        }}
      >
        <option value="All">All Status</option>
        <option value="New">New</option>
        <option value="under review">Under Review</option>
        <option value="closed">Closed</option>
      </select>

      <button
        onClick={exportCSV}
        style={{
          padding: "10px 18px",
          background: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Export CSV
      </button>

      <table
        style={{
          width: "100%",
          marginTop: "25px",
          borderCollapse: "collapse",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          backgroundColor: "white",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Customer</th>
            <th style={{ padding: "12px" }}>Product</th>
            <th style={{ padding: "12px" }}>Severity</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Category</th>
            <th style={{ padding: "12px" }}>AI Summary</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {complaints
            .filter((item) => {
              const matchesSearch =
                item.customer_name
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                item.product_name
                  .toLowerCase()
                  .includes(search.toLowerCase());

              const matchesStatus =
                statusFilter === "All" ||
                item.status.toLowerCase() === statusFilter.toLowerCase();

              return matchesSearch && matchesStatus;
            })
            .map((item) => (
              <tr
                key={item.id}
                style={{ borderBottom: "1px solid #ddd" }}
             >
               <td style={{ padding: "12px", textAlign: "center" }}>
                 {item.id}
               </td>

               <td style={{ padding: "12px", textAlign: "center" }}>
                 {item.customer_name}
               </td>

               <td style={{ padding: "12px", textAlign: "center" }}>
                 {item.product_name}
               </td>

               <td style={{ textAlign: "center" }}>
                  <span
                    style={{
                      padding: "5px 12px",
                      borderRadius: "20px",
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor:
                        item.severity === "High"
                          ? "#d32f2f"
                          : item.severity === "Medium"
                          ? "#f57c00"
                          : "#388e3c",
                    }}
                  >
                    {item.severity}
                </span>
            </td>

                <td style={{ textAlign: "center" }}>
                  <span
                    style={{
                      display: "inline-block",
                      minWidth: "110px",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "13px",
                      backgroundColor:
                        item.status.toLowerCase() === "closed"
                          ? "green"
                          : item.status.toLowerCase() === "under review"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td style={{ padding: "12px", textAlign: "center" }}>
                  {item.category}
                </td>

                <td
                  style={{
                    padding: "12px",
                    maxWidth: "250px",
                  }}
                >
                  {item.summary}
                </td>

                <td style={{ padding: "12px", textAlign: "center" }}>
                  {item.status.toLowerCase() === "new" && (
                    <button
                      onClick={() =>
                        updateStatus(item.id, "under review")
                      }
                      style={{
                        background: "orange",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Review
                    </button>
                  )}

                  {item.status.toLowerCase() === "under review" && (
                    <button
                      onClick={() =>
                        updateStatus(item.id, "closed")
                      }
                      style={{
                        background: "green",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Close
                    </button>
                  )}

                  {item.status.toLowerCase() === "closed" && (
                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      ✔ Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintTable;