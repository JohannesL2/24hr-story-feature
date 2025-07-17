import React from "react";
import { FaGithub } from "react-icons/fa";

export default function () {
  return (
    <footer className="border-2 rounded-2xl justify-center items-center flex text-gray-300 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center flex items-center justify-center gap-3">
        <p>© {new Date().getFullYear()} 📸 24hr Story Feature by Johannesl2</p>
        <a href="https://github.com/johannesl2" target="_blank">
          <FaGithub className="size-16 text-white hover:text-gray-300 hover:cursor-pointer" />
        </a>
      </div>
    </footer>
  );
}
