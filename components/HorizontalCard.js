// components/ui/HorizontalCard.js
"use client"
import React, { useState } from 'react';

const models = [
  { id: 1, name: 'Model A' },
  { id: 2, name: 'Model B' },
  { id: 3, name: 'Model C' },
  { id: 4, name: 'Model D' },
];

const HorizontalCard = () => {
  const [selectedModel, setSelectedModel] = useState(null);

  const handleModelClick = (modelId) => {
    setSelectedModel(modelId);
  };

  return (
    <div className="flex flex-col md:flex-row w-full p-4 border border-gray-300 rounded-lg shadow-md bg-white space-y-4 md:space-y-0 md:space-x-4">
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => handleModelClick(model.id)}
          className={`flex flex-col items-center w-full p-4 border rounded-lg cursor-pointer transition duration-200 ease-in-out ${
            selectedModel === model.id ? 'bg-blue-100 border-blue-500' : 'border-gray-200 hover:bg-gray-100'
          }`}
        >
          <h3 className="font-semibold text-lg mb-2 text-gray-700">{model.name}</h3>
        </button>
      ))}
    </div>
  );
};

export default HorizontalCard;