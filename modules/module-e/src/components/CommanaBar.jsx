import { useContext } from "react";
import { AppContext } from "../context/appProvider";

export default function CommandBar({
  commands,
  searchCommandTerm,
  setSearchCommandTerm,
  handleSelectCommand,
  handleRunCommand,
}) {
  const { state } = useContext(AppContext);
  return (
    <div className="flex justify-center items-center fixed w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50">
      <div className="max-w-[700px] w-11/12 mx-auto">
        {/* Input group */}
        <div className="w-full">
          <label htmlFor="search-command" className="sr-only">
            Search command
          </label>
          <input
            type="text"
            className="w-full px-10 py-5 placeholder:font-bold rounded-tl-lg rounded-tr-lg"
            placeholder="Search commands"
            value={searchCommandTerm}
            onChange={(e) => setSearchCommandTerm(e.target.value)}
            autoFocus
          />
        </div>
        <ul className="w-full flex flex-col [&_li:last-child]:border-b-0 rounded-b-lg overflow-hidden">
          <li className="text-lg font-bold text-[#333] px-6 py-3 bg-slate-50 border-b border-solid border-[#333]">
            Commands
          </li>
          {commands.map((command, index) => (
            <li
              key={command.name}
              onMouseEnter={() => handleSelectCommand(index)}
              className="border-b border-solid border-[#333]"
            >
              <button
                className={`${state.selectedCommandIndex === index ? "bg-slate-300" : "bg-slate-50"} text-start w-full px-8 py-4 transition-colors duration-300`}
                onClick={() => handleRunCommand(commands)}
              >
                {command.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
