import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import HomeCard from './HomeCard';
import Loading from '../others/Loading';
import { UserContext } from '../../contexts/UserContext';

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more places

  // Function to fetch places from the backend
  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sherrybnbbackend.onrender.com/api/places/allplaces?page=${page}&limit=6`);
      setPlaces((prevPlaces) => [...prevPlaces, ...response.data]); // Append new places
      if (response.data.length < 6) {
        setHasMore(false); // Stop fetching if there are no more places
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching places:', error);
      setLoading(false);
    }
  };

  // Infinite scroll logic
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) {
      return;
    }
    setPage((prevPage) => prevPage + 1); // Increment page number when reaching the bottom
  };

  useEffect(() => {
    fetchPlaces(); // Fetch places on component mount and when page changes
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup the event listener
  }, [loading, hasMore]);

  // Function to get user info from database
  const getUserdata = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found, cannot authenticate user.');
      return;
    }

    try {
      const response = await axios.get('https://sherrybnbbackend.onrender.com/api/users/info', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
      });

      // Save the response data to state and localStorage
      const userData = { name: response.data.name, email: response.data.email };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
    }
  };

// Load user data from localStorage on component mount
useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        setUser(JSON.parse(savedUser));
    } else {
        getUserdata();
    }// eslint-disable-next-line
}, []);

  return (
    <div>
      <div className="px-16 lg:px-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {places.map((place) => (
          <HomeCard key={place._id} place={place} />
        ))}
      </div>
      {loading && <Loading/>}
      {!hasMore && <p className="text-center font-bold mb-4">No more places to show!</p>}
    </div>
  );
};

export default Home;
