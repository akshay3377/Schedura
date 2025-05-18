// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { format, isValid } from "date-fns";
// import { DayPicker } from "react-day-picker";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { createBooking } from "@/actions/bookings";
// import { bookingSchema } from "@/app/lib/validators";
// import useFetch from "@/hooks/use-fetch";
// import Form from "./form";
// import "react-day-picker/style.css";

// export default function BookingForm({ event, availability }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTime, setSelectedTime] = useState(null); // ISO string

//   console.log("selectedDate", selectedDate);

//   const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

//   const availableDays = availability.map((day) => new Date(day.date));

//   console.log("availability", availability);

//   const formMethods = useForm({
//     resolver: zodResolver(bookingSchema),
//   });

//   console.log("formMethods", formMethods.formState.errors);

//   useEffect(() => {
//     const dateParam = searchParams.get("date");
//     const timeParam = searchParams.get("time");

//     if (dateParam) {
//       const parsedDate = new Date(dateParam);
//       if (isValid(parsedDate)) {
//         setSelectedDate(parsedDate);
//       }
//     }

//     if (timeParam) {
//       const parsedTime = new Date(timeParam);
//       if (isValid(parsedTime)) {
//         setSelectedTime(parsedTime.toISOString());
//       }
//     }
//   }, [searchParams]);

//   // Find time slots for selected date
//   const timeSlots = selectedDate
//     ? availability.find(
//         (day) => day.date === format(selectedDate, "yyyy-MM-dd")
//       )?.slots || []
//     : [];

//   console.log("timeSlots", timeSlots);

//   // ✅ Handle date change
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setSelectedTime(null);
//     const params = new URLSearchParams(searchParams.toString());
//     if (date) {
//       params.set("date", format(date, "yyyy-MM-dd"));
//       params.delete("time");
//     }
//     router.replace(`?${params.toString()}`);
//   };

//   // ✅ Handle time selection (convert to ISO + push to URL)
//   const handleTimeChange = (slot) => {
//     if (!selectedDate) return;
//     const fullTime = new Date(
//       `${format(selectedDate, "yyyy-MM-dd")}T${slot}`
//     ).toISOString();
//     setSelectedTime(fullTime);
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("time", fullTime);
//     router.replace(`?${params.toString()}`);
//   };

//   // ✅ Handle "Back" button: clear time from state + URL
//   const handleBack = () => {
//     setSelectedTime(null);
//     const params = new URLSearchParams(searchParams.toString());
//     params.delete("time");
//     router.replace(`?${params.toString()}`);
//   };

//   const onSubmit = async (formData) => {
//     console.log("formData", formData);
//     if (!selectedDate || !selectedTime) return;

//     const startTime = new Date(selectedTime);
//     const endTime = new Date(startTime.getTime() + event.duration * 60000);

//     const bookingData = {
//       eventId: event.id,
//       name: formData.name,
//       email: formData.email,
//       startTime: startTime.toISOString(),
//       endTime: endTime.toISOString(),
//       additionalInfo: formData.additionalInfo,
//     };

//     await fnCreateBooking(bookingData);
//   };

//   if (data) {
//     router.push("/booking");
//   }

//   const selectedTimeFormatted = selectedTime
//     ? format(new Date(selectedTime), "HH:mm")
//     : null;

//   console.log("selectedTimef", selectedTime);

//   return (
//     <>
//       {/* Show date & time selection if time is not selected */}
//       {!selectedTime && (
//         <>
//           <div className="border-r border-l w-dull md:w-[470px]">
//             <div className="w-full  h-full flex justify-center p-6 ">
//               <DayPicker
//                 weekStartsOn={0} // Sunday
//                 formatters={{
//                   formatWeekdayName: (day) =>
//                     day
//                       .toLocaleDateString("en-US", { weekday: "short" })
//                       .toUpperCase(),
//                 }}
//                 className=""
//                 mode="single"
//                 selected={selectedDate}
//                 onSelect={handleDateChange}
//                 disabled={[{ before: new Date() }]}
//                 modifiers={{ available: availableDays }}
//                 modifiersClassNames={{
//                   today: "my-today",
//                   available: "available-day",
//                   selected: "selected-day",
//                 }}
//                 modifiersStyles={{
//                   available: {
//                     backgroundColor: "#404040", // Correct property name
//                   },
//                 }}
//               />
//             </div>
//           </div>

