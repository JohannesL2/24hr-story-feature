import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        key={story.id}
        className="relative w-full max-w-md h-[80vh] rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        >
    <div className="absolute top-3 left-3 right-3 h-1 bg-white/30 rounded-full overflow-hidden z-10">
      <motion.div
        className="h-full bg-white"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 5, ease: "linear" }}
        onAnimationComplete={onNextStory}
      />
    </div>

      {story.isImage ? (
        <img
          src={story.image}
          alt=""
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          src={story.image}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
      )}
      <div className="absolute inset-0 flex">
        <div className="w-1/2" onClick={onClose}/>
        <div className="w-1/2" onClick={onNextStory}/>
      </div>
      </motion.div>
    </motion.div>
    </AnimatePresence>
  );
}
