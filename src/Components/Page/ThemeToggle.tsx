import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";

const ThemeToggle = () => {
  return (
    <div className="inline-flex overflow-hidden border border-gray-200 rounded-full h-10 ml-4">
      <label className="cursor-pointer">
        <input
          type="radio"
          name="worktype"
          className="sr-only peer"
          onClick={() => {
            document.documentElement.classList.toggle("dark", false);
            localStorage.setItem("theme", "light");
          }}
        />
        <span className="relative inline-flex items-center h-full rounded-full py-2 px-4 space-x-2 text-sm peer-checked:bg-gray-200 dark:peer-checked:bg-gray-700 text-black dark:text-white">
          <MdLightMode />
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="radio"
          name="worktype"
          className="sr-only peer"
          checked
          onClick={() =>
          {
            document.documentElement.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
            localStorage.setItem("theme", "system");
          }}
        />
        <span className="relative inline-flex items-center h-full rounded-full py-2 px-4 space-x-2 text-sm peer-checked:bg-gray-200 dark:peer-checked:bg-gray-700 text-black dark:text-white">
          <RiComputerLine />
        </span>
      </label>
      <label className="cursor-pointer">
        <input
          type="radio"
          name="worktype"
          className="sr-only peer"
          onClick={() => {
            document.documentElement.classList.toggle("dark", true);
            localStorage.setItem("theme", "dark");
          }}
        />
        <span className="relative inline-flex items-center h-full rounded-full py-2 px-4 space-x-2 text-sm peer-checked:bg-gray-200 dark:peer-checked:bg-gray-700 text-black dark:text-white">
          <MdOutlineDarkMode />
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
