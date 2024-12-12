"use client"
import React from 'react';
import CVUploader from '@/components/cv-uploader'
import JDUploader from '@/components/jd-uploader'
import Navbar from '@/components/Navbar'
import InputCard from '@/components/top-n-inputcard'
import UploadedCVsCard from '@/components/UploadedCVsCard'
import UploadedJDsCard from '@/components/UploadedJDsCard'
import HorizontalCard from '@/components/HorizontalCard';

export default function Home() {
  return (
    <div>
      <Navbar />
    <main className="container mx-auto px-10 py-5">
      <div className="grid md:grid-cols-2 gap-5">
        <CVUploader />
        <JDUploader />
      </div>
     <div className="my-5">
        <HorizontalCard/>
      </div>
      <div className="my-5">
        <InputCard/>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <UploadedJDsCard/>
        <UploadedCVsCard/>
      </div>
    </main>
    </div>
  )
}

