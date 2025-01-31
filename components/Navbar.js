"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { auth } from "@/firebase"
import { signOut } from "firebase/auth"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { logout } from "@/slices/authSlice"
import { User, UserCircle, LogOut } from "lucide-react"

const useFocusTrap = (ref, isActive) => {
  useEffect(() => {
    if (!isActive || !ref.current) return

    const focusableElements = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    ref.current.addEventListener("keydown", handleKeyDown)
    firstElement.focus()

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [isActive, ref])
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const userIconRef = useRef(null)
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)

  const dispatch = useDispatch()
  const router = useRouter()

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle desktop dropdown
      if (
        isDropdownVisible &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !userIconRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false)
      }

      // Handle mobile menu
      if (
        isUserMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !userIconRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownVisible, isUserMenuOpen])

  useFocusTrap(dropdownRef, isDropdownVisible)

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(logout())
      router.push("/signin")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-300 w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link href="/">CV Matcher</Link>
        </h1>

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
                      src={user.photoURL || "/placeholder.svg"}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                  ) : (
                    <User className="w-10 h-10 p-1 rounded-full border border-gray-300" />
                  )}
                </button>
                {isDropdownVisible && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg transition-opacity duration-200 ease-in-out"
                  >
                    <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <UserCircle className="mr-2" size={18} />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="mr-2" size={18} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/signin" className="text-gray-700 hover:text-blue-600 font-medium">
                  Sign In
                </Link>
                <Link href="/signup" className="text-gray-700 hover:text-blue-600 font-medium">
                  Sign Up
                </Link>
              </>
            )
          ) : (
            <div />
          )}
        </div>

        <div className="md:hidden relative">
          {isClient ? (
            user ? (
              <button ref={userIconRef} onClick={toggleUserMenu} className="flex items-center focus:outline-none">
                {user.photoURL ? (
                  <img
                    src={user.photoURL || "/placeholder.svg"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                ) : (
                  <User className="w-10 h-10 p-1 rounded-full border border-gray-300" />
                )}
              </button>
            ) : (
              <Link href="/signin" className="text-gray-700 hover:text-blue-600 font-medium">
                Sign In
              </Link>
            )
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          )}

          {isUserMenuOpen && user && (
            <div 
              ref={mobileMenuRef}
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
            >
              <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <UserCircle className="mr-2" size={18} />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="mr-2" size={18} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && user && (
        <div className="md:hidden bg-white shadow-lg">
          <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <UserCircle className="mr-2" size={18} />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="mr-2" size={18} />
            Sign Out
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar