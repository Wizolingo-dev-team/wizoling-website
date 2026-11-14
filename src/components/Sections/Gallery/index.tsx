import React from "react";
import MotionSection from "@src/components/MotionSection";
import GalleryBanner from "./Banner";
import GalleryPhotoGrid from "./PhotoGrid";

export default function GallerySections() {
  return (
    <div className="space-y-0 pb-20">
      <MotionSection>
        <GalleryBanner />
      </MotionSection>
      <MotionSection delay={0.1}>
        <GalleryPhotoGrid />
      </MotionSection>
    </div>
  );
}
