"use client"
import React, { useState } from 'react';

const InputCard = () => {
  const [count, setCount] = useState(0); // State to track the count

  const increment = () => {
    setCount(prevCount => prevCount + 1); // Increment the count
  };

  const decrement = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0)); // Decrement the count, ensuring it doesn't go below 0
  };

  return (
    <div className="flex justify-between items-center w-full p-4 border border-gray-300 rounded-lg shadow-md bg-white"> {/* Full width and styling */}
      <span className="text-lg font-bold">Top CVs: {count}</span> {/* Display "Top CVs" followed by the current count */}
      <div className="flex items-center space-x-2"> {/* Added space between buttons */}
        <button
          onClick={decrement}
          className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          -
        </button>
        <button
          onClick={increment}
          className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default InputCard;
