import React from "react";
import EventsBanner from "./Banner";
import EventsList from "./EventsList";

export default function EventsSections() {
  return (
    <div className="space-y-0 pb-20">
      <EventsBanner />
      <EventsList />
    </div>
  );
}

