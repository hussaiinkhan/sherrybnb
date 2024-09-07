import React, { useState,useEffect} from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountPage from "./components/AccountPage";
import AccomodationForm from "./components/AccomodationForm"
import Home from "./components/Home";
 import { UserContext } from './contexts/UserContext'
import PlacePage from "./components/PlacePage";
import Footer from "./components/Footer";
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
