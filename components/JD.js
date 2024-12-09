"use client"
import React from 'react';
import Link from 'next/link';

const JD = ({ summary, jdLink, filename,id,onCVsUpdate }) => {
  const displayName = filename.replace(/\.[^/.]+$/, "");

  const handleJDClick = () =>{
      const CV = [ 
        { id: 9, name: 'Resume_Ian.pdf', summary: 'Cloud architect experienced in AWS and Azure with a focus on scalable infrastructure.', link: 'https://www.google.com',count:4 },
        { id: 10, name: 'Resume_Julia.docx', summary: 'Content writer specializing in technical documentation and creative storytelling.', link: 'https://www.google.com',count:4},
        { id: 11, name: 'Resume_Kevin.pdf', summary: 'Software tester with expertise in automated testing and QA methodologies.', link: 'https://www.google.com',count:4 },
        { id: 12, name: 'Resume_Lucy.docx', summary: 'Graphic designer skilled in Adobe Creative Suite and visual branding.', link: 'https://www.google.com',count:4 }
    ]
      onCVsUpdate(CV); // Call the callback function to update CVs in the parent component
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-6" >
      <p className="text-lg font-semibold mb-2">{displayName}</p>
      <p className="text-gray-700 mb-2">{summary}</p>
      <button 
        onClick={handleJDClick} 
        className="mt-4 bg-blue-400 text-white font-semibold py-2 px-3 rounded hover:bg-blue-500 transition duration-200"
      >
        View Matching CVs
      </button>
      <Link href={jdLink} target="_blank" className="mx-2 text-blue-500 hover:underline">View JD</Link>
    </div>
  );
};

export default JD; 