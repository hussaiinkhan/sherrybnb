import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const {email, password} = credentials
    try {
      
      // Make a POST request to the login endpoint
      const response = await axios.post('https://sherrybnbbackend.onrender.com/api/users/login', {email,password});
 
      if (response.status === 200) {
        // Login successful, save token to localStorage
        const token = response.data.accessToken;
        localStorage.setItem('token', token);
        // Navigate to homepage
        navigate('/');
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 401) {
        alert('Invalid credentials!');
      } else {
        alert('An error occurred! Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-sm px-6 mx-auto sm:max-w-md">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h6 className="text-4xl font-bold">Sign in</h6>
            </div>
            <div className="btn-wrapper text-center">
              <button
                className="bg-white px-8 py-4 rounded-full outline-none focus:outline-none mr-1 mb-1 shadow hover:shadow-md inline-flex items-center font-semibold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img
                  alt="Google"
                  className="w-5 mr-2"
                  src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                />
                Sign in with Google
              </button>
            </div>
            <hr className="mt-6 border-b-1 border-gray-300" />
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="text-gray-400 text-center mb-3 font-bold">
              <small>Or sign in with credentials</small>
            </div>
            <form onSubmit={handleSignin}>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                  type="email"
                  className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded-full text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="your@gmail.com"
                />
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-600 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                  type="password"
                  className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded-full text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    className="form-checkbox border-0 rounded-full text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span className="ml-2 text-sm font-semibold text-gray-600">Remember me</span>
                </label>
              </div>
              <div className="text-center mt-6">
                <button
                  className="bg-red-600 text-white text-sm font-bold uppercase px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Sign In
                </button>
                <p className='mt-2 text-sm text-gray-500'>New to Sherrybnb? <Link className='font-bold' to='/signup'>Signup here</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
