import React from 'react'
import { Link } from 'react-router-dom';
const PlaceCard = ({ place }) => {
  return (
    <Link to={'/places/'+place._id}><div className="mb-6 px-4">
      <a href="/" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-[800px] hover:bg-gray-100">
        <img
          className="object-cover w-full rounded-t-lg h-[400px] md:w-48 md:rounded-none md:rounded-l-lg"
          src={`https://sherrybnbbackend.onrender.com/uploads/${place.photos[0]}`} // Assuming the first photo is displayed
          alt={place.title}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{place.title}</h5>
          <p className="mb-3 font-normal text-gray-700">{place.description}</p>
          <div className='flex gap-1 '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <p className="mb-2 text-sm font-semibold text-gray-600"> {place.address}</p>
        </div>
        </div>
      </a>
    </div></Link>
  );
};

export default PlaceCard;
