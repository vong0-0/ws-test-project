export function setCarparkSortingMethods(newSortingMethod) {
  try {
    localStorage.setItem("carparkSortingMethod", newSortingMethod);
    console.log("Set new carpark sorting method to localStorage successfully");
  } catch (error) {
    console.error("Failed to set new theme to localStorage", error);
  }
}

export function getCarparkSortingMethod() {
  try {
    const sortingMethod = localStorage.getItem("carparkSortingMethod");
    console.log("Get the carpark sorting method successfully");
    return sortingMethod;
  } catch (error) {
    console.error(
      "Failed to get the carpark sorting method from localStorage",
      error
    );
  }
}
