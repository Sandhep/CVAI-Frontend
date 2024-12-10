import React, { useState } from 'react';
import JD from './JD';

const UploadedJDsCard = ({ uploadedJDs, onCVsUpdate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredJDs = uploadedJDs.filter(jd =>
    jd.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
    jd.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-6">
      <h2 className="text-2xl font-semibold mb-4">Uploaded JDs</h2>
      <input
        type="text"
        placeholder="Search JDs..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
      />
      {filteredJDs.length > 0 ? (
        <div className="space-y-4">
          {filteredJDs.map((jd, index) => (
            <JD 
              key={index} 
              summary={jd.summary}
              jdLink={jd.link}
              filename={jd.name}
              id={jd.id}
              onCVsUpdate={onCVsUpdate}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No JDs found.</p>
      )}
    </div>
  );
};

export default UploadedJDsCard; 