import { Outlet } from "react-router";

import HeaderBar from "./components/HeaderBar";
import NavigationBar from "./components/NavigationBar";
import { useEffect } from "react";
import { getTheme } from "./utilities/theme";

export default function MainLayout() {
  useEffect(() => {
    const theme = getTheme();

    document.documentElement.setAttribute("data-theme", theme);
  }, []);
  return (
    <main
      id="main-content"
      className="flex flex-col h-[100dvh] max-w-[500px] mx-auto border-x"
    >
      <header className="flex grow-0">
        <HeaderBar />
      </header>
      <section className="grow overflow-y-scroll">
        <Outlet />
      </section>
      <footer className="flex grow-0">
        <NavigationBar />
      </footer>
    </main>
  );
}
