import React from "react";
import NewsBanner from "./Banner";
import NewsArticlesList from "./ArticlesList";

export default function NewsSections() {
  return (
    <div className="space-y-0 pb-20">
      <NewsBanner />
      <NewsArticlesList />
    </div>
  );
}

