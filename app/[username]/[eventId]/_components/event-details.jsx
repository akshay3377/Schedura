"use client";

import { Calendar, Clock, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchParams } from "next/navigation";
import { format, parseISO, addMinutes } from "date-fns";

export default function EventDetails({ event }) {
  const searchParams = useSearchParams();

  const dateParam = searchParams.get("date"); // "2025-05-23"
  const timeParam = searchParams.get("time"); // "2025-05-23T08:30:00.000Z"

  const selectedDate = dateParam ? parseISO(dateParam) : null;
  const selectedTime = timeParam ? parseISO(timeParam) : null;

  const dateFormatted = selectedDate
    ? format(selectedDate, "EEEE, MMMM d, yyyy")
    : null;

  const { user } = event;

  return (
    <div className="">
      <div className="flex flex-col space-y-3">
        <Avatar className="w-7 h-7 ">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-md font-semibold">{user.name}</h2>
        </div>

        <h1 className="text-3xl font-bold ">{event.title}</h1>

        {dateFormatted && selectedTime && (
          <div className="flex text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            <div>
              <p className="mb-1">{dateFormatted}</p>
              <TimeRangeDisplay start={selectedTime} duration={event.duration} />
            </div>
          </div>
        )}

        <div className="flex items-center text-sm">
          <Clock className="mr-2 h-4 w-4" />
          <span>{event.duration} minutes</span>
        </div>

        <div className="flex items-center text-sm">
          <Video className="mr-2 h-4 w-4" />
          <span>Google Meet</span>
        </div>

        <p className="text-sm font-medium">{event.description}</p>
      </div>
    </div>
  );
}

// ✅ TimeRangeDisplay as a proper component
function TimeRangeDisplay({ start, duration }) {
  if (!start) return <p className="text-sm text-muted-foreground">No time selected</p>;

  const end = addMinutes(start, duration); // use minutes from `event.duration`

  const timeRange = `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`;
  return <p>{timeRange}</p>;
}
