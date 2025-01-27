import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between h-full bg-tranparent p-6">
      <h1 className="text-3xl font-bold text-center text-stone-300 underline mb-6">
        Welcome to Recipe App
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link to="./SearchRecipe">
          <button className="w-full py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-200 ease-in-out">
            Search for New Recipe
          </button>
        </Link>

        <Link to="./showSavedRecipes">
          <button className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 ease-in-out">
            Go to Your Saved Recipes
          </button>
        </Link>
      </div>
    </div>
  );
}
