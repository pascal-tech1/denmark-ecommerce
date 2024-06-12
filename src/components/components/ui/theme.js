"use client";

import { useEffect, useRef, useState } from "react";
import {
	MdDarkMode,
	MdLightMode,
	MdOutlineArrowDropDown,
	MdOutlineArrowDropUp,
} from "react-icons/md";

import { GrSystem } from "react-icons/gr";

const Theme = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDarkMode(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setPrefersDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && prefersDarkMode)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [prefersDarkMode]);
  const isSystemInDakMode = prefersDarkMode;
  const defaultTheme =
    typeof window !== "undefined" && localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "system";

  const [theme, setTheme] = useState(defaultTheme);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const iconRef = useRef();

  const filters = ["light", "dark", "system"];
  const handleSelected = (theme) => {
    setTheme(theme);
    setIsDropdownOpen(!isDropdownOpen);
    if (theme !== "system") {
      if (typeof window !== "undefined") {
        localStorage.theme = theme;
      }
      document.documentElement.classList.toggle("dark", theme === "dark");
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem("theme");
      }
      if (isSystemInDakMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const ThemeIcon = ({ theme }) => {
    if (theme === "system") {
      return <GrSystem />;
    } else if (theme === "dark") {
      return <MdDarkMode />;
    } else return <MdLightMode />;
  };
  useEffect(() => {
    const handleClick = (event) => {
      if (
        (dropdownRef.current && dropdownRef.current.contains(event.target)) ||
        (iconRef?.current && iconRef?.current.contains(event.target))
      ) {
        // Click occurred inside the div
      } else {
        // Click occurred outside the div
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      // Cleanup: Remove event listener when component unmounts
      document.removeEventListener("click", handleClick);
    };
  }, [dropdownRef, iconRef]);

  return (
    <div className=" relative z-50 w-20  ">
      <button
        ref={iconRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="  flex gap-2 items-center border px-2 py-[0.2rem] rounded-lg  "
      >
        <ThemeIcon theme={theme} />
        {theme}
        {isDropdownOpen ? (
          <MdOutlineArrowDropDown className=" text-center" />
        ) : (
          <MdOutlineArrowDropUp className=" text-center" />
        )}
      </button>

      <div
        ref={dropdownRef}
        className={` ${
          isDropdownOpen ? "absolute" : "hidden"
        }  top-10 border dark:border-gray-700  -left-2 py-4 px-3 rounded-md drop-shadow-md`}
      >
        {filters.map((SelectTheme) => {
          return (
            <button
              onClick={() => handleSelected(SelectTheme)}
              className={`${
                theme === SelectTheme && " text-blue-500"
              } flex  items-center hover:bg-primary-foreground gap-2 py-1 px-2 rounded-lg`}
            >
              <ThemeIcon theme={SelectTheme} />
              {SelectTheme}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Theme;
