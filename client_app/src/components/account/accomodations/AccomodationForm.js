import React, { useState } from 'react'
import Perks from './Perks'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AccomodationForm = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  const uploadPhoto = (e) => {
    const files = e.target.files  //saving the uploaded files from our device into files variable
    const data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i])
    }
    //created a formdata variable to send files to server and saving these files as photo
    axios.post('https://sherrybnbbackend.onrender.com/api/places/uploadphotos', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      const { data: filenames } = response
      setAddedPhotos(prev => {     //setting the photos and this variable to show while uploading
        return [...prev, ...filenames]
      })
      console.log(addedPhotos);
    }).catch(error => {
      console.log(error);
    })
  }
  function removePhoto(ev,filename) {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)]);
  }
  function selectAsMainPhoto(ev,filename) {
    ev.preventDefault();
    setAddedPhotos([filename,...addedPhotos.filter(photo => photo !== filename)]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('hey');
    try {
      const token = localStorage.getItem('token');
      const placeData = {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      };

      const response = await axios.post('https://sherrybnbbackend.onrender.com/api/places/addplace', placeData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
      });

      if (response.status === 201) {
        console.log('Place added successfully:', response.data);
        // Reset all the states to their initial empty values
        setTitle('');
        setAddress('');
        setAddedPhotos([]);
        setDescription('');
        setPerks([]);
        setExtraInfo('');
        setCheckIn('');
        setCheckOut('');
        setMaxGuests(1);
      }
      navigate('/account/accomodations')
    } catch (error) {
      console.error('Error adding place:', error.response ? error.response.data : error.message);
    }
  };
  return (
    <div className='flex flex-col justify-center items-center'>
      <div>
        <h1 className='text-2xl font-semibold text-center mt-12 mb-4'>Add your place on Sherrybnb </h1>
        <div className=' max-w-[800px] w-full bg-red-50 py-4 rounded-lg px-8 mx-auto  flex  justify-center '>
        <form onSubmit={handleSubmit} >
          <h2 className='text-2xl mt-4'>Title</h2>
          <p className='text-gray-500 text-sm'>Title for your place, should be short and catchy as in advertisement</p>
          <input value={title} onChange={e => { setTitle(e.target.value) }} className='border border-gray-400 py-1 px-2 rounded-lg w-full bg-transparent' type="text" placeholder='title, for exmaple: My lovely apartment' />
          <h2 className='text-2xl mt-4'>Address</h2>
          <p className='text-gray-500 text-sm'>Address to this place</p>
          <input value={address} onChange={e => { setAddress(e.target.value) }} className=' border border-gray-400 py-1 px-2 rounded-lg w-full bg-transparent' type="text" placeholder='address' />
          <h2 className='text-2xl mt-4'>Photos</h2>
          <p className='text-gray-500 text-sm'>The more the better</p>

          <div className='mt-2 grid gap-2 grid-cols-3 md:grid-col-4 lg:grid-cols-6'>
            {addedPhotos.length > 0 && addedPhotos.map((photo) => {
              return <div className='h-32 flex relative' key={photo}>
                <img className='rounded-2xl w-full object-cover' src={`https://sherrybnbbackend.onrender.com/uploads/${photo}`} alt="" />
                <button onClick={ev => removePhoto(ev,photo)} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-1 px-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
            <button onClick={ev => selectAsMainPhoto(ev,photo)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-1 px-1">
              {photo === addedPhotos[0] && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              )}
              {photo !== addedPhotos[0] && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              )}
            </button>
              </div>
            })}
            <label className='cursor-pointer flex justify-center items-center gap-1 border border-gray-400 bg-transparent rounded-2xl p-4 w-[150px] text-xl text-gray-600'>
              <input multiple type="file" className='hidden' onChange={uploadPhoto} />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
              </svg>
              Upload</label>
          </div>
          <h2 className='text-2xl mt-4'>Description</h2>
          <p className='text-gray-500 text-sm'>Describe your place to the clients</p>
          <textarea value={description} onChange={e => { setDescription(e.target.value) }} className='w-full p-4 rounded-lg border border-gray-400 bg-transparent' />
          <h2 className='text-2xl mt-4'>Perks</h2>
          <p className='text-gray-500 text-sm'>Select all the perks of your place</p>
          <Perks selected={perks} onChange={setPerks} />
          <h2 className='text-2xl mt-4'>Extra info</h2>
          <p className='text-gray-500 text-sm'>House rules etc.</p>
          <textarea value={extraInfo} onChange={e => { setExtraInfo(e.target.value) }} className='w-full p-4 rounded-lg border border-gray-400 bg-transparent' />
          <h2 className='text-2xl mt-4'>Check-in & Check-out time and Max guests</h2>
          <p className='text-gray-500 text-sm'>Remember to have some time window to clean the room between the guests</p>
          <div className='grid gap-2 sm:grid-cols-3'>
            <div>
              <h3 className='mt-2 '>Check-in time</h3>
              <input value={checkIn} onChange={e => { setCheckIn(e.target.value) }} className='border border-gray-400 bg-transparent py-1 px-2 rounded-lg' type="text" placeholder='14:00' />
            </div>
            <div>
              <h3 className='mt-2 '>Check-out time</h3>
              <input value={checkOut} onChange={e => { setCheckOut(e.target.value) }} className='border border-gray-400 py-1 px-2 bg-transparent rounded-lg' type="text" placeholder='12:00' />
            </div>
            <div>
              <h3 className='mt-2 '>Max guests</h3>
              <input value={maxGuests} onChange={e => { setMaxGuests(e.target.value) }} className='border border-gray-400 py-1 px-2 bg-transparent rounded-lg' type="number" placeholder='1' />
            </div>
          </div>
        </form>
      </div></div>
      <div>
        <button onClick={handleSubmit} type='submit' className='w-[200px] mt-4 mb-2 bg-red-600 rounded-full text-white px-2 py-2 '>Save</button>
        </div>
    </div>
  )
}

export default AccomodationForm