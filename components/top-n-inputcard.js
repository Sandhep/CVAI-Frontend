"use client"
import React, { useState } from 'react';

const InputCard = () => {
  const [count, setCount] = useState(0); // State to track the count
  const [selectedScore, setSelectedScore] = useState('Cosine Similarity'); // State to track the selected score type

  const increment = () => {
    setCount(prevCount => prevCount + 1); // Increment the count
  };

  const decrement = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0)); // Decrement the count, ensuring it doesn't go below 0
  };

  const handleCountChange = (event) => {
    const value = Math.max(0, parseInt(event.target.value) || 0); // Ensure count is a non-negative integer
    setCount(value); // Update the count based on input
  };

  const handleScoreChange = (event) => {
    setSelectedScore(event.target.value); // Update the selected score type
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full p-4 border border-gray-300 rounded-lg shadow-md bg-white"> {/* Full width and styling */}
      <div className="flex items-center space-x-4 mb-4 md:mb-0"> {/* Increased space between elements, margin bottom for mobile */}
        <p className="text-lg font-bold">Top CVs</p> {/* Label for the count */}
        <button
          onClick={decrement}
          className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          -
        </button>
        <input
          type="text"
          value={count}
          onChange={handleCountChange}
          className="w-16 text-lg font-bold text-center border border-gray-300 rounded-lg" // Input box for count
        />
        <button
          onClick={increment}
          className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          +
        </button>
      </div>
      <select value={selectedScore} onChange={handleScoreChange} className="border border-gray-300 rounded-lg p-2 w-full md:w-auto"> {/* Select menu for score types */}
        <option value="Cosine Similarity">Cosine Similarity</option>
        <option value="OpenAI-Score">OpenAI-Score</option>
        <option value="Gemini-Score">Gemini-Score</option>
        <option value="Claude-Score">Claude-Score</option>
      </select>
    </div>
  );
};

export default InputCard;
