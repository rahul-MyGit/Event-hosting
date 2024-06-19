import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import EventListing from './components/EventListing';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Signup from './components/Signup';
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Toaster } from "react-hot-toast";

const fetchAuthUser = async () => {
  try {
    const res = await axios.get('/api/auth/me');
    return res.data.user;
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    return null;
  }
};

const App: React.FC = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: fetchAuthUser,
    retry: false,
  });

  if (isLoading){
    return (
      <div>
        Loading ...
      </div>
    )
  }
  
// email : "code4@gmail.com"
// events : []
// id : 7
// name : "code4"
  // console.log(authUser);
   
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={authUser ? <EventListing /> : <Navigate to={'/login'}/>} />
        <Route path="/user/:id" element={authUser ? <UserProfile /> : <Navigate to={'/login'}/>} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={'/events'}/>} />
        <Route path="/Signup" element={!authUser ? <Signup /> :  <Navigate to={'/events'}/>} />

      </Routes>

      <Toaster />
    </Router>
  );
};

export default App;