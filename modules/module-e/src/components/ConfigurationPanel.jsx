import { useContext, useState } from "react";
import { AppContext } from "../context/appProvider";

export default function ConfigurationPanel({
  modes,
  handleChangeMode,
  themes,
  handleChangeTheme,
}) {
  const { state, dispatch } = useContext(AppContext);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  function handleDragStart(e, item, index) {
    setDraggedItem({ item, index });
    e.dataTransfer.effectAllow = "move";
  }

  function handleDragOver(e, index) {
    e.preventDefault();
    e.dataTransfer.effectAllow = "move";
    setDragOverIndex(index);
  }

  function handleDragLeave() {
    setDragOverIndex(null);
  }

  function handleDrop(e, dropIndex) {
    e.preventDefault();
    if (draggedItem && draggedItem.index !== dropIndex) {
      const newItems = [...state.images];
      const [movedItem] = newItems.splice(draggedItem.index, 1);
      newItems.splice(dropIndex, 0, movedItem);
      dispatch({
        type: "SET_NEW_IMAGES",
        newImages: newItems,
      });
    }

    setDraggedItem(null);
    setDragOverIndex(null);
  }

  return (
    <div className="my-8 flex flex-col gap-8 px-2 py-2 rounded-lg shadow-xl border border-solid border-[#333]">
      {/* Modes */}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-xl">Mode</h3>
        <div className="flex gap-4">
          {modes.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => handleChangeMode(mode)}
              className={`${
                mode.toLowerCase() === state.currentMode
                  ? "bg-amber-300"
                  : "bg-transparent hover:bg-amber-200 transition-colors duration-300"
              }  rounded-lg border-2 border-solid border-amber-300 text-[#333] font-bold shadow-lg px-4 py-2 capitalize`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Themes */}
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-xl">Theme</h3>
        <div className="flex gap-4">
          {themes.map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => handleChangeTheme(theme)}
              disabled={theme === "e"}
              accept="image/png, image/jpeg"
              className={`${
                theme === state.currentTheme
                  ? "bg-sky-400 text-white"
                  : "hover:bg-sky-200 transition-colors duration-300"
              }  rounded-lg border-2 border-solid border-sky-400 text-[#333] font-bold shadow-lg px-4 py-2 capitalize button-active`}
            >
              {`Theme ${theme}`}
            </button>
          ))}
        </div>
      </div>

      {/* Ordering slide */}
      <div className="bg-black/50 w-full overflow-x-scroll">
        {state.images.length > 0 && (
          <ul className="w-full flex gap-2 items-center rounded-lg px-2 py-2">
            {state.images.map((image, index) => (
              <li
                key={index}
                className={`${draggedItem?.index === index ? "scale-90 opacity-50" : "scale-100 opacity-100"} ${dragOverIndex === index ? "border-sky-500" : "border-black "} w-[250px] h-[150px] grow-1 shrink-0 border-2 border-solidrounded-lg overflow-hidden`}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, image, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
              >
                <img
                  className="w-full h-full object-cover"
                  src={`${image.url}`}
                  alt=""
                  draggable="false"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
