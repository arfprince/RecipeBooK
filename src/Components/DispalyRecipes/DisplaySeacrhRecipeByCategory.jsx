import React, { useState } from 'react'
function DisplaySeacrhRecipeByCategory({recipe}) {
    const { strMeal, strMealThumb} = recipe;
  return (
    <div className="max-w-sm rounded bg-stone-400 overflow-hidden shadow-lg">
      <img className="w-full" src={strMealThumb} alt={strMeal} />
      <div className="px-6 py-4">
        <div className="text-slate-700 font-bold text-xl mb-2">{strMeal}</div>
      </div>
    </div>
  )
}

export default DisplaySeacrhRecipeByCategory