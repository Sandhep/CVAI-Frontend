import React, { useState } from 'react';
import CV from './CV';

const UploadedCVsCard = ({ uploadedCVs, title }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCVs = uploadedCVs.filter(cv =>
    cv.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <input
        type="text"
        placeholder="Search CVs..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
      />
      {filteredCVs.length > 0 ? (
        <div className="space-y-4">
          {filteredCVs.map((cv, index) => (
            <CV 
              key={index} 
              summary={cv.summary}
              cvLink={cv.link}
              filename={cv.name}
              id={cv.id}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No CVs found.</p>
      )}
    </div>
  );
};

export default UploadedCVsCard; 