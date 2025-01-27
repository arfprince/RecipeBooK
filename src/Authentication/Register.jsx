import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = (e) => {
    e.preventDefault(); 
    let curEmail= email;
    let curPass= password;
    curEmail = curEmail.trim();
    curPass = curPass.trim();
    if (email.length<=0 || password.length<=0) {
      alert("Please fill out all fields.");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[curEmail]) {
      alert("Username already exists.");
      return;
    }
    users[curEmail] = { email: email, password: password };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration Successful! You can now Login.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="w-full max-w-md bg-stone-300 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Create an Account</h1>
        {/* Use onSubmit on the form */}
        <form onSubmit={handleRegister}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Register
            </button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
