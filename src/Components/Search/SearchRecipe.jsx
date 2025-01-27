import React, { useState, useEffect } from "react";
import DisplaySearchRecipeByKeyword from "../DispalyRecipes/DisplaySearchRecipeByKeyword";
import DisplaySeacrhRecipeByCategory from "../DispalyRecipes/DisplaySeacrhRecipeByCategory";
const RecipeSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    const GetcategoryList = async () => {  
      const baseUrl = `https://www.themealdb.com/api/json/v1/1/list.php?c=list`;
      const response = await fetch(baseUrl);
      const data = await response.json();
      
      if (data.meals) {
        setCategories(data.meals);
      } else {
        setCategories([]);
      }
    };
    const AreaList = async () => {  
      const baseUrl = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
      const response = await fetch(baseUrl);
      const data = await response.json();
      
      if (data.meals) {
        setAreas(data.meals);
      } else {
        setAreas([]);
      }
    };
    AreaList();
    GetcategoryList();
  },[]);

  useEffect(() => {
    const GetCategoryItemsList = async () => {
      if(!selectedCategory.length) 
        return;
      
      const baseUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      const response = await fetch(baseUrl);
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    };
    GetCategoryItemsList();
  },[selectedCategory])

  useEffect(() => {
    const GetAreaItemsList = async () => {
      if(!selectedArea.length) 
        return;
      
      const baseUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
      const response = await fetch(baseUrl);
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    };
    GetAreaItemsList();
  },[selectedArea])

  useEffect(() => {
    const GetRecipeList = async () => {
      if (!searchKeyword && searchKeyword.length < 1) {
        setRecipes([]);
        return;
      }
      const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKeyword}`;
      const response = await fetch(baseUrl);
      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    };
    GetRecipeList();
  }, [searchKeyword]);

  return (
    <div className="min-h-screen bg-gray-800 p-6 text-gray-100">
      {/* Search Input by category */}
      <p className="text-center text-gray-300 font-medium pt-4 pb-1">Search by category</p>
      <div className="flex justify-center mb-8">
        {/* Dropdown for selecting category */}
        <select
          onChange={(e)=>{
            setSelectedArea("");
            setSearchKeyword("");
            setSelectedCategory(e.target.value);
          }}
          value={selectedCategory}
          className="w-full max-w-lg p-3 border border-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700 text-white"
        >
          <option value="" disabled>
            Select a Category
          </option>
          {categories.map((category) => (
            <option key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
      </div>
      
      {/* Search Input by area */}
      <p className="text-center text-gray-300 font-medium pt-4 pb-1">Search by Area</p>
      <div className="flex justify-center mb-8">
        {/* Dropdown for selecting category */}
        <select
          onChange={(e)=>{
            setSelectedCategory("");
            setSearchKeyword("");
            setSelectedArea(e.target.value);
          }}
          value={selectedArea}
          className="w-full max-w-lg p-3 border border-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700 text-white"
        >
          <option value="" disabled>
            Select an Area
          </option>
          { areas && areas?.map((area) => (
            <option key={area.strArea} value={area.strArea}>
              {area.strArea}
            </option>
          ))}
        </select>
      </div>

      {/* search as ur own  */}
      <p className="text-center text-gray-300 font-medium pt-2 pb-1">Or search as ur own</p>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for a recipe"
          value={searchKeyword}
          onChange={(e) => {
            setSelectedArea("");
            setSelectedCategory("")
            setSearchKeyword(e.target.value);
          }}
          className="w-full max-w-lg p-3 border border-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700 text-white placeholder-gray-400"
        />
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-300"
            >
              {searchKeyword.length > 0 ? (
                <DisplaySearchRecipeByKeyword recipe={recipe} />
              ) : (
                <DisplaySeacrhRecipeByCategory recipe={recipe} />
              )}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 text-lg font-medium">
            No recipes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;



// import React, { useReducer, useEffect } from "react";
// import DisplaySearchRecipeByKeyword from "../DispalyRecipes/DisplaySearchRecipeByKeyword";
// import DisplaySeacrhRecipeByCategory from "../DispalyRecipes/DisplaySeacrhRecipeByCategory";

// // Define initial state
// const initialState = {
//   searchKeyword: "",
//   recipes: [],
//   selectedArea: "",
//   areas: [],
//   selectedCategory: "",
//   categories: []
// };

// // Define action types
// const ACTION_TYPES = {
//   SET_CATEGORIES: 'SET_CATEGORIES',
//   SET_AREAS: 'SET_AREAS',
//   SET_SEARCH_KEYWORD: 'SET_SEARCH_KEYWORD',
//   SET_SELECTED_AREA: 'SET_SELECTED_AREA',
//   SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
//   SET_RECIPES: 'SET_RECIPES',
//   RESET_SEARCH: 'RESET_SEARCH'
// };

// // Reducer function
// function recipeReducer(state, action) {
//   switch (action.type) {
//     case ACTION_TYPES.SET_CATEGORIES:
//       return { ...state, categories: action.payload };
//     case ACTION_TYPES.SET_AREAS:
//       return { ...state, areas: action.payload };
//     case ACTION_TYPES.SET_SEARCH_KEYWORD:
//       return { 
//         ...state, 
//         searchKeyword: action.payload, 
//         selectedArea: "",
//         selectedCategory: ""
//       };
//     case ACTION_TYPES.SET_SELECTED_AREA:
//       return { 
//         ...state, 
//         selectedArea: action.payload, 
//         searchKeyword: "",
//         selectedCategory: ""
//       };
//     case ACTION_TYPES.SET_SELECTED_CATEGORY:
//       return { 
//         ...state, 
//         selectedCategory: action.payload, 
//         searchKeyword: "",
//         selectedArea: ""
//       };
//     case ACTION_TYPES.SET_RECIPES:
//       return { ...state, recipes: action.payload || [] };
//     case ACTION_TYPES.RESET_SEARCH:
//       return { 
//         ...state, 
//         searchKeyword: "",
//         selectedArea: "",
//         selectedCategory: "",
//         recipes: []
//       };
//     default:
//       return state;
//   }
// }

// const RecipeSearch = () => {
//   const [state, dispatch] = useReducer(recipeReducer, initialState);

//   // Fetch Categories
//   useEffect(() => {
//     const GetcategoryList = async () => {  
//       const baseUrl = `https://www.themealdb.com/api/json/v1/1/list.php?c=list`;
//       try {
//         const response = await fetch(baseUrl);
//         const data = await response.json();
        
//         if (data.meals) {
//           dispatch({ 
//             type: ACTION_TYPES.SET_CATEGORIES, 
//             payload: data.meals 
//           });
//         } else {
//           dispatch({ 
//             type: ACTION_TYPES.SET_CATEGORIES, 
//             payload: [] 
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         dispatch({ 
//           type: ACTION_TYPES.SET_CATEGORIES, 
//           payload: [] 
//         });
//       }
//     };

//     const AreaList = async () => {  
//       const baseUrl = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
//       try {
//         const response = await fetch(baseUrl);
//         const data = await response.json();
        
//         if (data.meals) {
//           dispatch({ 
//             type: ACTION_TYPES.SET_AREAS, 
//             payload: data.meals 
//           });
//         } else {
//           dispatch({ 
//             type: ACTION_TYPES.SET_AREAS, 
//             payload: [] 
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching areas:", error);
//         dispatch({ 
//           type: ACTION_TYPES.SET_AREAS, 
//           payload: [] 
//         });
//       }
//     };

//     AreaList();
//     GetcategoryList();
//   },[]);

//   // Fetch Recipes by Category
//   useEffect(() => {
//     const GetCategoryItemsList = async () => {
//       if(!state.selectedCategory.length) 
//         return;
      
//       const baseUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${state.selectedCategory}`;
//       try {
//         const response = await fetch(baseUrl);
//         const data = await response.json();
        
//         dispatch({ 
//           type: ACTION_TYPES.SET_RECIPES, 
//           payload: data.meals 
//         });
//       } catch (error) {
//         console.error("Error fetching category recipes:", error);
//         dispatch({ 
//           type: ACTION_TYPES.SET_RECIPES, 
//           payload: [] 
//         });
//       }
//     };
//     GetCategoryItemsList();
//   },[state.selectedCategory])

//   // Fetch Recipes by Area
//   useEffect(() => {
//     const GetAreaItemsList = async () => {
//       if(!state.selectedArea.length) 
//         return;
      
//       const baseUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${state.selectedArea}`;
//       try {
//         const response = await fetch(baseUrl);
//         const data = await response.json();
        
//         dispatch({ 
//           type: ACTION_TYPES.SET_RECIPES, 
//           payload: data.meals 
//         });
//       } catch (error) {
//         console.error("Error fetching area recipes:", error);
//         dispatch({ 
//           type: ACTION_TYPES.SET_RECIPES, 
//           payload: [] 
//         });
//       }
//     };
//     GetAreaItemsList();
//   },[state.selectedArea])

//   // Fetch Recipes by Keyword
//   useEffect(() => {
//     const GetRecipeList = async () => {
//       if (!state.searchKeyword || state.searchKeyword.length < 1) {
//         dispatch({ 
//           type: ACTION_TYPES.SET_RECIPES, 
//           payload: [] 
//         });
//         return;
//       }
      
//       const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${state.searchKeyword}`;
//       try {
//         const response = await fetch(baseUrl);
//         const data = await response.json();
        
//         dispatch({ 
//           type: ACTION_TYPES.SET_RECIPES, 
//           payload: data.meals 
//         });
//       } catch (error) {
//         console.error("Error fetching recipes by keyword:", error);
//         dispatch({ 
//           type: ACTION_TYPES.SET_RECIPES, 
//           payload: [] 
//         });
//       }
//     };
//     GetRecipeList();
//   }, [state.searchKeyword]);

//   return (
//     <div className="min-h-screen bg-gray-800 p-6 text-gray-100">
//       {/* Search Input by category */}
//       <p className="text-center text-gray-300 font-medium pt-4 pb-1">Search by category</p>
//       <div className="flex justify-center mb-8">
//         <select
//           onChange={(e) => dispatch({ 
//             type: ACTION_TYPES.SET_SELECTED_CATEGORY, 
//             payload: e.target.value 
//           })}
//           value={state.selectedCategory}
//           className="w-full max-w-lg p-3 border border-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700 text-white"
//         >
//           <option value="" disabled>
//             Select a Category
//           </option>
//           {state.categories.map((category) => (
//             <option key={category.strCategory} value={category.strCategory}>
//               {category.strCategory}
//             </option>
//           ))}
//         </select>
//       </div>
      
//       {/* Search Input by area */}
//       <p className="text-center text-gray-300 font-medium pt-4 pb-1">Search by Area</p>
//       <div className="flex justify-center mb-8">
//         <select
//           onChange={(e) => dispatch({ 
//             type: ACTION_TYPES.SET_SELECTED_AREA, 
//             payload: e.target.value 
//           })}
//           value={state.selectedArea}
//           className="w-full max-w-lg p-3 border border-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700 text-white"
//         >
//           <option value="" disabled>
//             Select an Area
//           </option>
//           { state.areas && state.areas?.map((area) => (
//             <option key={area.strArea} value={area.strArea}>
//               {area.strArea}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* search as ur own  */}
//       <p className="text-center text-gray-300 font-medium pt-2 pb-1">Or search as ur own</p>
//       <div className="flex justify-center mb-8">
//         <input
//           type="text"
//           placeholder="Search for a recipe"
//           value={state.searchKeyword}
//           onChange={(e) => dispatch({ 
//             type: ACTION_TYPES.SET_SEARCH_KEYWORD, 
//             payload: e.target.value 
//           })}
//           className="w-full max-w-lg p-3 border border-gray-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700 text-white placeholder-gray-400"
//         />
//       </div>

//       {/* Recipe Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {state.recipes && state.recipes.length > 0 ? (
//           state.recipes.map((recipe) => (
//             <div
//               key={recipe.idMeal}
//               className="bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-300"
//             >
//               {state.searchKeyword.length > 0 ? (
//                 <DisplaySearchRecipeByKeyword recipe={recipe} />
//               ) : (
//                 <DisplaySeacrhRecipeByCategory recipe={recipe} />
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-400 text-lg font-medium">
//             No recipes found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecipeSearch;