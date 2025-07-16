import { AppContext } from "../context/appProvider";
import { useContext } from "react";

export default function useImageSlider() {
  const { state, dispatch, imgSliderRef, intervalRef } = useContext(AppContext);

  // This function handles the cahnge of mode
  function handleChangeMode(newMode) {
    dispatch({
      type: "CHANGE_MODE",
      newMode: newMode,
    });
  }

  function handleChangeTheme(newTheme) {
    dispatch({
      type: "CHANGE_THEME",
      newTheme: newTheme,
    });
  }

  // This function handles the sliding of images based on the direction
  function handleSlide(dir) {
    dispatch({
      type: "SLIDE_IMAGE",
      direction: dir,
    });
  }

  // This function use to turn Carousel to full screen mode
  function handleFullScreen() {
    if (imgSliderRef.current) {
      imgSliderRef.current.requestFullscreen();
    }
  }

  function handleSetCurrentImgIndex(newIndex) {
    dispatch({
      type: "SET_CURRENT_IMG_INDEX",
      newIndex: newIndex,
    });
  }

  function handleShowCommandBar(isShow) {
    dispatch({
      type: "SHOW_COMMAND_BAR",
      isShow: isShow,
    });
  }

  function handleSelectCommand(commandIndex) {
    dispatch({
      type: "SELECT_COMMAND",
      commandIndex: commandIndex,
    });
  }

  return {
    state,
    dispatch,
    imgSliderRef,
    intervalRef,
    handleChangeMode,
    handleChangeTheme,
    handleSlide,
    handleFullScreen,
    handleSetCurrentImgIndex,
    handleShowCommandBar,
    handleSelectCommand,
  };
}
