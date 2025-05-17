import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default function EventDetails({ event }) {
  const { user } = event;
  return (
    <div className="">
   <div className="flex flex-col space-y-2">
       <Avatar className="w-6 h-6 ">
        <AvatarImage src={user.imageUrl} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-md font-semibold">{user.name}</h2>
        {/* <p className="text-gray-600">{user.email}</p> */}
      </div>

      <h1 className="text-3xl font-bold ">{event.title}</h1>
      <div className="flex items-center text-sm">
        <Clock className="mr-2 h-4 w-4 " />
        <span>{event.duration} minutes</span>
      </div>
      <div className="flex items-center  text-sm ">
        <Calendar className="mr-2 h-4 w-4  " />
        <span>Google Meet</span>
      </div>
      <p className=" text-sm font-medium">{event.description}</p>
   </div>
    </div>
  );
}
