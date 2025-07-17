import React from "react";
import StoryCircle from "./StoryCircle";

export default function StoryReel({ stories, onStoryClick }) {
  return (
    <div className="flex gap-4 items-center">
      {stories.map((story) => (
        <StoryCircle key={story.id} story={story} onClick={onStoryClick} />
      ))}
    </div>
  );
}
