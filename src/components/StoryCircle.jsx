import React from "react";

export default function StoryCircle({ story, onClick }) {
  return (
    <div onClick={() => onClick(story)}>
      {story.isImage ? (
        <img
          src={story.image}
          alt=""
          className="w-16 h-16 rounded-full border-2 border-purple-600 cursor-pointer object-cover hover:scale-105 transition-transform duration-300 shadow-lg"
        />
      ) : (
        <video
          src={story.image}
          className="w-16 h-16 rounded-full border-2 border-purple-600 cursor-pointer object-cover hover:scale-105 transition-transform duration-300 shadow-lg"
          autoPlay
          loop
          muted
        />
      )}
    </div>
  );
}
