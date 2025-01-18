import React from 'react';
import Link from 'next/link';

const CV = ({ summary, cvLink, filename, score }) => {

  const displayName = filename.replace(/\.[^/.]+$/, "");

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-6">
      <p className="text-lg font-semibold mb-2">{displayName}</p>
      <p className="text-gray-700 mb-4">{summary}</p>
      <div className="flex justify-between items-center">
        <Link href={cvLink} target="_blank" className="text-blue-500 hover:underline">View CV</Link>
        {score !== null ? <p className="text-gray-800"> score : {parseFloat(score.toFixed(3))} </p> : ''}
      </div>
    </div>
  );
};

export default CV; 