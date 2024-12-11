import React, { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/firebase'; // Import your Firebase auth instance
import { signOut } from 'firebase/auth'; // Import signOut function
import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/navigation";
import {logout} from "@/slices/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      // Optionally, redirect to the home page or show a success message
      dispatch(logout());
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-gray-800">
          <Link href="/">CV Matcher</Link>
        </h1>
        
        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-6">
          <Link href="/signin" className="text-gray-700 hover:text-blue-600 font-medium">
            Sign In
          </Link>
          <Link href="/signup" className="text-gray-700 hover:text-blue-600 font-medium">
            Sign Up
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-blue-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <Link
            href="/signin"
            className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
