"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Form({ formMethods, onSubmit, handleBack, loading }) {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4  w-full md:w-[400px] px-4 mx-auto border-l py-12"
    >
      <div className="space-y-1">
        <Label  htmlFor="name">Name *</Label>
        <Input id="name" {...register("name")} placeholder="Your Name" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder="Your Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="additionalInfo">Additional Info</Label>
        <Textarea
          id="additionalInfo"
          {...register("additionalInfo")}
          placeholder="Please share anything that will help prepare for our meeting."
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" type="button" onClick={handleBack}>
          Back
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Scheduling..." : "Confirm"}
        </Button>
      </div>
    </form>
  );
}
