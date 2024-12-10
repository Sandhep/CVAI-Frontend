import React, { useState,useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import CV from './CV';
import { setCV } from '@/slices/cvSlice';

const UploadedCVs = [
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
];

const UploadedCVsCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const cvtitle = useSelector((state)=> state.cvtitle.value);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(()=>{
     dispatch(setCV(UploadedCVs));
  },[]);

  const cvdata = useSelector((state)=> state.cv.value);
  
  const filteredCVs = cvdata.filter(cv =>
    cv.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 p-6">
      <h2 className="text-2xl font-semibold mb-4">{cvtitle}</h2>
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
              score={cv.score ? cv.score : null}
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