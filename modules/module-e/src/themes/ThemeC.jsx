import { useContext, useEffect, useState } from "react";
import formatCaption from "../lib/formatCaption";
import { AppContext } from "../context/appProvider";

export default function ThemeC() {
  const { state, imgSliderRef } = useContext(AppContext);
  const [captionKey, setCaptionKey] = useState(0);

  useEffect(() => {
    // Alternative with key
    setCaptionKey((prev) => prev + 1);
  }, [state.currentImageIndex]);

  const caption = formatCaption(state.images[state.currentImageIndex].name);
  const splitCaption = caption.split(" ");
  return (
    <div ref={imgSliderRef} className="relative h-full mx-auto overflow-hidden">
      <div
        style={{
          width: "100%",
          height: `${state.images.length * 100}%`,
          transform: `translateY(-${state.currentImageIndex * (100 / state.images.length)}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
        className="flex flex-col h-full items-center justify-center"
      >
        {state.images.map((image, index) => (
          <img
            key={image.url + index}
            style={{ height: `${100 / state.images.length}%` }}
            src={image.url}
            className="object-cover w-screen h-screen"
          />
        ))}
      </div>

      {/* Caption */}
      <p
        key={captionKey}
        className="flex gap-1 absolute bg-white font-bold text-[#333] px-4 py-2 z-10 bottom-0 left-0 rounded-tl-lg rounded-tr-lg capitalize slide-in-from-bottom"
      >
        {splitCaption.map((word, index) => (
          <span
            key={word + index}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
            className={`translate-y-[200%] slide-in-from-bottom-animation`}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
