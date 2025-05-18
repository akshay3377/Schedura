"use client";

import useFetch from "@/hooks/use-fetch";
import { createBooking } from "@/actions/bookings";
import React from "react";

export default function Page() {
  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  return (
    <div>
      <div className="text-center p-10 border">
        <h2 className="text-2xl font-bold mb-4">Booking successful!</h2>

        {data?.meetLink && (
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
    </div>
  );
}
