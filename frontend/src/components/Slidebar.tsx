import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios,{ isAxiosError } from "axios";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

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

interface DataType {
    email: string;
    id: number;
    name: string;
    event: EventTypes[];
}



function Slidebar() {
    const queryClient = useQueryClient();
    const {mutate: logoutMutate} = useMutation({
        mutationFn: async() =>{
            try {
                await axios.post("/api/auth/logout");
            } catch (error) {
                console.error(error);
                const errrorMsg = isAxiosError(error) ? error.response?.data?.message : "Something went wrong";
                toast.error(errrorMsg);
            }
        },
        onSuccess: () => {
            toast.success("Logout Successfully");
            queryClient.invalidateQueries({queryKey: ["authUser"]});
        },
    });


    const {data : {id} = {}} : {data? : Partial<DataType>} = useQuery({queryKey: ["authUser"]})

  return (
    <div className="bg-red-300 h-screen flex flex-col justify-center text-center">
      <Link to={`/user/${id}`} className="m-5 text-xl">
        <div>User Details</div>
      </Link>
      <Link to={`/events`} className="m-5 text-xl">
        <div>All Events</div>
      </Link>
     <div onClick={(e)=>{
        e.preventDefault();
        logoutMutate();
     }} className="cursor-pointer m-5 text-xl">Logout</div>
    </div>
  )
}

export default Slidebar
