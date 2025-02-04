import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p className="text-sm">Made with ❤️ using React</p>
      </div>
    </footer>
  );
}

export default Footer