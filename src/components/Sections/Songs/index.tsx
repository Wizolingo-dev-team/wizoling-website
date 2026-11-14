import React from "react";
import SongsBanner from "./Banner";
import SongsTrackList from "./TrackList";

export default function SongsSections() {
  return (
    <div className="space-y-0 pb-20">
      <SongsBanner />
      <SongsTrackList />
    </div>
  );
}

