import { ReadItLoudButton } from "../Buttons";
import LatestEventCard from "../LatestEventCard";

const latestEventData = [
  {
    lowResImgUrl: "worldskills-2024-p-low-res.png",
    highResImgUrl: "worldskills-2024-p.png",
    title: "Lyon accueille la finale mondiale des Worldskills 2024",
  },
  {
    lowResImgUrl: "fda-p-low-res.jpg",
    highResImgUrl: "fda-p.jpg",
    title: "Forum des associations 2024",
  },
  {
    lowResImgUrl: "lyon-kayak-p-0-low-res.jpg",
    highResImgUrl: "lyon-kayak-p-0.jpg",
    title: "Lyon Kayak",
  },
  {
    lowResImgUrl: "worldskills-2024-p-low-res.png",
    highResImgUrl: "worldskills-2024-p.png",
    title: "La semaine bleue 2024",
  },
  {
    lowResImgUrl: "village-des-metiers-p-low-res.jpg",
    highResImgUrl: "village-des-metiers-p.jpg",
    title: "Le Village des Métiers",
  },
  {
    lowResImgUrl: "journees_portes_ouvertes_entreprises_2023_p-low-res.jpg",
    highResImgUrl: "journees_portes_ouvertes_entreprises_2023_p.jpg",
    title: "Les Journées Portes Ouvertes des Entreprises",
  },
];

export default function EssentialInforAndLatestEvents({ isWideScreen }) {
  return (
    <section id="essential-infomation-and-latest-events-section">
      <div className="cs-container flex gap-12 items-start my-16">
        <div className="grow-1 shrink-0 w-1/2 flex flex-col items-start gap-2">
          <h2 className="font-bold text-5xl text-center mb-6">
            Essential Information
          </h2>
          <p className="font-medium">Contact: 04 72 10 30 30</p>
          <p className="font-medium">
            Address: Mairie de Lyon, 69205 Lyon cedex 01
          </p>
          <ReadItLoudButton
            text={
              "Contact: 04 72 10 30 30 Address: Mairie de Lyon, 69205 Lyon cedex 01"
            }
          />
        </div>
        <div className="grow-1 shrink-0 w-1/2 flex flex-col gap-2">
          <h2 className="font-bold text-5xl text-center mb-6">Latest Events</h2>
          <div className="w-full flex overflow-x-scroll min-h-[280px]">
            {latestEventData.map((item, index) => (
              <a
                href="/"
                key={item.title + index}
                className="grow-1 shrink-0 w-1/2"
              >
                <LatestEventCard
                  isWideScreen={isWideScreen}
                  lowResImgUrl={item.lowResImgUrl}
                  highResImgUrl={item.highResImgUrl}
                  title={item.title}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
