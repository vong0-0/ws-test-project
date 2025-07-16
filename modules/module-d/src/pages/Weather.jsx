import React, { useEffect, useState } from "react";
import { getWeather } from "../services/api";

function Weather() {
  const [weathers, setWeathers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    async function fetchWeatherData() {
      try {
        const res = await getWeather();
        setWeathers(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? weathers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === weathers.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <p className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 italic font-bold">
        Loading...
      </p>
    );
  }

  return (
    <div className="my-8 max-w-[450px] mx-auto w-11/12">
      <div className="relative w-full border border-solid border-black px-4 py-4">
        <div className="overflow-hidden">
          <div
            style={{
              width: `${weathers.length * 100}%`,
              transform: `translateX(-${(100 / weathers.length) * currentIndex}%)`,
              transition: "0.3s",
            }}
            className="flex"
          >
            {weathers.map((weather) => (
              <WeatherCard key={weather.date} weather={weather} />
            ))}
          </div>
        </div>

        <button
          className={`${currentIndex <= 0 && "hidden"} absolute left-0 top-1/2 -translate-y-1/2 w-[60px] h-[60px] font-bold rounded-full border border-solid border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-transparent hover:text-black dark:hover:text-white transition-colors duration-300`}
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className={`${currentIndex === weathers.length - 1 && "hidden"} absolute right-0 top-1/2 -translate-y-1/2 w-[60px] h-[60px] font-bold rounded-full border border-solid border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:bg-transparent hover:text-black dark:hover:text-white transition-colors duration-300`}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function WeatherCard({ weather }) {
  const renderIcon = () => {
    switch (weather.status) {
      case "Cloudy": {
        return "cloudy.svg";
      }
      case "Rainy": {
        return "rainy.svg";
      }
      case "Sunny": {
        return "sunny.svg";
      }
      default: {
        return "";
      }
    }
  };
  return (
    <div className="flex flex-col items-center grow shrink-0  border border-solid border-black dark:border-white py-8">
      <p className="font-bold text-xl">{weather.date}</p>
      <div className="w-[300px] h-auto">
        <img className="w-full h-full" src={`./icons/${renderIcon()}`} alt="" />
      </div>
      <p className="font-bold text-2xl">
        {weather.lower_temperature}-{weather.upper_temperature}&deg;C
      </p>
      <p className="text-2xl">{weather.location}</p>
    </div>
  );
}

export default Weather;
