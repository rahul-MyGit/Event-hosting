// src/components/Login.tsx
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";
import axios, { isAxiosError } from 'axios';


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
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={loginData.email} onChange={handleInputChange} placeholder='email'/>
      <input type="password" name="password" value={loginData.password} onChange={handleInputChange} placeholder='password'/>
      <button type="submit">
        {isPending ? 'Loading...' : "Login"}
      </button>
      {isError && <p>{error.message}</p>}
    </form>
  );
};

export default Login;