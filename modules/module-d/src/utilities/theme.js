export function setTheme(newTheme) {
  try {
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    console.log("Set new theme to localStorage successfully");
  } catch (error) {
    console.error("Failed to set new theme to localStorage", error);
  }
}

export function getTheme() {
  try {
    const theme = localStorage.getItem("theme");
    console.log("Get the theme from localStorage successfully");
    return theme;
  } catch (error) {
    console.error("Failed to get the theme from localStorage", error);
  }
}
