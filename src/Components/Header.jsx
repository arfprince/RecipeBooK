import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header({isLoggedIn, setIsLoggedIn}) {
  
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  const handleLogOutClick = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("currentSessionUser");
    navigate("/");
  };
  const handleHomeClick = () => {
    navigate("/home");
  };
  return (
    <header className="bg-blue-600 text-white py-6 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wide">Foodie Finder</h1>
        {isLoggedIn === true && (
          <div className="flex gap-3">
            <button onClick={handleHomeClick} className="font-bold text-xl hover:text-yellow-400 transition-colors duration-300">
              Home
            </button>
            <button onClick={handleLogOutClick} className="font-bold text-xl hover:text-yellow-400 transition-colors duration-300">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
