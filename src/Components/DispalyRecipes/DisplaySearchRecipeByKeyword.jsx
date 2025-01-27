import { useState } from "react";
import SaveRecipeFromSearch from "../Search/SaveRecipeFromSearch";
export default function DisplaySearchRecipeByKeyword({ recipe }) {
  const { idMeal, strMeal, strArea, strCategory, strMealThumb, strInstructions = "" } = recipe;
  const [showMore, setShowMore] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="max-w-sm rounded bg-stone-400 overflow-hidden shadow-lg">
      <img className="w-full" src={strMealThumb} alt={strMeal} />
      <div className="px-6 py-4">
        <div className="text-slate-700 font-bold text-xl mb-2">{strMeal}</div>
        <p className="text-gray-700 text-base">
          <strong>Category:</strong> {strCategory}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Area:</strong> {strArea}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
        <p className="text-gray-600">
          {
            (showMore && strInstructions) ? strInstructions 
              : (strInstructions) ? `${strInstructions.substring(0, 200)}...` 
              : "No instructions available"
          }
        </p>

        <button onClick={()=>setShowMore(!showMore)} className="text-blue-500 mt-2">
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* Save Recipe Button */}
      <div className="px-6 pt-4 pb-2">
        <button id="${idMeal}"
          onClick={() => setIsSaved(true)}
          className={`w-full py-2 mt-4 text-white rounded-lg ${
            isSaved ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          } transition duration-200 ease-in-out`}
          disabled={isSaved}
        >
          {isSaved ? "Recipe Saved" : "Save Recipe"}
          {isSaved && <SaveRecipeFromSearch recipe={recipe} />}
        </button>
      </div>
    </div>
  );
}