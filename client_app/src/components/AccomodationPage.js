import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlaceCard from './PlaceCard'
import Loading from './Loading';

const AccomodationPage = () => {
  const [userPlaces, setUserPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the places added by the user
  const fetchUserPlaces = async () => {
    const token = localStorage.getItem('token');  // Get token from localStorage
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    try {
      setLoading(true);  // Show loading state
      const response = await axios.get('http://localhost:5001/api/places/userplaces', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Pass token in request headers
        },
      });
      setUserPlaces(response.data);  // Set the user's places in state
      setLoading(false);  // Hide loading state
    } catch (error) {
      console.error('Error fetching user places:', error.response ? error.response.data : error.message);
      setError(error.message);  // Set error state if any error occurs
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPlaces();  // Fetch user's places when component mounts
  }, []);

  if (loading) {
    return <div><Loading/></div>;
  }

  if (error) {
    return <div className='text-center mt-24 font-bold text-2xl'>Error: {error}</div>;
  }
  return (
    <div className='flex  flex-col justify-center px-4 items-center mt-12'>
        <Link to={'/account/accomodations/newplace'}><button className='w-[200px] bg-red-600 rounded-full text-white px-2 py-2 mb-12'>+ Add new place</button></Link>
        <div className={userPlaces.length > 0?"grid gap-4":'text-center'}>
      {userPlaces.length > 0 ? (
        userPlaces.map((place) => (
          <PlaceCard key={place._id} place={place} />  // Pass the place data to the PlaceCard component
        ))
      ) : (<>
        <p className='text-2xl font-bold text-center'>You have not yet added any place!</p>
        <p>Add your place now and get started.</p>
        </>
      )}
    </div>
        
    </div>
  )
}

export default AccomodationPage