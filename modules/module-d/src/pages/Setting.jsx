import React, { useEffect, useState } from "react";

import { setTheme, getTheme } from "../utilities/theme";
import {
  getCarparkSortingMethod,
  setCarparkSortingMethods,
} from "../helpers/carparkSortingMethods";

function Setting() {
  return (
    <div className="py-4 px-4">
      <div className="flex flex-col gap-4 w-full pb-4">
        <ThemeSettingSection />
        <CarkSortingMethodSection />
      </div>
    </div>
  );
}

const THEMES = ["light", "dark"];

function ThemeSettingSection() {
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    const theme = getTheme();
    setCurrentTheme(theme || "light");
  }, []);

  function handleSetTheme(e) {
    const newTheme = e.target.value;
    console.log(newTheme);
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  }
  return (
    <div className="border-b border-solid border-black dark:border-white pb-8">
      <h4 className="text-2xl font-bold mb-4">Theme</h4>
      <div className="flex items-start flex-col gap-3">
        {THEMES.map((theme) => (
          <div key={theme} className="flex items-center gap-2">
            <input
              id={`${theme}-theme`}
              type="radio"
              name="theme"
              value={theme}
              onChange={handleSetTheme}
              checked={currentTheme === theme}
            />
            <label
              htmlFor={`${theme}-theme`}
              className="cursor-pointer text-lg font-medium"
            >
              {theme}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

const SORTING_METHODS = ["alphabetical", "distance"];

function CarkSortingMethodSection() {
  const [currentMethod, setCurrentMethod] = useState("");

  useEffect(() => {
    const method = getCarparkSortingMethod();
    setCurrentMethod(method || "alphabetical");
  }, []);

  function handleSetSortingMethod(e) {
    const newMethod = e.target.value;
    console.log(newMethod);
    setCarparkSortingMethods(newMethod);
    setCurrentMethod(newMethod);
  }

  return (
    <div>
      <h4 className="text-2xl font-bold mb-4">Carkpark Sorting Method</h4>
      <div className="flex items-start flex-col gap-3">
        {SORTING_METHODS.map((method) => (
          <div key={method} className="flex items-center gap-2">
            <input
              id={`${method}-method`}
              type="radio"
              name="method"
              value={method}
              onChange={handleSetSortingMethod}
              checked={currentMethod === method}
            />
            <label
              htmlFor={`${method}-method`}
              className="cursor-pointer text-lg font-medium"
            >
              {method}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Setting;
