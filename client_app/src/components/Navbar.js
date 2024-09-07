import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/places/allplaces');
                setPlaces(response.data);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };

        fetchPlaces();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = places.filter(place => 
                place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                place.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPlaces(filtered);
        } else {
            setFilteredPlaces(places);
        }
    }, [searchQuery, places]);

    return (
        <div className='flex items-center justify-between p-4 gap-2 md:px-16 text-gray-800'>
            <Link to='/'><div className='flex items-center justify-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626" className="size-8">
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>

                <p className='hidden sm:block font-medium text-2xl'>Sherry<span className='text-red-600 font-bold'>bnb</span></p>
            </div></Link>
            <div className='flex items-center justify-center gap-2 sm:gap-4 border border-gray-800 sm:mr-20 px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-md'>
                <p className='sm:font-medium text-sm '>Anywhere</p>
                <div>|</div>
                <p className='sm:font-medium text-sm '>Anyweek</p>
                <div>|</div>
                <p className='sm:font-medium text-sm '>Add&nbsp;guests</p>
                <button onClick={toggleSearch} className='hidden md:block  bg-red-600 p-1 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            <div className='flex items-center justify-center gap-2 border border-gray-800 rounded-full shadow-md px-2 py-1 '>
                {user ? (
                    <Link to='/account/profile'>
                        <p className='bg-red-600 text-white text-sm rounded-full px-2 py-1 cursor-pointer'>Hello, {user.name}!</p>
                    </Link>
                ) : (
                    <Link to='/login'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 bg-red-600 text-white p-2 rounded-full cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </Link>
                )}
            </div>

            {searchVisible && (
                <div className='absolute top-20 lg:top-16 z-10 right-[200px] md:right-[490px] w-full max-w-md p-4 bg-white shadow-lg rounded-md'>
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder='Search places...'
                        className='w-full p-2 border border-gray-300 rounded-md'
                    />
                    <div className='mt-4'>
                        {filteredPlaces.length > 0 ? (
                            <ul>
                                {filteredPlaces.map(place => (
                                    <li onClick={()=>setSearchVisible(false)} key={place._id}>
                                        <Link to={`/places/${place._id}`} className='block p-2 hover:bg-gray-200'>
                                            {place.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No places found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
