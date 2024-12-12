"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/slices/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const userIconRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  
  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-300 w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800">
          <Link href="/">CV Matcher</Link>
        </h1>

        {/* Links or User Icon */}
        <div className="hidden md:flex items-center space-x-6">
          {isClient ? (
            user ? (
              <div className="relative">
                <button
                  ref={userIconRef}
                  onClick={handleDropdownToggle}
                  className="flex items-center focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isDropdownVisible}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      width="64"
                      height="64"
                      fill="currentColor"
                      className="w-10 h-10 rounded-full"
                    >
                      <circle cx="32" cy="32" r="32" fill="#ccc" />
                      <path
                        d="M32 36c-8.837 0-16 7.163-16 16v4h32v-4c0-8.837-7.163-16-16-16zm0-4c8.837 0 16-7.163 16-16S40.837 0 32 0 16 7.163 16 16s7.163 16 16 16z"
                        fill="#fff"
                      />
                    </svg>
                  )}
                </button>
                {isDropdownVisible && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg transition-opacity duration-200 ease-in-out"
                    onMouseLeave={() => setIsDropdownVisible(false)}
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )
          ) : (
            <div />
          )}
        </div>

        {/* Mobile User Icon */}
        <div className="md:hidden relative">
          {isClient ? (
            user ? (
              <button
                ref={userIconRef}
                onClick={toggleUserMenu}
                className="flex items-center focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    width="64"
                    height="64"
                    fill="currentColor"
                    className="w-10 h-10 rounded-full"
                  >
                    <circle cx="32" cy="32" r="32" fill="#ccc" />
                    <path
                      d="M32 36c-8.837 0-16 7.163-16 16v4h32v-4c0-8.837-7.163-16-16-16zm0-4c8.837 0 16-7.163 16-16S40.837 0 32 0 16 7.163 16 16s7.163 16 16 16z"
                      fill="#fff"
                    />
                  </svg>
                )}
              </button>
            ) : (
              <Link
                href="/signin"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Sign In
              </Link>
            )
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          )}

          {/* Dropdown Menu for Mobile */}
          {isUserMenuOpen && user && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
            >
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown Menu for Mobile (if user is signed in) */}
      {isMenuOpen && user && (
        <div className="md:hidden bg-white shadow-lg">
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
