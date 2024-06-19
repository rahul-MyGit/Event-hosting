import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: ''
  });

  const {mutate: SignMutation, isError, isPending, error} = useMutation({
    mutationFn: async ({email, name, password} : RegisterData) => {
      try {
        const res = await axios.post("/api/auth/signup", {
          email,
          name,
          password 
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        toast.success('Account created successfully');
        queryClient.invalidateQueries({ queryKey: ['authUser'] });
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
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    SignMutation(formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     name="name"
    //     value={formData.name}
    //     onChange={handleInputChange}
    //     placeholder="Name"
    //   />
    //   <input
    //     type="email"
    //     name="email"
    //     value={formData.email}
    //     onChange={handleInputChange}
    //     placeholder="Email"
    //   />
    //   <input
    //     type="password"
    //     name="password"
    //     value={formData.password}
    //     onChange={handleInputChange}
    //     placeholder="Password"
    //   />
    //    <button type="submit">
    //     {isPending ? 'Loading...' : "Signup"}
    //   </button>
    //   {isError && <p>{error.message}</p>}
    // </form>
    // </div>
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button onClick={handleSubmit} className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">
                  {isPending ? 'Loading...' : "Signup"}
                  </span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to='/login'>
                    <span className="text-blue-900 font-semibold">Login</span>
                  </Link>
                  {isError && <p>{error.message}</p>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Register;
