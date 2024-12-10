import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import JD from './JD';
import { setJD } from '@/slices/jdSlice';

const uploadedJDs = [
  { id: 1, name: 'Job_Description_Developer.docx', summary: 'Looking for a skilled developer with experience in React and Node.js.', link: 'https://www.google.com' },
  { id: 2, name: 'Job_Description_Designer.pdf', summary: 'Seeking a creative designer with a strong portfolio in UI/UX.', link: 'https://www.google.com' },
  { id: 3, name: 'Job_Description_Data_Analyst.docx', summary: 'Hiring a data analyst proficient in SQL and data visualization tools.', link: 'https://www.google.com' },
  { id: 4, name: 'Job_Description_Project_Manager.pdf', summary: 'Looking for a project manager experienced in Agile and team collaboration.', link: 'https://www.google.com' },
  { id: 5, name: 'Job_Description_ML_Engineer.docx', summary: 'Seeking a machine learning engineer with expertise in TensorFlow and deep learning.', link: 'https://www.google.com' },
  { id: 6, name: 'Job_Description_Content_Writer.pdf', summary: 'Hiring a content writer skilled in technical writing and storytelling.', link: 'https://www.google.com' },
  { id: 7, name: 'Job_Description_Cybersecurity_Specialist.docx', summary: 'Looking for a cybersecurity specialist experienced in threat detection and mitigation.', link: 'https://www.google.com' },
  { id: 8, name: 'Job_Description_Financial_Analyst.pdf', summary: 'Seeking a financial analyst with strong skills in Excel and financial modeling.', link: 'https://www.google.com' },
  { id: 9, name: 'Job_Description_Cloud_Architect.docx', summary: 'Hiring a cloud architect proficient in AWS, Azure, and scalable solutions.', link: 'https://www.google.com' },
  { id: 10, name: 'Job_Description_Graphic_Designer.pdf', summary: 'Looking for a graphic designer skilled in Adobe Creative Suite and branding.', link: 'https://www.google.com' },
  { id: 11, name: 'Job_Description_QA_Tester.docx', summary: 'Seeking a QA tester with experience in manual and automated testing.', link: 'https://www.google.com' },
  { id: 12, name: 'Job_Description_SEO_Specialist.pdf', summary: 'Hiring an SEO specialist with expertise in content optimization and analytics.', link: 'https://www.google.com' }
];

const UploadedJDsCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(()=>{
     dispatch(setJD(uploadedJDs));
  },[]);

  const jddata = useSelector((state)=> state.jd.value);

  const filteredJDs = jddata.filter(jd =>
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