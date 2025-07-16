import React, { useEffect, useState } from "react";
import { getCarpark } from "../services/api";
import sortCarkparkByMethod from "../helpers/sortCarkpark";
import { getCarparkSortingMethod } from "../helpers/carparkSortingMethods";

function Carparks() {
  const [carparks, setCarparks] = useState([]);
  const [focusedCarkparkIndex, setFocusedCarkparkIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper function to sort carparks with pinned items first
  const sortCarparks = (carparksArray) => {
    return carparksArray.sort((a, b) => {
      if (a.isPin && !b.isPin) return -1;
      if (!a.isPin && b.isPin) return 1;
      return 0;
    });
  };

  useEffect(() => {
    setLoading(true);
    async function fetchCarparkData() {
      try {
        const cached = localStorage.getItem("carparks");

        if (cached) {
          const cachedData = JSON.parse(cached);
          // Sort the cached data to ensure pinned items are first
          const sortedData = sortCarparks(cachedData);
          setCarparks(sortedData);
        } else {
          const res = await getCarpark();
          const sortedData = sortCarparks(res);
          setCarparks(sortedData);
          localStorage.setItem("carparks", JSON.stringify(sortedData));
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCarparkData();
  }, []);

  function handleFocusCarpark(index) {
    if (focusedCarkparkIndex === index) {
      setFocusedCarkparkIndex(null);
      return;
    }
    setFocusedCarkparkIndex(index);
  }

  function handlePinCarpark(carparkToPin) {
    const updatedCarparks = carparks.map((carpark) => {
      if (carpark.name === carparkToPin.name) {
        return {
          ...carpark,
          isPin: !carpark.isPin,
        };
      }
      return carpark;
    });

    // Sort the updated carparks to maintain pinned items at the top
    const sortingMethod = getCarparkSortingMethod() || "alphabetical";
    sortCarkparkByMethod(updatedCarparks, sortingMethod);
    const sortedCarparks = sortCarparks(updatedCarparks);
    setCarparks(sortedCarparks);
    localStorage.setItem("carparks", JSON.stringify(sortedCarparks));

    // Reset focused index since the order might have changed
    setFocusedCarkparkIndex(null);
  }

  if (loading) {
    return (
      <p className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 italic font-bold">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 italic font-bold">
        {error}
      </p>
    );
  }

  // No need to sort here anymore since carparks state is already sorted
  return (
    <div className="my-8 max-w-[450px] mx-auto w-11/12">
      <ul className="flex flex-col gap-4">
        {carparks.map((carpark, index) => (
          <li key={carpark.name}>
            <button
              className="w-full bg-black dark:bg-white border-4 border-solid border-transparent hover:border-sky-500 transition-colors duration-300"
              onClick={() => handleFocusCarpark(index)}
            >
              <div className="flex relative">
                <div className="flex-center flex-col px-4 py-2 text-white dark:text-black border-r border-solid border-white dark:border-black">
                  <p className="font-bold">Available space</p>{" "}
                  {/* Fixed typo */}
                  <p className="text-xl">{carpark.availableSpaces}</p>
                </div>
                <p className="text-white dark:text-black flex items-center pl-2 font-bold text-xl">
                  {carpark.name}
                </p>
                {carpark.isPin && (
                  <p className="absolute right-0 top-1/2 -translate-y-1/2 font-bold text-sky-600 pr-2">
                    Pinned
                  </p>
                )}
              </div>
            </button>
            <div
              className={`${focusedCarkparkIndex === index ? "max-h-[1000px] py-2" : "max-h-0"} px-2 flex items-center justify-between w-full bg-slate-400 overflow-hidden transition-all`}
            >
              <div className="flex-col items-start flex max-w-[70%]">
                <p>Location: {carpark.location}</p>
                <p>Distance: {carpark.distance}Km</p>
              </div>
              <button
                className={`px-6 py-3 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-800 transition-all duration-300`}
                onClick={() => handlePinCarpark(carpark)}
              >
                {carpark.isPin ? "Unpin" : "Pin"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Carparks;