//           {selectedDate && (
//             <div className=" w-full md:w-[300px]   p-4 md:overflow-scroll no-scrollbar">
//               <div className="mb-4">
//                 <h3 className="text-md font-semibold mb-4">
//                   {format(selectedDate, "EEE dd")}
//                 </h3>
//                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
//                   {timeSlots.map((slot) => (
//                     <Button
//                       key={slot}
//                       variant={
//                         selectedTimeFormatted === slot ? "default" : "outline"
//                       }
//                       onClick={() => handleTimeChange(slot)}
//                     >
//                       {slot}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Show form if both date & time selected */}
//       {selectedDate && selectedTime && (
//         <Form
//           handleBack={handleBack}
//           formMethods={formMethods}
//           onSubmit={formMethods.handleSubmit(onSubmit)}
//           loading={loading}
//         />
//       )}
//     </>
//   );
// }




"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { format, isValid, parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/actions/bookings";
import { bookingSchema } from "@/app/lib/validators";
import useFetch from "@/hooks/use-fetch";
import Form from "./form";
import "react-day-picker/style.css";

export default function BookingForm({ event, availability }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse date & time from URL params
  const dateParam = searchParams.get("date");
  const timeParam = searchParams.get("time");

  const selectedDate = dateParam && isValid(parseISO(dateParam)) ? parseISO(dateParam) : new Date();
  const selectedTime = timeParam && isValid(parseISO(timeParam)) ? timeParam : null;

  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  const availableDays = availability.map((day) => new Date(day.date));

  const formMethods = useForm({
    resolver: zodResolver(bookingSchema),
  });

  // Find time slots for selected date
  const timeSlots = selectedDate
    ? availability.find((day) => day.date === format(selectedDate, "yyyy-MM-dd"))?.slots || []
    : [];

  // Handle date change: update URL params only
  const handleDateChange = (date) => {
    const params = new URLSearchParams(searchParams.toString());
    if (date) {
      params.set("date", format(date, "yyyy-MM-dd"));
      params.delete("time");
      router.replace(`?${params.toString()}`);
    }
  };

  // Handle time change: update URL params only
  const handleTimeChange = (slot) => {
    if (!selectedDate) return;
    const fullTime = new Date(`${format(selectedDate, "yyyy-MM-dd")}T${slot}`).toISOString();
    const params = new URLSearchParams(searchParams.toString());
    params.set("time", fullTime);
    router.replace(`?${params.toString()}`);
  };

  // Handle back button: remove time param
  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("time");
    router.replace(`?${params.toString()}`);
  };

  const onSubmit = async (formData) => {
    if (!selectedDate || !selectedTime) return;

    const startTime = new Date(selectedTime);
    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id,
      name: formData.name,
      email: formData.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: formData.additionalInfo,
    };

    await fnCreateBooking(bookingData);
  };

  if (data) {
    return (
      <div className="text-center p-10 border ">
        <h2 className="text-2xl font-bold mb-4">Booking successful!</h2>
        {data.meetLink && (
          <p>
            Join the meeting:{" "}
            <a
              href={data.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {data.meetLink}
            </a>
          </p>
        )}
      </div>
    );
  }
  const selectedTimeFormatted = selectedTime
    ? format(new Date(selectedTime), "HH:mm")
    : null;

  return (
    <>
      {/* Show date & time selection if time is not selected */}
      {!selectedTime && (
        <>
          <div className="md:border-r  px-4 pt-4 pb-8 md:pb-20 md:border-l w-full md:w-[470px]">
            <div className="w-full h-full flex justify-center ">
              <DayPicker
          
                weekStartsOn={0} 
                formatters={{
                  formatWeekdayName: (day) =>
                    day.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
                }}
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                disabled={[{ before: new Date() }]}
                modifiers={{ available: availableDays }}
                modifiersClassNames={{
                  today: "my-today",
                  available: "available-day",
                  selected: "selected-day",
                }}
                modifiersStyles={{
                  available: {
                    backgroundColor: "#404040",
                  },
                }}
              />
            </div>
          </div>

          {selectedDate && (
            <div className="w-full md:w-[300px] p-6 md:overflow-scroll no-scrollbar">
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-4">{format(selectedDate, "EEE dd")}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTimeFormatted === slot ? "default" : "outline"}
                      onClick={() => handleTimeChange(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Show form if both date & time selected */}
      {selectedDate && selectedTime && (
        <Form
          handleBack={handleBack}
          formMethods={formMethods}
          onSubmit={formMethods.handleSubmit(onSubmit)}
          loading={loading}
        />
      )}
    </>
  );
}
