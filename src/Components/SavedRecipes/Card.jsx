import React, { useState } from "react";

export default function Card({ recipe, setRecipes, recipes }) {
  const [showMore, setShowMore] = useState(false);

  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.idMeal !== id);
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    const currentSessionUser = localStorage.getItem("currentSessionUser");  
    usersData[currentSessionUser] = updatedRecipes;
    localStorage.setItem("usersData", JSON.stringify(usersData));
    setRecipes(updatedRecipes);
  };

  return (
    <div className="max-w-sm rounded bg-stone-400 overflow-hidden shadow-lg">
      <img className="w-full" src={recipe.strMealThumb} alt={recipe.strMeal} />
      <div className="px-6 py-4">
        <div className="text-slate-700 font-bold text-xl mb-2">
          {recipe.strMeal}
        </div>
        <p className="text-gray-700 text-base">
          <strong>Category:</strong> {recipe.strCategory}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Area:</strong> {recipe.strArea}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
        <p className="text-gray-600">
          {showMore
            ? recipe.strInstructions
            : `${recipe.strInstructions.substring(0, 200)}...`}
        </p>

        <button
          onClick={() => setShowMore(!showMore)}
          className="text-blue-500 mt-2"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
        <div className="flex justify-between px-8 py-2">
          <button
            className="bg-red-600 rounded-md h-8 w-16 cursor-pointer"
            onClick={() => deleteRecipe(recipe.idMeal)}
          >
            Delete
          </button>
          <button className="bg-yellow-400 rounded-md h-8 w-16 cursor-pointer">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
