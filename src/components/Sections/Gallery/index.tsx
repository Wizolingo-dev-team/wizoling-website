import React from "react";
import GalleryBanner from "./Banner";
import GalleryPhotoGrid from "./PhotoGrid";

export default function GallerySections() {
  return (
    <div className="space-y-0 pb-20">
      <GalleryBanner />
      <GalleryPhotoGrid />
    </div>
  );
}

