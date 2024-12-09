import React from 'react';
import CV from './CV';

const UploadedCVsCard = ({ uploadedCVs, title }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {uploadedCVs.length > 0 ? (
        <div className="space-y-4">
          {uploadedCVs.map((cv,index) => (
            <CV 
              key={index} 
              summary={cv.summary}
              cvLink={cv.link}
              filename={cv.name}
              id = {cv.id}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No CVs uploaded yet.</p>
      )}
    </div>
  );
};

export default UploadedCVsCard; 