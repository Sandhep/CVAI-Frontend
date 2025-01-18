"use client"
import React,{useState} from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setCV } from '@/slices/cvSlice';
import { setCVtitle } from '@/slices/cvtitleSlice';
import AlertCard from "./AlertCard"; // Import the AlertCard component
import axios from 'axios';

const JD = ({ summary, jdLink, filename}) => {

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

    const req = {
      "selected_jd": displayName,
      "top_n":count,
      "model": modelname,
    };

    axios.post(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/find-match`, req)
    .then(function (response) {
      console.log(response.data.matches);
      dispatch(setCVtitle(`Top ${count} CVs matches with ${displayName}`));
      dispatch(setCV(response.data.matches));
    })
    .catch(function (error) {
      console.log(error);
    });

    //console.log(req);

   // const selectedCVs = CV.slice(0, count);

   // dispatch(setCV(selectedCVs));
   //dispatch(setCVtitle(`Top ${count} CVs matches with ${displayName}`));
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
