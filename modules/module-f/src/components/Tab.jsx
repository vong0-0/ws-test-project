export default function Tab({ isSelected, tabTitle, handleSwitchTab }) {
  return (
    <button
      role="tab"
      className={`${isSelected ? "bg-white border-sky-500" : "bg-slate-200 border-slate-300 hover:bg-slate-300"} relative z-10 border-b-2 border-solid px-8 py-4 font-bold transition-colors duration-300`}
      aria-label={`Switch tab to ${tabTitle}`}
      aria-selected={isSelected}
      onClick={handleSwitchTab}
    >
      {tabTitle}
    </button>
  );
}
