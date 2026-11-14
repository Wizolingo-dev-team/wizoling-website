import React from "react";
import VideosHero from "./VideoHero";
import VideosGrid from "./VideoGrid";

export default function VideosSections() {
  return (
    <div className="space-y-0">
      <VideosHero />
      <VideosGrid />
    </div>
  );
}

