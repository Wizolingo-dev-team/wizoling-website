import React from "react";
import MotionSection from "@src/components/MotionSection";
import BiographyBanner from "./Banner";
import BiographyStory from "./Story";
import BiographyDiscography from "./Discography";

export default function BiographySections() {
  return (
    <div className="min-h-screen bg-[#111111] space-y-0 pb-16">
      <MotionSection>
        <BiographyBanner />
      </MotionSection>
      <MotionSection delay={0.1}>
        <BiographyStory />
      </MotionSection>
      <MotionSection delay={0.15}>
        <BiographyDiscography />
      </MotionSection>
    </div>
  );
}
