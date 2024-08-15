import { useReducer } from "react";
import { createContext } from "react";
import path from "path-browserify";

export const GlobalContext = createContext();

const initialState = {
  url: [],
  filePath: "/",
  currentTrack: null,
  indexOfCurrentTrack: 0,
  queue: [],
  activeList: [],
};

const addPath = "ADD_PATH";
const popPath = "POP_PAtH";
const setCurrentTrack = "SET_CURRENT_TRACK";
const setPath = "SET_PATH";
const setQueue = "SET_QUEUE";
const setActiveList = "SET_ACTIVE_LIST";
const setIndexOfCurrentTrack = "SET_INDEX_OF_CURRENT_TRACK";

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
    case setActiveList:
      return {
        ...state,
        activeList: action.payload.activeList,
      };
    case setIndexOfCurrentTrack:
      return {
        ...state,
        indexOfCurrentTrack: action.payload.index,
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
  const handleSetCurrentTrack = (index) => {
    const track = state.activeList[index];
    dispatch({
      type: setCurrentTrack,
      payload: {
        currentTrack: track,
      },
    });
    handleSetQueue(state.activeList);
    handleSetIndexOfCurrentTrack(index);
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
        queue: queue && queue,
      },
    });
  };
  const handleSetActiveList = (list) => {
    dispatch({
      type: setActiveList,
      payload: {
        activeList: list,
      },
    });
  };
  const handleNext = () => {
    dispatch({
      type: setCurrentTrack,
      payload: {
        currentTrack: state.queue[state.indexOfCurrentTrack + 1],
      },
    });
    handleSetIndexOfCurrentTrack(state.indexOfCurrentTrack + 1);
  };
  const handleSetIndexOfCurrentTrack = (index) => {
    dispatch({
      type: setIndexOfCurrentTrack,
      payload: {
        index,
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
    handleNext,
    handleSetActiveList,
    handleSetIndexOfCurrentTrack,
  };
  return (
    <GlobalContext.Provider value={vals}>{children}</GlobalContext.Provider>
  );
};
