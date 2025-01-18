import React, { useState,useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import CV from './CV';
import { setCV } from '@/slices/cvSlice';
import axios from 'axios';

const UploadedCVsCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const cvtitle = useSelector((state)=> state.cvtitle.value);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/user-cvs`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      dispatch(setCV(response.data));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  },[axios]);

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
              cvLink={cv.url}
              filename={cv.name}
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