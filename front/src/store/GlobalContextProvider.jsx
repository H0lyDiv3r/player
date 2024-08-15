import { useReducer } from "react";
import { createContext } from "react";
import path from "path-browserify";

export const GlobalContext = createContext();

const initialState = {
  url: [],
  filePath: "/",
  currentTrack: "",
  queue: [],
};

const addPath = "ADD_PATH";
const popPath = "POP_PAtH";
const setCurrentTrack = "SET_CURRENT_TRACK";
const setPath = "SET_PATH";
const setQueue = "SET_QUEUE";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case addPath:
      return {
        ...state,
        url: [...state.url, action.payload.dir],
        filePath: path.join("/", action.payload.newPath, "/"),
      };
    case popPath:
      return {
        ...state,
        filePath: path.join(action.payload.newPath, "/"),
      };
    case setCurrentTrack:
      console.log("setting");
      return { ...state, currentTrack: action.payload.currentTrack };
    case setPath:
      return {
        ...state,
        url: action.payload.dir,
        filePath: path.join("/", action.payload.newPath, "/"),
      };
    case setQueue:
      return {
        ...state,
        queue: action.payload.queue,
      };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleAddPath = (dir) => {
    const newUrl = [...state.url, dir];
    let newPath = "";
    newUrl.map((item) => {
      newPath = path.join(newPath, item);
    });
    dispatch({
      type: addPath,
      payload: {
        dir,
        newPath,
      },
    });
  };
  const handlePopPath = () => {
    state.url.pop();
    dispatch({
      type: popPath,
      payload: {
        newPath: path.dirname(state.filePath),
      },
    });
  };
  const handleSetCurrentTrack = (track) => {
    dispatch({
      type: setCurrentTrack,
      payload: {
        currentTrack: path.join(state.filePath, track),
      },
    });
  };
  const handleSetPath = (dir) => {
    const newUrl = dir;
    let newPath = "";
    newUrl.map((item) => {
      newPath = path.join(newPath, item);
    });
    dispatch({
      type: setPath,
      payload: {
        dir,
        newPath,
      },
    });
  };
  const handleSetQueue = (queue) => {
    dispatch({
      type: setQueue,
      payload: {
        queue,
      },
    });
  };

  const vals = {
    ...state,
    handleAddPath,
    handlePopPath,
    handleSetCurrentTrack,
    handleSetPath,
    handleSetQueue,
  };
  return (
    <GlobalContext.Provider value={vals}>{children}</GlobalContext.Provider>
  );
};
