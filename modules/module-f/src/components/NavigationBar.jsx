export default function NavigationBar() {
  return (
    <nav className="py-4 backdrop-blur-xl">
      <div className="cs-container flex items-center justify-between">
        <a href="/" className="font-black text-2xl uppercase text-slate-400">
          welcome lyon
        </a>
        <ul className="flex items-center gap-8">
          <li>
            <a
              href="#"
              className="font-bold text-slate-800 hover:text-blue-500 transition-colors duration-300"
            >
              Link
            </a>
          </li>
          <li>
            <a
              href="#"
              className="font-bold text-slate-800 hover:text-blue-500 transition-colors duration-300"
            >
              Link
            </a>
          </li>
          <li>
            <a
              href="#"
              className="font-bold text-slate-800 hover:text-blue-500 transition-colors duration-300"
            >
              Link
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
