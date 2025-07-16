export default function appReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_CONFIG_PANEL": {
      return { ...state, showConfigPanel: !state.showConfigPanel };
    }
    case "TOGGLE_DROP_AREA": {
      return { ...state, showDropArea: !state.showDropArea };
    }
    case "SHOW_COMMAND_BAR": {
      return {
        ...state,
        showCommandBar: action.isShow,
      };
    }
    case "UPLOAD_IMAGE": {
      return {
        ...state,
        showDropArea: false,
        images: [...state.images, ...action.newImage],
      };
    }
    case "SET_NEW_IMAGES": {
      return {
        ...state,
        images: action.newImages,
      };
    }
    case "SLIDE_IMAGE": {
      const { currentImageIndex, images } = state;
      if (action.direction <= -1) {
        return {
          ...state,
          currentImageIndex:
            (currentImageIndex - 1 + images.length) % images.length,
        };
      } else {
        return {
          ...state,
          currentImageIndex:
            (currentImageIndex + 1 + images.length) % images.length,
        };
      }
    }
    case "CHANGE_MODE": {
      return {
        ...state,
        currentMode: action.newMode,
      };
    }
    case "CHANGE_THEME": {
      return {
        ...state,
        currentImageIndex: 0,
        currentTheme: action.newTheme,
      };
    }
    case "SET_CURRENT_IMG_INDEX": {
      return {
        ...state,
        currentImageIndex: action.newIndex,
      };
    }
    case "SELECT_COMMAND": {
      return {
        ...state,
        selectedCommandIndex: action.commandIndex,
      };
    }
    default:
      return state;
  }
}
