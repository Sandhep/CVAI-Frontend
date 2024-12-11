"use client";
import React, { useState,useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { useDispatch, useSelector} from "react-redux";
import { loginSuccess, loginFailure,} from "@/slices/authSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [Gloading, setGLoading] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Create account
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to sign-in page after success
      router.push("/signin");
    } catch (error) {
      // Handle specific Firebase error codes
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please sign in.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters long.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally{
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setGLoading(true);
      // Sign up with Google
      const usercredential = await signInWithPopup(auth, provider);

      dispatch(loginSuccess({
        uid: usercredential.user.uid,
        email: usercredential.user.email,
        displayName: usercredential.user.displayName,
        photoURL: usercredential.user.photoURL
      }));
      // Redirect to home page after success
      router.push("/");
    } catch (error) {
      // Handle errors
      dispatch(loginFailure(error.message));
      if (error.code === "auth/popup-closed-by-user") {
        setError("The sign-in popup was closed. Please try again.");
      } else {
        setError("Failed to sign up with Google. Please try again.");
      }
    }finally {
      setGLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-600 text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              className={`block w-full py-3 px-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none ${
                error.email ? "border-red-500" : "border-gray-300"
              }`}
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-600 text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="block w-full py-3 px-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none border-gray-300"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="block w-full py-3 px-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none border-gray-300"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <button
            className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-semibold hover:bg-gray-100 transition duration-300"
            onClick={handleGoogleSignUp}
            disabled={Gloading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.9 0 6.9 1.6 9 3.3l6.7-6.7C35.3 3 29.9 1 24 1 14.7 1 7 6.3 3.4 13.7l7.9 6.1C13.1 13.2 18.1 9.5 24 9.5z" />
              <path fill="#34A853" d="M24 47c6 0 11-2.1 14.7-5.8l-7.3-6c-2.1 1.4-4.8 2.2-7.4 2.2-5.8 0-10.7-3.9-12.4-9.3l-7.8 6C9 42.2 16 47 24 47z" />
              <path fill="#4A90E2" d="M46.5 24c0-1.3-.1-2.6-.3-3.8H24v8h12.9c-.6 3-2.5 5.5-5.2 7.1l7.3 6C42.9 37.2 46.5 31.1 46.5 24z" />
              <path fill="#FBBC05" d="M11.6 28.2c-.5-1.3-.8-2.7-.8-4.2s.3-2.9.8-4.2l-7.9-6C2.5 17.8 1 20.8 1 24s1.5 6.2 4.1 8.2l7.8-6z" />
            </svg>
            {Gloading ? "Signing In..." : "Continue with Google"}
          </button>
        </div>
        <div className="mt-4 text-center">
         <p className="text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
         </p>
        </div> 
      </div>
    </div>
  );
};

export default SignUp;
