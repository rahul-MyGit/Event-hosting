// src/components/UserProfile.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../api/apiService';

type UserProfileProps = {
  userId: number;
};

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { data, isLoading, error } = useQuery(['userProfile', userId], () => fetchUserProfile(userId));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {data?.data.name}</p>
      <p>Email: {data?.data.email}</p>
    </div>
  );
};

export default UserProfile;