import { CallToActionButton } from "../Buttons";

export default function CallToAction({ isWideScreen }) {
  return (
    <section id="call-to-action-section">
      <div className="relative w-full h-screen">
        <img
          src={
            isWideScreen ? "./images/cover.jpg" : "./images/cover-low-res.jpg"
          }
          className="w-full h-full object-cover"
          alt="A street in Lyon, Franch, lined with historic buildings, small store and cafes, and parked green scooter"
        />

        <a
          href="#"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <CallToActionButton />
        </a>
      </div>
    </section>
  );
}
