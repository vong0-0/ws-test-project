import { useEffect, useRef, useState } from "react";

export function CallToActionButton() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [effectPosition, setEffectPosition] = useState({
    x: 0,
    y: 0,
  });

  const buttonRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return;
    const button = buttonRef.current;

    function handleMouseMove(e) {
      const rect = button.getBoundingClientRect();
      setEffectPosition({
        ...effectPosition,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    button.addEventListener("mousemove", handleMouseMove);

    return () => button.removeEventListener("mousemove", handleMouseMove);
  }, []);

  function handleMouseOver() {
    setIsMouseOver(true);
  }

  function handleMouseLeave() {
    setIsMouseOver(false);
  }

  return (
    <button
      ref={buttonRef}
      className="relative bg-translate px-24 py-12 rounded-lg font-bold hover:scale-105 transition-all duration-300 overflow-hidden"
      role="button"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient effect */}
      <div
        style={{
          transform: "translate(-50%, -50%)",
          left: effectPosition.x,
          top: effectPosition.y,
        }}
        className={`${isMouseOver ? "red-yellow-gradient" : "transparent"} absolute left-0 top-0 w-full h-full`}
      ></div>

      {/* Text */}
      <div className="absolute flex justify-center items-center z-40 bg-gray-300 inset-1 rounded-lg overflow-hidden">
        <p className="z-30">Call To Action</p>
        <div
          style={{
            transform: "translate(-50%, -50%)",
            left: effectPosition.x,
            top: effectPosition.y,
          }}
          className="w-[300%] h-[300%] absolute z-20 top-0 left-0 white-gradient"
        ></div>
      </div>
    </button>
  );
}

export function ReadItLoudButton({
  text = "",
  lang = "fr-FR",
  readingSpeed = 1,
  voiceTone = 1,
}) {
  function handleReadOutLoud() {
    const message = new SpeechSynthesisUtterance(text);

    message.lang = lang;

    message.rate = readingSpeed;

    message.pitch = voiceTone;

    window.speechSynthesis.speak(message);
  }
  return (
    <button
      className="px-8 py-4 rounded-lg font-bold text-white bg-sky-700 hover:bg-sky-400 transition-colors duration-300"
      onClick={handleReadOutLoud}
    >
      Read it Loud
    </button>
  );
}
