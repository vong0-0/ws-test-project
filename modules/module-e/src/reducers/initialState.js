import { simpleImages } from "../constant";

const initialState = {
  showConfigPanel: false,
  showCommandBar: false,
  showDropArea: false,
  images: simpleImages || [],
  currentMode: "manual",
  currentTheme: "a",
  currentImageIndex: 0,
  selectedCommandIndex: -1,
};

export default initialState;
