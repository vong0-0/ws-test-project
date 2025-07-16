import { useState } from "react";

// Components
import Tab from "../Tab";

const tabContents = [
  {
    title: "Tab 1",
    content: "This is the content for Tab 1",
  },
  {
    title: "Tab 2",
    content: "This is the content for Tab 2",
  },
  {
    title: "Tab 3",
    content: "This is the content for Tab 3",
  },
];

export default function OtherInformation() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  function handleSwitchTab(newIndex) {
    setSelectedTabIndex(newIndex);
  }

  function handleKeyDown(e) {
    e.preventDefault();

    if (e.key === "ArrowRight") {
      setSelectedTabIndex((prevIndex) => {
        return prevIndex === tabContents.length - 1 ? 0 : prevIndex + 1;
      });
    } else if (e.key === "ArrowLeft") {
      setSelectedTabIndex((prevIndex) => {
        return prevIndex === 0 ? tabContents.length - 1 : prevIndex - 1;
      });
    }
  }

  return (
    <section id="other-information-section">
      <div className="cs-container my-8">
        <h2 className="text-5xl font-bold text-center">Other Information</h2>

        <div className="w-full mt-16">
          {/* Tabs */}
          <ul
            className="relative flex items-start"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="tablist"
          >
            {tabContents.map((content, index) => (
              <Tab
                key={content.title}
                isSelected={selectedTabIndex === index}
                tabTitle={content.title}
                handleSwitchTab={() => handleSwitchTab(index)}
              />
            ))}

            {/* Bottom line (for styling) */}
            <div className="absolute w-full h-[2px] bg-slate-300 bottom-0 z-0"></div>
          </ul>

          {/* Tab content */}
          <p className="py-12 px-4 font-medium">
            {tabContents[selectedTabIndex].content}
          </p>
        </div>
      </div>
    </section>
  );
}
