import { useState } from "react";
import API from "../services/api";

function ComplaintForm({ refreshData }) {
  const [form, setForm] = useState({
    customer_name: "",
    product_name: "",
    batch_number: "",
    complaint_description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/complaints", form)
      .then(() => {
        alert("Complaint Submitted Successfully!");

        setForm({
          customer_name: "",
          product_name: "",
          batch_number: "",
          complaint_description: "",
        });

        refreshData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        marginTop: 40,
        padding: 25,
        background: "#1f1f1f",
        borderRadius: 10,
      }}
    >
      <h2>Register New Complaint</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="customer_name"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="product_name"
          placeholder="Product Name"
          value={form.product_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="batch_number"
          placeholder="Batch Number"
          value={form.batch_number}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="complaint_description"
          placeholder="Complaint Description"
          value={form.complaint_description}
          onChange={handleChange}
          required
          rows={4}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            marginTop: 15,
            padding: "12px 25px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Submit Complaint
        </button>

      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginTop: 12,
  borderRadius: 8,
  border: "1px solid gray",
  fontSize: 15,
};

export default ComplaintForm;