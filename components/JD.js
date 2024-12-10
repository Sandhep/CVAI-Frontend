"use client"
import React from 'react';
import Link from 'next/link';
import { useSelector} from 'react-redux';

const JD = ({ summary, jdLink, filename,id,onCVsUpdate }) => {
  const displayName = filename.replace(/\.[^/.]+$/, "");

  const count = useSelector((state) => state.count.value); // Access count from the Redux store

  const handleJDClick = () =>{
      const CV = [ 
        { id: 1, name: 'Resume_Alice.pdf', summary: 'Experienced software developer with a strong background in building scalable applications.', link: 'https://www.google.com' },
        { id: 2, name: 'Resume_Bob.docx', summary: 'Creative designer with expertise in UI/UX design.', link: 'https://www.google.com' },
        { id: 3, name: 'Resume_Charlie.pdf', summary: 'Data analyst with proficiency in Python and SQL, focused on turning data into actionable insights.', link: 'https://www.google.com' },
        { id: 4, name: 'Resume_Danielle.docx', summary: 'Marketing strategist skilled in SEO, content creation, and brand development.', link: 'https://www.google.com' },
        { id: 5, name: 'Resume_Ethan.pdf', summary: 'Cybersecurity specialist with experience in network security and ethical hacking.', link: 'https://www.google.com' },
        { id: 6, name: 'Resume_Fiona.docx', summary: 'Project manager adept at Agile methodologies and leading cross-functional teams.', link: 'https://www.google.com' },
        { id: 7, name: 'Resume_George.pdf', summary: 'Machine learning engineer with expertise in neural networks and natural language processing.', link: 'https://www.google.com' },
        { id: 8, name: 'Resume_Hannah.docx', summary: 'Financial analyst with a strong background in budgeting and forecasting.', link: 'https://www.google.com' },
        { id: 9, name: 'Resume_Ian.pdf', summary: 'Cloud architect experienced in AWS and Azure with a focus on scalable infrastructure.', link: 'https://www.google.com' },
        { id: 10, name: 'Resume_Julia.docx', summary: 'Content writer specializing in technical documentation and creative storytelling.', link: 'https://www.google.com' },
        { id: 11, name: 'Resume_Kevin.pdf', summary: 'Software tester with expertise in automated testing and QA methodologies.', link: 'https://www.google.com' },
        { id: 12, name: 'Resume_Lucy.docx', summary: 'Graphic designer skilled in Adobe Creative Suite and visual branding.', link: 'https://www.google.com' }
    ]

      const selectedCVs = CV.slice(0,count);
      onCVsUpdate(selectedCVs); // Call the callback function to update CVs in the parent component
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