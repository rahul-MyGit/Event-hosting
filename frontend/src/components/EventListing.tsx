
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Slidebar from "./Slidebar";
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

const EventListing: React.FC = () => {

  const {data: events, isLoading, refetch, isRefetching} = useQuery<EventTypes[]>({
    queryKey: ["events"],
    queryFn: async ()=>{
      try {
        const res = await axios.get<EventTypes[]>("/api/event/events")
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMsg = isAxiosError(error) ? error.response?.data?.message : "An unexpected error occurred";
          toast.error(errorMsg);
          } else {
          console.error(error);
          toast.error("An unexpected error occurred");
          }
          return [];
      }
    }
  });

  useEffect(()=>{
    refetch();
  }, [refetch, events])
  return (
    <div className="flex">
      <div className="flex-1">
        <Slidebar />
      </div>
    <div >
      <h2 className="flex justify-center bg-slate-600 pb-3 text-3xl">Upcoming Events : </h2>
      {!isLoading && !isRefetching &&events?.length === 0 && <p className='text-center my-4'>No posts 👻</p>}
			{!isLoading && !isRefetching && events && (
      //    <ul>
      //    {events?.map((event) => (
      //      <li key={event.id} className="mb-3">
      //        <h3>{event.title}</h3>
      //        <p>{event.description}</p>
      //        <p>{event.date}</p>
      //        <p>{event.location}</p>
      //      </li>
      //    ))}
      //  </ul>
      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      { events?.map((event) => (
        <div key={event.id} className="rounded-md border">
          <img
            src="https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Laptop"
            className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
          />
          <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">{event.title}</h1>
            <p className="mt-3 text-sm text-gray-600">
              {event.description}
            </p>
            <div className="mt-4">
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #Rave
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #Classic
              </span>
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                #sad
              </span>
            </div>
            <div className="mt-3 flex items-center space-x-2">
              <span className="block text-sm font-semibold">Date: </span>
              <span>{event.date}</span>
            </div>
            <div className="mt-5 flex items-center space-x-2">
              <span className="block text-sm font-semibold"> Location :</span>
              <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                {event.location}
              </span>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Book the show
            </button>
          </div>
        </div>
      ))}
    </div>
			)}
     
    </div>
    </div>
  );
};

export default EventListing;