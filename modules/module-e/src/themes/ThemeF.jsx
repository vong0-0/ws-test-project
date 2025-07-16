import { useContext } from "react";
import formatCaption from "../lib/formatCaption";
import { AppContext } from "../context/appProvider";

export default function ThemeF() {
  const { state, imgSliderRef } = useContext(AppContext);
  return (
    <div ref={imgSliderRef} className="relative h-full mx-auto overflow-hidden">
      <img
        key={state.images[state.currentImageIndex].url}
        className="w-full h-full scale-up-animation"
        src={state.images[state.currentImageIndex].url}
        alt=""
      />

      {/* Caption */}
      <p
        key={state.images[state.currentImageIndex].name}
        className="absolute bg-white font-bold text-[#333] px-4 py-2 z-10 bottom-0 left-0 rounded-tl-lg rounded-tr-lg capitalize scale-up-animation"
      >
        {formatCaption(state.images[state.currentImageIndex].name)}
      </p>
    </div>
  );
}
