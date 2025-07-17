import React, { useEffect, useState } from "react";

export default function StoryViewer({ story, onClose, onNextStory }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!story) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onNextStory) {
            onNextStory();
          } else {
            onClose();
          }
          return 100;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [story]);

  if (!story) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="absolute top-0 left-0 w-full p-4">
        <progress
          className="progress progress-info w-56 w-full h-1 rounded overflow-hidden transition-all duration-100 ease-linear"
          value={progress}
          max="100"
        />
      </div>

      {story.isImage ? (
        <img
          src={story.image}
          alt=""
          className="max-w-[90vw] max-h-[90vh] rounded-lg"
        />
      ) : (
        <video
          src={story.image}
          className="max-w-[90vw] max-h-[90vh] rounded-lg"
          autoPlay
          loop
          muted
        />
      )}
    </div>
  );
}
