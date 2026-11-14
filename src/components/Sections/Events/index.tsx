import React from "react";
import MotionSection from "@src/components/MotionSection";
import EventsBanner from "./Banner";
import EventsList from "./EventsList";

export default function EventsSections() {
  return (
    <div className="space-y-0 pb-20">
      <MotionSection>
        <EventsBanner />
      </MotionSection>
      <MotionSection delay={0.1}>
        <EventsList />
      </MotionSection>
    </div>
  );
}
