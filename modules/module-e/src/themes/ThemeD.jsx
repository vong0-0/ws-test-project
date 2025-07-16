import { useContext, useRef } from "react";
import { AppContext } from "../context/appProvider";
import formatCaption from "../lib/formatCaption";
export default function ThemeD() {
  const { state, imgSliderRef } = useContext(AppContext);

  const rotationMapRef = useRef([]);

  function getRandomRotation() {
    return Math.random() * 10 - 5;
  }

  const stack = Array.from(
    { length: state.currentImageIndex + 1 },
    (_, index) => state.images[index]
  );
  return (
    <div
      ref={imgSliderRef}
      className="relative h-full mx-auto overflow-hidden bg-black"
    >
      {stack.map((img) => {
        if (!rotationMapRef.current[img.url]) {
          rotationMapRef.current[img.url] = getRandomRotation();
        }

        return (
          <div
            key={img.url}
            style={{ rotate: `${rotationMapRef.current[img.url]}deg` }}
            className="flex bg-white slide-from-left-animation px-4 py-4 rounded-lg absolute w-[80%] h-[80%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl"
          >
            <img className="w-full h-full" src={img.url} alt="" />
            <p className="absolute bg-white font-bold text-[#333] px-4 py-2 z-10 bottom-0 left-0 rounded-tl-lg rounded-tr-lg capitalize slide-from-left-animation">
              {formatCaption(img.name)}
            </p>
          </div>
        );
      })}

      {/* Caption */}
    </div>
  );
}
