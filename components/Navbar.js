import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-300 w-full">
      <div className="mx-auto px-4 py-4 flex justify-between items-center max-w-screen-xl">
        <h1 className="text-4xl font-bold">CV Matcher</h1>
        <div className="hidden md:flex space-x-4">
          <Link href="/signin" className="text-gray-600 hover:text-blue-500">Sign In</Link>
          <Link href="/signup" className="text-gray-600 hover:text-blue-500">Sign Up</Link>
        </div>
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-blue-500 focus:outline-none">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 