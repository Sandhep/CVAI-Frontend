'use client'
import axios from 'axios'

import { useState } from 'react'

export default function JDUploader() {
  const [files, setFiles] = useState([])

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files || [])])
    }
  }

  const handleUpload = async () => {
    if (files.length > 0) {
      const formData = new FormData();

      // Append each file to the FormData object
      files.forEach(file => {
        formData.append('files', file); // "files" matches the API's expected form-data key
      });

      try {
        // Replace the URL with your actual server endpoint
        const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/upload-jds`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Uploaded JDs:', response.data.uploaded_JDs);
      } catch (error) {
        console.error('Error uploading CVs:', error);
      }
    }
  }

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Upload JD</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="jd-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX, or TXT (MAX. 100MB)</p>
              </div>
              <input
                id="jd-upload"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                multiple
                className="hidden"
              />
            </label>
          </div>
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="inline-block mr-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            Upload JD
          </button>
          {files.length > 0 && (
            <div className="w-full">
              <h3 className="text-sm font-semibold mb-2">Selected files:</h3>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between items-center text-sm text-gray-600">
                    <span>{file.name}</span>
                    <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                      <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

