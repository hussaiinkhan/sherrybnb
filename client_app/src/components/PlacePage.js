import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

import PlaceGallery from "./PlaceGallery";
import AddressLink from "./AddressLink";
import BookingWidget from "./BookingWidget";

export default function PlacePage() {
  const {id} = useParams();
  const [place,setPlace] = useState(null);
  const pricePerNight = (Math.random() * 30).toFixed(2)
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`https://sherrybnbbackend.onrender.com/api/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';



  return (
    <div className="mt-4 bg-gray-100  px-8 sm:px-20 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}<br />
          Check-out: {place.checkOut}<br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} pricePerNight={pricePerNight}/>
        </div>
      </div>
      <div className="   py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
      </div>
    </div>
  );
}