import React from "react";

function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "15px",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        backgroundColor: "#e6f0fa", // very light tint of primary color
        color: "#024e8b", // Dark Cerulean text
        borderRadius: "8px", // subtle rounding for a modern feel
      }}
    >
      <p>© {new Date().getFullYear()} Recipe Manager. Built with ❤️ by The Duchess of Hackers.</p>
    </footer>
  );
}

export default Footer;
