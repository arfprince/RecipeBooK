import React, { useEffect } from "react";

function SaveRecipeFromSearch({ recipe}) {
  const {
    idMeal,
    strMeal,
    strArea,
    strCategory,
    strMealThumb,
    strInstructions = "",
  } = recipe;
  const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
  const currentSessionUser = localStorage.getItem("currentSessionUser");

  const currentSessionUserRecipes = usersData[currentSessionUser] || [];
  const newRecipe = {
    idMeal,
    strMeal,
    strArea,
    strCategory,
    strMealThumb,
    strInstructions,
  };

  const isAlreadySaved = currentSessionUserRecipes.some(
    (recipe) => recipe.idMeal === idMeal
  );
  if (isAlreadySaved) {
    alert("You have already saved this recipe");
  } else {
    currentSessionUserRecipes.push(newRecipe);
    usersData[currentSessionUser] = currentSessionUserRecipes;
    localStorage.setItem("usersData", JSON.stringify(usersData));
    alert("Recipe saved successfully");
  }
  return <></>;
}

export default SaveRecipeFromSearch;
