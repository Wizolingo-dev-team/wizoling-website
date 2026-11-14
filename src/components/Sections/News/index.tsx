import React from "react";
import MotionSection from "@src/components/MotionSection";
import NewsBanner from "./Banner";
import NewsArticlesList from "./ArticlesList";

export default function NewsSections() {
  return (
    <div className="space-y-0 pb-20">
      <MotionSection>
        <NewsBanner />
      </MotionSection>
      <MotionSection delay={0.1}>
        <NewsArticlesList />
      </MotionSection>
    </div>
  );
}
