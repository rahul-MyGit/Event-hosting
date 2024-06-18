import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
       <button type="submit">
        {isPending ? 'Loading...' : "Signup"}
      </button>
      {isError && <p>{error.message}</p>}
    </form>
  );
};

export default Register;
