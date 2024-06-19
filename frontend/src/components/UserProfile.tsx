// src/components/UserProfile.tsx

import { useQuery} from '@tanstack/react-query';
import Slidebar from './Slidebar';
// import { useParams } from 'react-router-dom';


interface EventTypes {
  id: number,
  title: string,
  description: string,
  date?: string,
  location: string,
  hostId: number,
  host:
    {id: number,
      email: string,
      name:string
    }
  }

interface UserType {
  email: string;
  id: number;
  name: string;
  event: EventTypes[];
}


const UserProfile = () => {
  // const { id }= useParams(); //no need 

  const { data: authUser} = useQuery<UserType>({queryKey: ['authUser']});

  console.log(authUser);
  
  return (
    <div className='flex'>
      <div className='flex-1'>
        <Slidebar />
      </div>
      <div className='max-w-7xl w-full'>
      <h2 className="flex justify-center bg-slate-600 pb-3 text-3xl">Upcoming Events : </h2>
      
      <div className='mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4 bg-slate-200'>
      <div>
        <p>Name: {authUser?.name}</p>
        <p>Email: {authUser?.email}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserProfile;