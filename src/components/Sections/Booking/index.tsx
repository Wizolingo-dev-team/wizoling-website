import React from "react";
import BookingBanner from "./Banner";
import BookingForm from "./BookingForm";

export default function BookingSections() {
  return (
    <div className="space-y-0 pb-20">
      <BookingBanner />
      <BookingForm />
    </div>
  );
}

