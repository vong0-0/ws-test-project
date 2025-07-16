export default function AttractionCard({
  isWideScreen,
  lowResImgUrl = "",
  highResImgUrl = "",
  imgDes = "",
  title = "",
  isSelected,
}) {
  return (
    <a
      href="/"
      className={`${isSelected ? "scale-105 shadow-[0_5px_5px_rgba(0,0,0,0.3)]" : ""} group flex items-start flex-col bg-white rounded-lg px-2 py-2 hover:scale-105 hover:shadow-[0_5px_5px_rgba(0,0,0,0.3)] duration-300`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={`./images/${isWideScreen ? highResImgUrl : lowResImgUrl}`}
          alt={imgDes}
        />
        {/* Subtle lighting gradient effect */}
        <div className="subtle-lighting-gradient-effect group-hover:left-[130%] group-hover:translate-x-0 transition-all duration-300"></div>
      </div>
      {/* Title */}
      <p className="text-xl font-bold">{title}</p>
    </a>
  );
}
