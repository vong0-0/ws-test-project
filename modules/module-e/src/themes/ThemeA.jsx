import { useContext } from "react";
import formatCaption from "../lib/formatCaption";
import { AppContext } from "../context/appProvider";

export default function ThemeA() {
  const { state, imgSliderRef } = useContext(AppContext);
  return (
    <div ref={imgSliderRef} className="relative h-full mx-auto overflow-hidden">
      <div
        style={{
          width: `${state.images.length * 100}%`,
          transform: `translateX(-${state.currentImageIndex * (100 / state.images.length)}%)`,
        }}
        className="h-full flex items-center justify-center"
      >
        {state.images.map((image, index) => (
          <img
            style={{ width: `${100 / state.images.length}%` }}
            key={image.url + index}
            src={image.url}
            className="object-cover h-full"
          />
        ))}
      </div>

      {/* Caption */}
      <p className="absolute bg-white font-bold text-[#333] px-4 py-2 z-10 bottom-0 left-0 rounded-tl-lg rounded-tr-lg capitalize">
        {formatCaption(state.images[state.currentImageIndex].name)}
      </p>
    </div>
  );
}
