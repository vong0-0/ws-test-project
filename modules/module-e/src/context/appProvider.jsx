import { createContext, useReducer, useRef } from "react";
import appReducer from "../reducers/appReducer";
import initialState from "../reducers/initialState";

export const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const imgSliderRef = useRef(null);
  const intervalRef = useRef(null);

  return (
    <AppContext.Provider value={{ state, dispatch, imgSliderRef, intervalRef }}>
      {children}
    </AppContext.Provider>
  );
}
