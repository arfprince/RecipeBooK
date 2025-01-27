import { useEffect, useState } from "react";
import Card from "./Card";

function ShowSavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  

  useEffect(() => {
    const currentSessionUser = localStorage.getItem('currentSessionUser');
    const usersData = JSON.parse(localStorage.getItem('usersData')) || {};
    const currentSessionUserRecipes = usersData[currentSessionUser] || [];
    setRecipes(currentSessionUserRecipes);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Card 
            key={recipe.idMeal} 
            recipe={recipe} 
            setRecipes={setRecipes} 
            recipes={recipes}
          />
        ))
      ) : (
        <p>You Haven't saved any recipe yet!</p>
      )}
    </div>
  );
}

export default ShowSavedRecipes;