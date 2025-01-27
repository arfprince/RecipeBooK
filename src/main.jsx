import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ShowSavedRecipes from "./Components/SavedRecipes/ShowSavedRecipes.jsx";
import SearchRecipe from "./Components/Search/SearchRecipe.jsx";
import Layout from "./Components/Layout.jsx";
import Home from "./Components/Home.jsx";
import Login from "./Authentication/Login.jsx";
import Register from "./Authentication/Register.jsx";
import { AuthProvider, useAuth } from "./Authentication/AuthContext.jsx";
import PrivateRoutes from "./Authentication/PrivateRoutes.jsx";
import { PrivateRouteForBlockingLoggingPage } from "./Authentication/PrivateRoutes.jsx";
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route
        index
        element={
          <PrivateRouteForBlockingLoggingPage>
            <Login />
          </PrivateRouteForBlockingLoggingPage>
        }
      ></Route>
      <Route path="register" element={<Register />}></Route>
      <Route
        path="home"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      ></Route>
      <Route
        path="/home/searchRecipe"
        element={
          <PrivateRoutes>
            <SearchRecipe />
          </PrivateRoutes>
        }
      />
      <Route
        path="/home/showSavedRecipes"
        element={
          <PrivateRoutes>
            <ShowSavedRecipes />
          </PrivateRoutes>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    {/* <StrictMode> */}
    <RouterProvider router={routes} />
    {/* </StrictMode> */}
  </AuthProvider>
);
