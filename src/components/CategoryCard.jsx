import React from "react";

export default function CategoryCard({ category, count }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "15px 20px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        minWidth: "120px",
        textAlign: "center",
        flex: "1 1 120px",
      }}
    >
      <h4 style={{ margin: "0 0 8px", fontSize: "16px", color: "#333" }}>{category}</h4>
      <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>{count} {count === 1 ? "item" : "items"}</p>
    </div>
  );
}
