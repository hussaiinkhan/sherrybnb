import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';

export default function BookingWidget({place,pricePerNight}) {
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [numberOfGuests,setNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const {user} = useContext(UserContext);
  
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
   if (user) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, cannot authenticate user.');
        return;
      }

    const response = await axios.post('https://sherrybnbbackend.onrender.com/api/bookings/create', {
        checkIn,checkOut,numberOfGuests,name,phone,
        place:place._id,
        price:numberOfNights * pricePerNight,
      },{headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the request headers
      }});
      if(response.status===201){
          navigate('/account/bookings')
      }
   } else {
    (navigate('/login'))
   }
}

  return (
    <div className="bg-white shadow p-4 rounded-2xl flex flex-col justify-center items-center">
      <div className="text-xl text-center font-semibold">
        Price:&nbsp;${pricePerNight} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label className="font-semibold">Check in:</label>
            <input type="date"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          <div className="py-3 px-4 border-l">
            <label className="font-semibold">Check out:</label>
            <input type="date" value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}/>
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label className="font-semibold">Number of guests:  </label>
          <input type="number"
                 value={numberOfGuests}
                 onChange={ev => setNumberOfGuests(ev.target.value)}/>
        </div>
        {numberOfNights > 0 && (     //this will show only if the number of Nights is greater than 0
          <div className="py-3 px-4 grid border-t">
            <label className="font-semibold">Your full name:</label>
            <input type="text"
                   value={name}
                   onChange={ev => setName(ev.target.value)}
                   className="bg-gray-100 rounded-lg  py-1 ml-2"/>
            <label className="font-semibold">Phone number:</label>
            <input type="tel"
                   value={phone}
                   onChange={ev => setPhone(ev.target.value)}
                   className="bg-gray-100 rounded-lg  py-1 ml-2"/>
          </div>
        )}
      </div>
      {numberOfNights > 0 && (<button onClick={bookThisPlace} className="bg-red-600 max-w-[200px] text-white rounded-lg mt-4 px-1 py-2">
        Book this place for 
       
          <span > ${(numberOfNights * pricePerNight).toFixed(2)}</span>
        
      </button>
      )}
    </div>
  );
}