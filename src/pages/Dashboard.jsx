import React, { useState, useEffect } from "react";
import { Button } from "@progress/kendo-react-buttons";

import Header from "../components/Header";
import Footer from "../components/Footer";
import StatsCard from "../components/StatsCard";
import CategoryCard from "../components/CategoryCard";
import RecipeCard from "../components/RecipeCard";
import AddRecipeForm from "../components/AddRecipeForm";
import RecipeList from "../components/RecipeList";
import RecipeFilter from "../components/RecipeFilter";

const initialRecipes = [
  { id: 1, name: "Pancakes", description: "Fluffy and sweet", category: "Breakfast", image: "/images/pancakes.jpg", favorites: 5 },
  { id: 2, name: "Omelette", description: "Cheese & veggies", category: "Breakfast", image: "/images/omelette.jpg", favorites: 10 },
  { id: 3, name: "Burger", description: "Juicy beef or veggie", category: "Lunch", image: "/images/burger.jpg", favorites: 20 },
  { id: 4, name: "Pizza", description: "Cheesy and hot", category: "Lunch", image: "/images/pizza.png", favorites: 6 },
  { id: 5, name: "Pasta", description: "Tomato sauce", category: "Dinner", image: "/images/pasta.jpg", favorites: 15 },
  { id: 6, name: "Steak", description: "Juicy and tender", category: "Dinner", image: "/images/Steak.jpg", favorites: 25 },
];

export default function Dashboard() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDialog, setShowDialog] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((r) =>
        (selectedCategory === "All" || r.category === selectedCategory) &&
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [selectedCategory, recipes, searchTerm]);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => {
    setShowDialog(false);
    setEditingRecipe(null);
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    openDialog();
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
    setNotification({ type: "success", message: "Recipe deleted successfully!" });
  };

  const saveRecipe = (data) => {
    const recipeData = {
      ...data,
      id: editingRecipe ? editingRecipe.id : Date.now(),
      image: data.image || "",
      favorites: data.favorites || 0,
    };

    if (!recipeData.name || !recipeData.description || !recipeData.category || recipeData.category === "Select a category") {
      setNotification({ type: "warning", message: "Please fill in all fields!" });
      return;
    }

    const updatedRecipes = editingRecipe
      ? recipes.map((r) => (r.id === editingRecipe.id ? recipeData : r))
      : [...recipes, recipeData];

    setRecipes(updatedRecipes);
    setNotification({ type: "success", message: editingRecipe ? "Recipe updated successfully!" : "Recipe added successfully!" });
    closeDialog();
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark-theme" : ""}`}>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Dark Mode Toggle */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <Button look="outline" themeColor="secondary" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      {/* Stats + Filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px", alignItems: "center" }}>
        <StatsCard title="Total Recipes" count={recipes.length} />
        <RecipeFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </div>

      {/* Category Cards */}
      <div style={{ display: "flex", gap: "15px", marginTop: "20px", flexWrap: "wrap" }}>
        {["Breakfast", "Lunch", "Dinner"].map((cat) => (
          <CategoryCard key={cat} category={cat} count={recipes.filter((r) => r.category === cat).length} />
        ))}
      </div>

      {/* Top Recipes */}
      <div style={{ marginTop: "20px" }}>
        <h3>Top Recipes</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {recipes.slice(0, 6).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onEdit={handleEdit} onDelete={deleteRecipe} />
          ))}
        </div>
      </div>

      {/* Add Recipe Button */}
      <Button style={{ marginTop: "20px" }} onClick={openDialog} themeColor="primary">
        Add Recipe
      </Button>

      {/* Add/Edit Recipe Dialog */}
      {showDialog && (
        <AddRecipeForm onSubmit={saveRecipe} onCancel={closeDialog} initialValues={editingRecipe} />
      )}

      <Footer />
    </div>
  );
}
