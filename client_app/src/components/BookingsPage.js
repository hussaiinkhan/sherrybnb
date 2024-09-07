import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import BookingCard from './BookingCard';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';


const BookingsPage = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found, cannot authenticate user.');
          return;
        }
    if (user) {
      setLoading(true)
      // Fetch bookings of the user
      axios.get('http://localhost:5001/api/bookings/getbookings',{
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
      })
        .then(response => {
          setBookings(response.data);
          setLoading(false)
        })
        .catch(()=>{setLoading(false)});
    }
  }, [user]);
  if (!loading && bookings.length === 0) {
    return <p className='text-center mt-24 font-bold text-2xl'>You haven't booked any place yet!</p>
  }
  if (loading) {
    return <div><Loading/></div>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 mt-8">
      {bookings.map(booking => (
        <BookingDetails key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

const BookingDetails = ({ booking }) => {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    // Fetch the details of the place associated with the booking
    axios.get(`http://localhost:5001/api/places/${booking.place}`)
      .then(response => {
        setPlace(response.data);
      })
      .catch(error => console.log(error));
  }, [booking.place]);

  if (!place) return null;

  return (
  <div className='flex flex-col justify-center items-center'>
        <BookingCard booking={booking} place={place} />
  </div>)
}

export default BookingsPage;
