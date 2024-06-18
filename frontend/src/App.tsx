import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EventListing from './components/EventListing';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Signup from './components/Signup';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventListing events={[]} />} />
        <Route path="/profile" element={<UserProfile user={{ id: 0, email: '', name: '' }} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;