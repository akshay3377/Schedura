"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Form({ formMethods, onSubmit, handleBack, loading }) {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <form onSubmit={onSubmit} className="space-y-4   w-full md:w-[400px]  p-4 mx-auto    border-l">
      <div className="flex justify-center items-center">
        <Input {...register("name")} placeholder="Your Name" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input {...register("email")} type="email" placeholder="Your Email" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Textarea
          {...register("additionalInfo")}
          placeholder="Additional Information"
        />
      </div>
  <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={handleBack}>
         Back
      </Button>
      <Button type="submit" disabled={loading} className="">
        {loading ? "Scheduling..." : "Schedule Event"}
      </Button>
  </div>
    </form>
  );
}
