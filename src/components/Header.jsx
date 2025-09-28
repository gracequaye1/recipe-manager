import React, { useState } from "react";
import { Input } from "@progress/kendo-react-inputs";
import logo from "../assets/logo.png";

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "linear-gradient(135deg, #FFA17F, #00223E)",
        color: "#fff",
        borderBottom: "2px solid #ccc",
        flexWrap: "wrap",
      }}
    >
      {/* Logo box on the left */}
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          flexShrink: 0,
          backgroundImage: `url(${logo})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Centered Text */}
      <div
        style={{
          textAlign: "center",
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "bold" }}>
          🍲 Recipe Manager
        </h1>
        <p style={{ margin: "5px 0 0", fontSize: "1rem" }}>
          Organize, track, and enjoy your favorite recipes!
        </p>
      </div>

      {/* Search bar on the right */}
      <div style={{ marginLeft: "auto", minWidth: "200px" }}>
        <Input
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "100%" }}
        />
      </div>
    </header>
  );
}

export default Header;
