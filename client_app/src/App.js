import React, { useState,useEffect} from "react";
import Navbar from "./components/others/Navbar";
import Login from "./components//login/Login";
import Signup from "./components/signup/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountPage from "./components/account/AccountPage";
import AccomodationForm from "./components/account/accomodations/AccomodationForm"
import Home from "./components/home/Home";
 import { UserContext } from './contexts/UserContext'
import PlacePage from "./components/singlePage/PlacePage";
import Footer from "./components/others/Footer";
function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {

    // Rehydrate user from localStorage. Always do in App js so that when other pages are refreshed the variable must not lose it's value
    const storedUser = localStorage.getItem('user');
    if (storedUser!==null) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user'); // Remove invalid data
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{user, setUser}}>
    <div className="App">
      <Router>
     <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/account/:subpages?" element={<AccountPage/>}/>
          <Route exact path="/account/:subpages?/newplace" element={<AccomodationForm/>}/>
          <Route exact path="/places/:id" element={<PlacePage/>}/>
        </Routes>
        <Footer/>
     </Router>
    </div>
    </UserContext.Provider>
    
  );
}

export default App;
