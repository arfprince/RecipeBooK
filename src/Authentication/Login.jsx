import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
function Login() {
    const navigate = useNavigate(); 
    const [password, setpassword] = useState("");
    const [email, setEmail] = useState("");
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const handleLogin = (e) => {
      e.preventDefault();
      
      let users = JSON.parse(localStorage.getItem("users")) || {};
      if (!users[email] || users[email].password !== password) {
        alert("Invalid username or password or Create a new account");
        return;
      }
      else if(users[email].password===password && users[email].email===email){
        localStorage.setItem("currentSessionUser", JSON.stringify(email));
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', isLoggedIn);
        return navigate('/home');
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="w-full max-w-md bg-stone-300 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login to Recipe App</h1>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoCapitalize='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoCapitalize='new-password'
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            >
              Login
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="./register" className="text-blue-600 text-sm">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login