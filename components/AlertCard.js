"use client";
import React from "react";

const AlertCard = ({ message, type, onClose }) => {
  const typeStyles = {
    error: "bg-red-100 border-red-400 text-red-700",
    success: "bg-green-100 border-green-400 text-green-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  const alertStyle = typeStyles[type] || "bg-gray-100 border-gray-400 text-gray-700"; // Fallback style

  return (
    <div
      className={`p-4 border rounded-lg shadow-md flex items-center justify-between ${alertStyle}`}
      style={{
        maxWidth: "600px", // Set a maximum width
        margin: "0 auto", // Center the alert horizontally
      }}
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-sm font-semibold text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        ✖
      </button>
    </div>
  );
};

export default AlertCard;
