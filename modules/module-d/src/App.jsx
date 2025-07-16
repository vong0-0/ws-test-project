import { useEffect, useState } from "react";
import { getTheme } from "./utilities/theme";

// Pages
import Carparks from "./pages/Carparks";
import Events from "./pages/Events";
import Weather from "./pages/Weather";
import Setting from "./pages/Setting";

// Components
import HeaderBar from "./components/HeaderBar";
import NavigationBar from "./components/NavigationBar";

export default function App() {
  const [currentPage, setCurrentPage] = useState("carparks");

  useEffect(() => {
    const theme = getTheme();
    document.documentElement.setAttribute("data-theme", theme);
  });

  function handleSetCurrentPage(newPage) {
    setCurrentPage(newPage);
  }

  const renderPage = () => {
    switch (currentPage) {
      case "carparks": {
        return <Carparks />;
      }
      case "events": {
        return <Events />;
      }
      case "weather": {
        return <Weather />;
      }
      case "setting": {
        return <Setting />;
      }
    }
  };

  return (
    <main
      id="main-content"
      className="flex flex-col h-[100dvh] max-w-[500px] mx-auto border-x"
    >
      <header className="flex grow-0">
        <HeaderBar currentPage={currentPage} />
      </header>
      <section className="grow overflow-y-scroll">{renderPage()}</section>
      <footer className="flex grow-0">
        <NavigationBar
          currentPage={currentPage}
          handleSetCurrentPage={handleSetCurrentPage}
        />
      </footer>
    </main>
  );
}
