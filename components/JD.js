"use client"
import React,{useState} from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setCV } from '@/slices/cvSlice';
import { setCVtitle } from '@/slices/cvtitleSlice';
import AlertCard from "./AlertCard"; // Import the AlertCard component

const JD = ({ summary, jdLink, filename, id }) => {

  const displayName = filename.replace(/\.[^/.]+$/, "");
  const [alert, setAlert] = useState(null); // Manage alert visibility

  const count = useSelector((state) => state.count.value); // Access count from the Redux store
  const modelname = useSelector((state) => state.model.value); // Access model name from the Redux store
  const dispatch = useDispatch();

  const handleJDClick = () => {
    if (modelname === "") {
      setAlert({ message: "Please select a model before proceeding.", type: "error" });
      return;
    }
    if (count === 0) {
      setAlert({ message: "Please enter a valid count.", type: "error" });
      return;
    }

    const CV = [ 
      { id: 12, name: 'Resume_Lucy.docx', summary: 'Graphic designer skilled in Adobe Creative Suite and visual branding.', link: 'https://www.google.com', score: 1 },
      { id: 11, name: 'Resume_Kevin.pdf', summary: 'Software tester with expertise in automated testing and QA methodologies.', link: 'https://www.google.com', score: 0.91 },
      { id: 10, name: 'Resume_Julia.docx', summary: 'Content writer specializing in technical documentation and creative storytelling.', link: 'https://www.google.com', score: 0.82 },
      { id: 9, name: 'Resume_Ian.pdf', summary: 'Cloud architect experienced in AWS and Azure with a focus on scalable infrastructure.', link: 'https://www.google.com', score: 0.73 },
      { id: 8, name: 'Resume_Hannah.docx', summary: 'Financial analyst with a strong background in budgeting and forecasting.', link: 'https://www.google.com', score: 0.64 },
      { id: 7, name: 'Resume_George.pdf', summary: 'Machine learning engineer with expertise in neural networks and natural language processing.', link: 'https://www.google.com', score: 0.55 },
      { id: 6, name: 'Resume_Fiona.docx', summary: 'Project manager adept at Agile methodologies and leading cross-functional teams.', link: 'https://www.google.com', score: 0.45 },
      { id: 5, name: 'Resume_Ethan.pdf', summary: 'Cybersecurity specialist with experience in network security and ethical hacking.', link: 'https://www.google.com', score: 0.36 },
      { id: 4, name: 'Resume_Danielle.docx', summary: 'Marketing strategist skilled in SEO, content creation, and brand development.', link: 'https://www.google.com', score: 0.27 },
      { id: 3, name: 'Resume_Charlie.pdf', summary: 'Data analyst with proficiency in Python and SQL, focused on turning data into actionable insights.', link: 'https://www.google.com', score: 0.18 },
      { id: 2, name: 'Resume_Bob.docx', summary: 'Creative designer with expertise in UI/UX design.', link: 'https://www.google.com', score: 0.09 },
      { id: 1, name: 'Resume_Alice.pdf', summary: 'Experienced software developer with a strong background in building scalable applications.', link: 'https://www.google.com', score: 0 }
    ];

    const req = {
      jd_id: id,
      jd_name: displayName,
      selected_model: modelname,
      cv_count: count
    };

    console.log(req);

    const selectedCVs = CV.slice(0, count);

    dispatch(setCV(selectedCVs));
    dispatch(setCVtitle(`Top ${count} CVs matches with ${displayName}`));
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-6" >
       {/* Warning Alert fixed at the top */}
       {alert && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4">
          <AlertCard
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)} // Close the alert
          />
        </div>
      )}
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
