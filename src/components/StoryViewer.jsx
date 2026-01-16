import React, { useState } from "react";
import { AnimatePresence, motion} from "framer-motion";

export default function StoryViewer({ story, onClose, onNextStory, onPrevStory }) {
  const [paused, setPaused] = useState(false);

  if (!story) return null;

  return (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ scale: 0.9, y: 40, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
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
        
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x < -100 && onNextStory) onNextStory();
          if (info.offset.x > 100 && onPrevStory) onPrevStory();
        }}
        >

    <div className="absolute top-3 left-3 right-3 h-1 bg-white/30 rounded-full overflow-hidden z-10">
      <motion.div
      key={story.id}
        className="h-full bg-white"
        initial={{ width: 0 }}
        animate={{ width: paused ? 0 : "100%" }}
        transition= {{ duration: 5, ease: "linear" }}
        onAnimationComplete={() => {
          if (!paused && onNextStory) onNextStory();
        }}
      />
    </div>

      {story?.isImage ? (
        <motion.img
          src={story.image}
          alt=""
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 5, ease: "linear" }}
        />
      ) : (
        <motion.video
          src={story.image}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 5, ease: "linear" }}
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
