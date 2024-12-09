import React from 'react';
import JD from './JD';

const UploadedJDsCard = ({ uploadedJDs, onCVsUpdate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-6">
      <h2 className="text-2xl font-semibold mb-4">Uploaded JDs</h2>
      {uploadedJDs.length > 0 ? (
        <div className="space-y-4">
          {uploadedJDs.map((jd,index) => (
            <JD 
              key={index} 
              summary={jd.summary}
              jdLink={jd.link}
              filename={jd.name}
              id = {jd.id}
              onCVsUpdate={onCVsUpdate}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No JDs uploaded yet.</p>
      )}
    </div>
  );
};

export default UploadedJDsCard; 