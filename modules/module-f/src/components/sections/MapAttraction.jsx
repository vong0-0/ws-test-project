import { useState } from "react";
import AttractionCard from "../AttractionCard";
import Pin from "../Pin";

const attractionCardData = [
  {
    lowResImgUrl: "attraction-a-low-res.jpg",
    highResImgUrl: "attraction-a.jpg",
    imgDes: "parc de la tête d'or",
    title: "parc de la Tete d'Or",
  },
  {
    lowResImgUrl: "attraction-b-low-res.jpg",
    highResImgUrl: "attraction-b.jpg",
    imgDes: "Street in Lyon lined with restaurants and cafes",
    title: "Street",
  },
  {
    lowResImgUrl: "attraction-c-low-res.jpg",
    highResImgUrl: "attraction-c.jpg",
    imgDes: "The river in Lyon",
    title: "River",
  },
  {
    lowResImgUrl: "all-attractions-low-res.jpg",
    highResImgUrl: "all-attractions.jpg",
    imgDes: "In a place in Lyon, there is a statue of an equestrian.",
    title: "All Attractions",
  },
];

export default function MapAttraction({ isWideScreen }) {
  const [selectedAttractionCardIndex, setSelectedAttractionCardIndex] =
    useState(null);

  function handleSelectAttractionCard(newIndex) {
    setSelectedAttractionCardIndex(newIndex);
  }

  function handleMouseLeave() {
    setSelectedAttractionCardIndex(null);
  }

  return (
    <section id="map-attraction" className="py-16">
      <div className="relative cs-container">
        <h2 className="text-5xl text-center font-bold mb-8">Map Attraction</h2>
        {/* Attraction map */}
        <div className="relative w-full h-[550px] overflow-hidden">
          <img
            src={
              isWideScreen
                ? "./images/lyon-map.jpg"
                : "./images/lyon-map-low-res.jpg"
            }
            height={550}
            className="scale-150 translate-x-[25%] translate-y-[5%]"
            alt="A map of Lyon, which has three tourist spots marked with pins."
            loading="lazy"
          />

          {/* Attraction cards */}
          <div className="p-4 absolute top-0 w-1/2 h-full grid grid-cols-2 gap-4 auto-rows-auto">
            {attractionCardData.map((item, index) => (
              <AttractionCard
                key={item.title}
                isWideScreen={isWideScreen}
                lowResImgUrl={item.lowResImgUrl}
                highResImgUrl={item.highResImgUrl}
                imgDes={item.imgDes}
                title={item.title}
                isSelected={selectedAttractionCardIndex === index}
              />
            ))}
          </div>

          {/* Pins (Spots on the map) */}
          <div
            className="absolute top-[3%] right-[5%] cursor-pointer"
            onMouseEnter={() => handleSelectAttractionCard(0)}
            onMouseLeave={handleMouseLeave}
          >
            <Pin>A</Pin>
          </div>
          <div
            className="absolute top-[32%] right-[20%] cursor-pointer"
            onMouseEnter={() => handleSelectAttractionCard(1)}
            onMouseLeave={handleMouseLeave}
          >
            <Pin>B</Pin>
          </div>
          <div
            className="absolute top-[2%] right-[35%] cursor-pointer"
            onMouseEnter={() => handleSelectAttractionCard(2)}
            onMouseLeave={handleMouseLeave}
          >
            <Pin>C</Pin>
          </div>
        </div>
      </div>
    </section>
  );
}
