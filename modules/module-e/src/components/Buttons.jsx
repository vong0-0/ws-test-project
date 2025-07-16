import { useContext } from "react";
import { AppContext } from "../context/appProvider";

export function UploadImgButton() {
  const { state, dispatch } = useContext(AppContext);

  function handleShowDropArea() {
    dispatch({
      type: "TOGGLE_DROP_AREA",
    });
  }
  return (
    <button
      onClick={handleShowDropArea}
      className="px-4 py-2 bg-yellow-500 border border-solid border-[#333] font-bold hover:bg-transparent duration-300"
    >
      {state.showDropArea ? "Close drop area" : "Upload image"}
    </button>
  );
}

// Use for toggle configuration panel
export function SettingButton() {
  const { state, dispatch } = useContext(AppContext);

  function handleShowConfigPanel() {
    dispatch({
      type: "TOGGLE_CONFIG_PANEL",
    });
  }

  return (
    <button
      className="px-4 py-2 flex items-center gap-2 border border-solid border-[#333] bg-stone-500 text-white font-bold hover:bg-transparent hover:text-[#333] transition-colors duration-300"
      aria-label="Setting button"
      onClick={handleShowConfigPanel}
    >
      <img
        className="w-[15px] h-[15px]"
        src="icons/setting-icon.png"
        alt="Setting icon"
      />
      <p className="font-bold">
        {state.showConfigPanel ? "Close setting" : "Setting"}
      </p>
    </button>
  );
}

export function PrevButton({ handleSlide }) {
  const { state } = useContext(AppContext);
  return (
    <button
      onClick={() => handleSlide(-1)}
      className={`${state.currentMode !== "manual" || state.showDropArea ? "hidden" : ""} ${state.currentTheme === "c" ? "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" : "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"} absolute w-[50px] h-[50px] rounded-full bg-sky-500 text-white font-black border border-solid border-sky-500 transition-all duration-300`}
    >
      {state.currentTheme === "c" ? "^" : "<"}
    </button>
  );
}

export function NextButton({ handleSlide }) {
  const { state } = useContext(AppContext);
  return (
    <button
      onClick={() => handleSlide(1)}
      className={`${state.currentMode !== "manual" || state.showDropArea ? "hidden" : ""} ${state.currentTheme === "c" ? "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 rotate-180" : "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"} absolute w-[50px] h-[50px] rounded-full bg-sky-500 text-white font-black border border-solid border-sky-500 transition-all duration-300`}
    >
      {state.currentTheme === "c" ? "^" : ">"}
    </button>
  );
}

export function FullScreenButton({ handleFullScreen }) {
  return (
    <button
      onClick={handleFullScreen}
      className="my-4 px-4 py-2 bg-[#333] border border-solid border-[#333] text-white font-bold hover:text-[#333] hover:bg-transparent transiton-colors duration-300"
    >
      Full screen
    </button>
  );
}
