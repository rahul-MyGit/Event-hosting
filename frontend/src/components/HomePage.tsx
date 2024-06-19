import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className=''>
      <h1 className='text-2xl font-bold text-center bg-slate-500 p-8'>Welcome to the Event Hosting Platform</h1>
      <div className='flex flex-col bg-gray-500 h-screen justify-center'>
        <div className='flex justify-center '>
        <div className='m-4'>
        <Link to='/signup'>
      <button className="rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30 ">
          Signup
        </button>
        
        </Link>
        </div>
        <div className='m-4'>
        <Link to='/login'>
        <button className="rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
          Login
        </button>
        </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;