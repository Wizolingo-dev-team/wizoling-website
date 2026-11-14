import React from "react";
import HomeHero from "./Hero";
import HomeFeaturedSongs from "./FeaturedSongs";
import HomeUpcomingEvents from "./UpcomingEvents";
import HomeGalleryPreview from "./GalleryPreview";
import HomeNewsHighlights from "./NewsHighlights";
import HomeBookingCta from "./BookingCta";

export default function HomeSections() {
  return (
    <div className="space-y-0 pb-20">
      <HomeHero />
      <HomeFeaturedSongs />
      <HomeUpcomingEvents />
      <HomeGalleryPreview />
      <HomeNewsHighlights />
      <HomeBookingCta />
    </div>
  );
}

