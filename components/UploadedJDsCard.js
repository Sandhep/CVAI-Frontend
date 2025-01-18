import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import JD from './JD';
import { setJD } from '@/slices/jdSlice';
import axios from 'axios';

const UploadedJDsCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(()=>{
     axios.get(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/user-jds`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      dispatch(setJD(response.data));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
     //dispatch(setJD(uploadedJDs));
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
              jdLink={jd.url}
              filename={jd.name}
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