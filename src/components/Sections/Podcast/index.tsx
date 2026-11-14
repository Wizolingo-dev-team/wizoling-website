import React from "react";
import PodcastBanner from "./Banner";
import PodcastEpisodesList from "./EpisodesList";

export default function PodcastSections() {
  return (
    <div className="space-y-0 pb-20">
      <PodcastBanner />
      <PodcastEpisodesList />
    </div>
  );
}

