import { useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

export default function AddStoryButton({ onAddStory }) {
  const fileInputRef = useRef(null);

  const handleAddClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = /\.(jpe?g|png|gif|webp)$/i.test(file.name);
    const objectUrl = URL.createObjectURL(file);

    const story = {
      id: Date.now(),
      image: objectUrl,
      timestamp: Date.now(),
      isImage,
    };

    onAddStory(story);
    e.target.value = null;
  };

  return (
    <div>
      <CiCirclePlus
        className="size-18 text-white cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={handleAddClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="hidden"
      />
    </div>
  );
}
