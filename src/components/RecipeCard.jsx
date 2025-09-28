import React, { useState } from "react";

export default function RecipeCard({ recipe, onFavorite }) {
  const [favorites, setFavorites] = useState(recipe.favorites || 0);

  const handleFavoriteClick = () => {
    const newFavCount = favorites + 1;
    setFavorites(newFavCount);
    if (onFavorite) onFavorite(recipe.id, newFavCount); // update in parent if needed
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        width: "200px",
        backgroundColor: "#fff",
      }}
    >
      <img
  src={recipe.image}
  alt={recipe.name}
  style={{
    width: "100%",
    height: "150px", // fixed height
    objectFit: "cover", // ensures image covers the box without stretching
    borderRadius: "10px"
  }}
/>

      <h4>{recipe.name}</h4>
      <p>{recipe.description}</p>
      <p><strong>Category:</strong> {recipe.category}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <span>{favorites} ❤️</span>
        <button
          style={{
            cursor: "pointer",
            background: "transparent",
            border: "none",
            fontSize: "18px",
            color: "red",
          }}
          onClick={handleFavoriteClick}
        >
          ❤️
        </button>
      </div>
    </div>
  );
}
