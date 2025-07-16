export default function sortCarkparkByMethod(items, sortBy) {
  if (sortBy === "alphabetical") {
    return items.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // Ignore case
      const nameB = b.name.toUpperCase(); // Ignore case

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  } else if (sortBy === "distance") {
    // Sort from least to greatest
    return items.sort((a, b) => a.distance - b.distance);
  }
}
