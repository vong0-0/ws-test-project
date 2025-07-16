import axios from "axios";
import getDistanceFromLatLonInKm from "../utilities/geolocation_distance";
import sortCarkparkByMethod from "../helpers/sortCarkpark";
import { getCarparkSortingMethod } from "../helpers/carparkSortingMethods";
import getCurrentLocation from "../utilities/getCurrentLocation";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getEvents(page = 1, date) {
  try {
    await sleep(1000);

    let API_URL = `http://ws01.worldskills.org/module_d_api.php/events.json`;
    const events = await axios.get(API_URL, {
      params: {
        page,
        beginning_date: date?.beginingDate || undefined,
        ending_date: date?.endingDate || undefined,
      },
    });
    return events.data.events;
  } catch (error) {
    throw new Error(`Failed to fetch events data: ${error}`);
  }
}

export async function getWeather() {
  try {
    await sleep(1000);
    let API_URL = `http://ws01.worldskills.org/module_d_api.php/weather.json`;
    const weather = await axios.get(API_URL);
    return weather.data;
  } catch (error) {
    throw new Error(`Failed to fetch weahter data: ${error}`);
  }
}

export async function getCarpark() {
  try {
    // await sleep(1000);
    let API_URL = `http://ws01.worldskills.org/module_d_api.php/carparks.json`;

    // User geolocation
    // const currentLocation = await getCurrentLocation();
    const userLatitude = 45.75; // <=== you can manully set
    const userLongitude = 4.84; // <=== you can manully set

    // Fetch all carpark data from api
    const carpark = await axios.get(API_URL);

    // Convert carpark object. Add name and distance in to each carpark object
    const carparkArray = Object.entries(carpark.data).map(([key, value]) => ({
      name: key,
      distance: getDistanceFromLatLonInKm(
        userLatitude,
        userLongitude,
        value.latitude,
        value.longitude
      ).toFixed(2),
      isPin: false,
      ...value,
    }));

    const sortingMethod = getCarparkSortingMethod() || "alphabetical";
    // Sort carpark base on sorting methodes
    sortCarkparkByMethod(carparkArray, sortingMethod);

    // Return sorted carpark data
    return carparkArray;
  } catch (error) {
    throw new Error(`Failed to fetch carpark data: ${error}`);
  }
}
