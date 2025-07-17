import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddStoryButton from "./components/AddStoryButton";
import StoryReel from "./components/StoryReel";
import StoryViewer from "./components/StoryViewer";
import Footer from "./components/Footer";

function App() {
  const [stories, setStories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const activeStory = activeIndex !== null ? stories[activeIndex] : null;

  const handleAddStory = (story) => {
    console.log(
      "Added story with timestamp:",
      story.timestamp,
      "now:",
      Date.now()
    );
    setStories((prev) => [story, ...prev]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setStories((prev) =>
        prev.filter((story) => now - story.timestamp < 10 * 60 * 1000)
      );
    }, 10000); // 10 min
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-black min-h-screen p-7 flex flex-col min-h-screen">
      <h1 className="text-5xl text-white mb-4">📸 24hr Story Feature</h1>
      <div className="flex gap-4 items-center flex flex-row p-7 rounded-2xl bg-white/90">
        <AddStoryButton onAddStory={handleAddStory} />
        <StoryReel
          stories={stories}
          onStoryClick={(story) =>
            setActiveIndex(stories.findIndex((s) => s.id === story.id))
          }
        />
      </div>
      <StoryViewer
        story={activeStory}
        onClose={() => setActiveIndex(null)}
        onNextStory={() => {
          if (activeIndex !== null && activeIndex < stories.length - 1) {
            setActiveIndex(activeIndex + 1);
          } else {
            setActiveIndex(null);
          }
        }}
      />

      <Footer />
    </div>
  );
}

export default App;
