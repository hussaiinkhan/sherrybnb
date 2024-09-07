import React from 'react';
import { Link } from 'react-router-dom';
const HomeCard = ({ place }) => {
  // Generate a random price between 0 and 30 dollars
  const pricePerNight = (Math.random() * 30).toFixed(2);

  return (
    <Link to={'/places/'+place._id}><div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div>
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={`http://localhost:5001/uploads/${place.photos[0]}`}
            alt={place.title}
          />
        </div>
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{place.title}</h5>
        </div>
        <p className="mb-3 font-normal text-gray-700">{place.description}</p>
        <div className='flex gap-1 '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <p className="mb-2 text-sm font-semibold text-gray-600"> {place.address}</p>
        </div>
        <p className="mb-4 text-sm font-bold text-gray-900">💵 ${pricePerNight} / night</p> {/* Random price */}
      </div>
    </div>
    </Link>
  );
};

export default HomeCard;
