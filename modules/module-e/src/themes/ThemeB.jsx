import { useEffect, useState, useContext } from "react";
import formatCaption from "../lib/formatCaption";
import { AppContext } from "../context/appProvider";

export default function ThemeB() {
  const { state, imgSliderRef } = useContext(AppContext);
  const [captionKey, setCaptionKey] = useState(0);

  useEffect(() => {
    // Alternative with key
    setCaptionKey((prev) => prev + 1);
  }, [state.currentImageIndex]);

  return (
    <div ref={imgSliderRef} className="relative h-full mx-auto overflow-hidden">
      <div
        style={{
          width: `${state.images.length * 100}%`,
          transform: `translateX(-${state.currentImageIndex * (100 / state.images.length)}%)`,
          transition: "transform 0.5s ease-in-out",
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
      <p
        key={captionKey} // Alternative retrigger with key
        className="absolute bg-white font-bold text-[#333] px-4 py-2 z-10 bottom-0 left-0 rounded-tl-lg rounded-tr-lg capitalize slide-in-from-left-animation"
      >
        {formatCaption(state.images[state.currentImageIndex].name)}
      </p>
    </div>
  );
}
