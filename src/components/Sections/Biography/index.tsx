import React from "react";
import MotionSection from "@src/components/MotionSection";
import BiographyBanner from "./Banner";
import BiographyStory from "./Story";
import BiographyDiscography from "./Discography";

export default function BiographySections() {
  return (
    <div className="space-y-0 pb-20">
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
