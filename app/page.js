"use client"
import React, { useState } from 'react';
import CVUploader from '@/components/cv-uploader'
import JDUploader from '@/components/jd-uploader'
import Navbar from '@/components/Navbar'
import InputCard from '@/components/top-n-inputcard'
import UploadedCVsCard from '@/components/UploadedCVsCard'
import UploadedJDsCard from '@/components/UploadedJDsCard'
import { useSelector} from 'react-redux';
import HorizontalCard from '@/components/HorizontalCard';

export default function Home() {
  const CVs = [
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

const [uploadedCVs, setUploadedCVs] = useState(CVs); // Initialize with all CVs
const [cvTitle, setCvTitle] = useState('Uploaded CVs'); // State for the title

const count = useSelector((state) => state.count.value); // Access count from the Redux store

const handleCVsUpdate = (cvs) => {
  setUploadedCVs(cvs); // Update the state with the new list of CVs
  setCvTitle(`Top ${count} CVs matches with JD`); // Update the title when CVs are fetched
};

  return (
    <div>
      <Navbar />
    <main className="container mx-auto px-4 py-5">
      <div className="grid md:grid-cols-2 gap-5">
        <CVUploader />
        <JDUploader />
      </div>
     <div className="my-5">
        <HorizontalCard />
      </div>
      <div className="my-5">
        <InputCard />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <UploadedJDsCard uploadedJDs={uploadedJDs} onCVsUpdate={handleCVsUpdate} />
        <UploadedCVsCard uploadedCVs={uploadedCVs} title={cvTitle} />
      </div>
    </main>
    </div>
  )
}

