import React from "react";
import MotionSection from "@src/components/MotionSection";
import HomeHero from "./Hero";
import HomeFeaturedSongs from "./FeaturedSongs";
import HomeFeaturedPlayerCard from "./FeaturedPlayerCard";
import HomeGalleryPreview from "./GalleryPreview";
import HomeUpcomingEvents from "./UpcomingEvents";
import HomeNewsHighlights from "./NewsHighlights";
import HomeBookingCta from "./BookingCta";

export default function HomeSections() {
  return (
    <div className="space-y-0 pb-20">
      <HomeHero />
      <MotionSection>
        <HomeFeaturedSongs />
      </MotionSection>
      <MotionSection>
        <HomeFeaturedPlayerCard />
      </MotionSection>
      <MotionSection>
        <HomeGalleryPreview />
      </MotionSection>
      <MotionSection>
        <HomeUpcomingEvents />
      </MotionSection>
      <MotionSection>
        <HomeNewsHighlights />
      </MotionSection>
      <MotionSection>
        <HomeBookingCta />
      </MotionSection>
    </div>
  );
}
