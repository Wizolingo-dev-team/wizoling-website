import React from "react";
import BiographyBanner from "./Banner";
import BiographyStory from "./Story";
import BiographyDiscography from "./Discography";

export default function BiographySections() {
  return (
    <div className="space-y-0 pb-20">
      <BiographyBanner />
      <BiographyStory />
      <BiographyDiscography />
    </div>
  );
}

