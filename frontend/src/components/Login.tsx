// src/components/Login.tsx
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";
import axios, { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';


interface LoginDataType {
  email: string;
  password: string;
}
const Login: React.FC = () => {
  const queryClient = useQueryClient();

  const [loginData, setLoginData] = useState<LoginDataType>({
    email: '',
    password: ''
  });

  const {mutate: loginMutation, isError, isPending, error} = useMutation({
    mutationFn: async ({email, password} : LoginDataType)=>{
      try {
        const res = await axios.post("/api/auth/login",{
          email,
          password
        },{
          headers: {
            "Content-Type": "application/json"
          }
        })

        // toast.success("Account created successfully");
        //re fetch data for updating 
        queryClient.invalidateQueries({queryKey: ["authUser"]});
        return res.data;
      } catch (error) {
        console.log(error);
        
        if (axios.isAxiosError(error)) {
          const errorMsg = isAxiosError(error)? error.response?.data?.message : "Server is not responding";
          toast.error(errorMsg);
        } else {
          console.error(error);
          toast.error("An unexpected error occurred");

        }
        return;
      }
    }
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation(loginData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input type="email" name="email" value={loginData.email} onChange={handleInputChange} placeholder='email'/>
    //   <input type="password" name="password" value={loginData.password} onChange={handleInputChange} placeholder='password'/>
    //   <button type="submit">
    //     {isPending ? 'Loading...' : "Login"}
    //   </button>
    //   {isError && <p>{error.message}</p>}
    // </form>
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              name='email'
              value={loginData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              name='password'
              value={loginData.password}
              onChange={handleInputChange}
            />
            
          </div>
          <div className="mt-8">
            <button onClick={handleSubmit} className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
            {isPending ? 'Loading...' : "Login"}
            </button>
          </div>
          
          <div className="mt-4 flex items-center w-full text-center">
            <Link
              to="/signup"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-blue-700"> Sign Up</span>
            </Link>
          </div>
          {isError && <p>{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;