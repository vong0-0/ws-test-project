import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";

// Sections
import CallToAction from "./components/sections/CallToAction";
import MapAttraction from "./components/sections/MapAttraction";
import VideoPlayback from "./components/sections/Video";
import EssentialInforAndLatestEvents from "./components/sections/EssentialInfoAndLatestEvents";
import OtherInformation from "./components/sections/OtherInfomation";
import ContactUs from "./components/sections/ContactUs";
import Footer from "./components/sections/Footer";

export default function App() {
  const [iswideScreen, setIsWideScreen] = useState(window.innerWidth);

  // useEffect is used here to check the current screen size
  useEffect(() => {
    function handleResize() {
      setIsWideScreen((prev) => window.innerWidth >= 760);
    }

    // Listen window resize event
    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="w-full fixed top-0 left-0 z-50">
        {/* Main navigation bar */}
        <NavigationBar />
      </header>

      {/* Main content */}
      <main id="main-content">
        {/* Call To Action Section */}
        <CallToAction isWideScreen={iswideScreen} />

        {/* Map Attraction Section */}
        <MapAttraction isWideScreen={iswideScreen} />

        {/* Video Playback Section */}
        <VideoPlayback />

        {/* Esstial Information And Latest Events Section */}
        <EssentialInforAndLatestEvents iswideScreen={iswideScreen} />

        {/* Other Information Section */}
        <OtherInformation />

        {/* Conatct Us Section */}
        <ContactUs />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
