import { useState, useEffect } from "react";
import CommandBar from "./components/CommanaBar";
import ConfigurationPanel from "./components/ConfigurationPanel";
import DragAndDropImage from "./components/DragAndDropImage";
import ThemeA from "./themes/ThemeA";
import ThemeB from "./themes/ThemeB";
import ThemeC from "./themes/ThemeC";
import ThemeD from "./themes/ThemeD";
import ThemeF from "./themes/ThemeF";

import {
  UploadImgButton,
  SettingButton,
  PrevButton,
  NextButton,
  FullScreenButton,
} from "./components/Buttons";

import useImageSlider from "./hooks/useImageSlider";

export default function App() {
  const {
    state,
    intervalRef,
    handleChangeMode,
    handleChangeTheme,
    handleSlide,
    handleFullScreen,
    handleSetCurrentImgIndex,
    handleSelectCommand,
    handleShowCommandBar,
  } = useImageSlider();

  const [searchCommandTerm, setSearchCommandTerm] = useState("");

  // This useEffect use to listening key down event
  useEffect(() => {
    function onKeyDown(e) {
      handleKeyDown(e);
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state.currentMode, state.showCommandBar, state.selectedCommandIndex]);

  // This useEffect handles the image slider behavior base on the current mode
  useEffect(() => {
    if (state.showDropArea) return;
    if (state.currentMode === "auto") {
      intervalRef.current = setInterval(() => handleSlide(1), 3000);
    } else if (state.currentMode === "random") {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * state.images.length);
        handleSetCurrentImgIndex(randomIndex);
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [state.currentMode]);

  // This useEffect disbales page scrolling when the command bar is visible
  useEffect(() => {
    // Whem the command bar is shown, disbale page scrolling
    if (state.showCommandBar) {
      document.body.style.overflow = "hidden";
    } else {
      // When the command bar is hidden, enable page scrolling
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [state.showCommandBar, state.showDropArea]);

  // Handle all keydown event from user
  function handleKeyDown(e) {
    const key = e.key;
    // Handle keydonw when command bar is shown
    if (state.showCommandBar) {
      if (key === "Escape") {
        e.preventDefault();
        handleShowCommandBar(false);
      }
      if (key === "ArrowDown") {
        console.log("up");
        e.preventDefault();
        handleSelectCommand(
          (state.selectedCommandIndex + 1) % filteredCommands.length
        );
      } else if (key === "ArrowUp") {
        e.preventDefault();
        handleSelectCommand(
          state.selectedCommandIndex <= 0
            ? filteredCommands.length - 1
            : state.selectedCommandIndex - 1
        );
      }
      if (key === "Enter") {
        e.preventDefault();
        handleRunCommand();
      }
      return;
    }

    // Allows user to open command bar by pressing Ctrl + K
    if (e.ctrlKey && key === "k") {
      e.preventDefault();
      handleSelectCommand(-1);
      handleShowCommandBar(true);
      return;
    }

    // Allows user slide images to left and right
    if (state.currentMode === "manual") {
      if (key === "ArrowLeft") {
        e.preventDefault();
        handleSlide(-1);
      } else if (key === "ArrowRight") {
        e.preventDefault();
        handleSlide(1);
      }
    }

    return;
  }

  function handleRunCommand() {
    COMMANDS[state.selectedCommandIndex].fn();
    handleShowCommandBar(false);
  }

  const COMMANDS = [
    {
      name: "Change to manual control mode",
      fn: () => handleChangeMode("manual"),
    },
    {
      name: "Change to auto-playing mode",
      fn: () => handleChangeMode("auto"),
    },
    {
      name: "Change to random mode",
      fn: () => handleChangeMode("random"),
    },
    {
      name: "Switch to theme A",
      fn: () => handleChangeTheme("a"),
    },
    {
      name: "Switch to theme B",
      fn: () => handleChangeTheme("b"),
    },
    {
      name: "Switch to theme C",
      fn: () => handleChangeTheme("c"),
    },
    {
      name: "Switch to theme D",
      fn: () => handleChangeTheme("d"),
    },
    {
      name: "Switch to theme E",
      fn: () => handleChangeTheme("e"),
    },
    {
      name: "Switch to theme F",
      fn: () => handleChangeTheme("f"),
    },
  ];

  const MODES = ["manual", "auto", "random"];

  const THEMES = ["a", "b", "c", "d", "e", "f"];

  // Filter commands based on search term
  const filteredCommands = COMMANDS.filter((command) =>
    command.name.toLowerCase().includes(searchCommandTerm.toLocaleLowerCase())
  );

  const renderTheme = () => {
    switch (state.currentTheme) {
      case "a":
        return <ThemeA />;
      case "b":
        return <ThemeB />;
      case "c":
        return <ThemeC />;
      case "d":
        return <ThemeD />;
      case "f":
        return <ThemeF />;
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <section
        aria-label="Image carousel"
        className="max-w-[800px] w-11/12 mx-auto my-8"
      >
        {/* Command bar */}
        {state.showCommandBar && (
          <CommandBar
            commands={filteredCommands}
            searchCommandTerm={searchCommandTerm}
            selectedCommandIndex={state.selectedCommandIndex}
            setSearchCommandTerm={setSearchCommandTerm}
            handleSelectCommand={handleSelectCommand}
            handleRunCommand={handleRunCommand}
          />
        )}

        <div className="w-full">
          <div className="flex flex-col justify-between mb-4">
            {/* Buttons */}
            <div className="flex gap-3 items-center">
              {/* Upload a image file */}
              <UploadImgButton />
              {/* Setting button */}
              <SettingButton />
              {/* Full screen button */}
              <FullScreenButton handleFullScreen={handleFullScreen} />
            </div>
          </div>

          {/* Configuration panel */}
          {state.showConfigPanel && (
            <ConfigurationPanel
              modes={MODES}
              handleChangeMode={handleChangeMode}
              themes={THEMES}
              handleChangeTheme={handleChangeTheme}
            />
          )}

          {/* Image carousel */}
          <h1 className="text-5xl text-[#333] font-bold capitalize my-4">
            {state.currentMode} Mode / {state.currentTheme} theme
          </h1>
          <div className="relative max-h-[600px] h-screen">
            {/* drag and drop area */}
            {state.showDropArea ? (
              <DragAndDropImage />
            ) : (
              <>
                {/* Image slider */}
                {renderTheme()}
              </>
            )}

            {/* Previous button */}
            <PrevButton handleSlide={handleSlide} />

            {/* Next button */}
            <NextButton handleSlide={handleSlide} />
          </div>
        </div>
      </section>
    </main>
  );
}
