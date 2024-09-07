import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('hey');
    const {name, email, password}= credentials

    try {
      // Make a POST request to the backend API
      const response = await axios.post('http://localhost:5001/api/users/signup', {
      name,
      email,
      password
      });

      if (response.status === 201) {
        // User successfully registered
        alert('User registered successfully!');
        navigate('/login');
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 409) {
        alert('User already exists!');
      } else {
        alert('An error occurred! Please try again.');
      }
    }
  }
  
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="w-full max-w-sm px-6 mx-auto sm:max-w-md">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-4xl font-bold ">Sign up </h6>
                </div>
                <div className="btn-wrapper text-center">
                  
                  <button
                    className="bg-white px-8 py-4 rounded-full outline-none focus:outline-none mr-1 mb-1  shadow hover:shadow-md inline-flex items-center font-semibold text-xs ease-linear transition-all duration-150"
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
                  <small>Or sign up with credentials</small>
                </div>
                <form onSubmit={handleSignup}>
                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      name="name"
                      value={credentials.name}
                      onChange={onChange}
                      required
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded-full text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Enter your Full name"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
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
                      htmlFor="grid-password"
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
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-red-600 text-white  text-sm font-bold uppercase px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign up
                    </button>
                    <p className='mt-2 text-sm text-gray-500'>Already have account? <Link className='font-bold' to='/login'>Login here</Link> </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    
}

export default Signup