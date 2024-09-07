import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';


const ProfilePage = () => {
  const { user,setUser } = useContext(UserContext);

  
  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Clear the user context
    setUser(null);
};

  return (
    <div className='text-center mt-32 text-black text-2xl'>
      {user?
      <>
          <p>You are logged in as {user.name?user.name:'name'}</p>
        <p>({user.email?user.email:'email'})</p>
        <Link to='/'><button onClick={handleLogout} className='mt-8 bg-red-600 rounded-full w-[300px] p-1 text-white'>Logout</button></Link>
      </>:<Link className='font-semibold bg-red-600 text-white px-2 py-1 rounded-lg' to='/login'>Login in here!</Link>}
        
    </div>
  )
}

export default ProfilePage