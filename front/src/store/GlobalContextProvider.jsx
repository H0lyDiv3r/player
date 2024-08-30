import { useReducer } from "react";
import { createContext } from "react";
import path from "path-browserify";
import { api, next, prev, shuffle } from "../utils";
import axios from "axios";
import useRequest from "../hooks/useRequest";
import { useMemo } from "react";

export const GlobalContext = createContext();

const initialState = {
  url: [],
  filePath: "/",
  currentTrack: null,
  indexOfCurrentTrack: 0,
  queue: {
    list: [],
    url: [],
    active: "",
    type: "directory",
  },
  activeDir: null,
  currentTab: "directory",
  activePlaylist: {
    list: [],
    url: [],
    active: "",
    type: "playlist",
  },
  activeList: {
    list: [],
    url: [],
    active: "",
    type: "directory",
  },
  shuffle: false,
  loop: 0,
  //noLoop,loop,loopOne
};

const addPath = "ADD_PATH";
const popPath = "POP_PAtH";
const setCurrentTrack = "SET_CURRENT_TRACK";
const setPath = "SET_PATH";
const setQueue = "SET_QUEUE";
const setActiveList = "SET_ACTIVE_LIST";
const setIndexOfCurrentTrack = "SET_INDEX_OF_CURRENT_TRACK";
const toggleShuffle = "TOGGLE_SHUFFLE";
const toggleLoop = "TOGGLE_LOOP";
const setActiveDir = "SET_ACTIVE_DIR";
const setActivePlaylist = "SET_ACTIVE_PLAYLIST";
const setCurrentTab = "SET_CURRENT_TAB";

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
    case setActiveDir:
      return { ...state, activeDir: action.payload.dir };
    case setIndexOfCurrentTrack:
      return {
        ...state,
        indexOfCurrentTrack: action.payload.index,
      };
    case toggleShuffle:
      return { ...state, shuffle: !state.shuffle };
    case toggleLoop:
      return { ...state, loop: action.payload.loop };
    case setCurrentTab:
      return { ...state, currentTab: action.payload.currentTab };
    case setActivePlaylist:
      return { ...state, activePlaylist: action.payload.activePlaylist };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [playlist] = useRequest();
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
    const active =
      state.currentTab === "directory"
        ? state.activeList
        : state.activePlaylist;
    const track = active.list[index];
    dispatch({
      type: setCurrentTrack,
      payload: {
        currentTrack: track,
      },
    });
    if (state.shuffle) {
      handleSetQueue({
        ...active,
        list: shuffle(active.list, index),
      });
      handleSetIndexOfCurrentTrack(0);
    } else {
      handleSetQueue({
        ...active,
      });
      handleSetIndexOfCurrentTrack(index);
    }
    // console.log("activelist", state.activeList);
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
    dispatch({
      type: setCurrentTab,
      payload: {
        currentTab: "directory",
      },
    });
  };
  const handleSetActivePlaylist = (name) => {
    playlist
      .request("/playlist/getPlaylist", "GET", {
        name: name,
      })
      .then((res) => {
        dispatch({
          type: setActivePlaylist,
          payload: {
            activePlaylist: {
              ...state.activePlaylist,
              list: res.data,
              active: name,
            },
          },
        });
        handleSetCurrentTab("playlist");
      });
  };
  const handleNextPrev = (type) => {
    switch (state.loop) {
      case 0:
        dispatch({
          type: setCurrentTrack,
          payload: {
            currentTrack:
              type === "next"
                ? state.queue.list[state.indexOfCurrentTrack + 1]
                : state.queue.list[state.indexOfCurrentTrack - 1],
          },
        });
        handleSetIndexOfCurrentTrack(
          type === "next"
            ? state.indexOfCurrentTrack + 1
            : state.indexOfCurrentTrack - 1,
        );
        break;
      case 1:
        dispatch({
          type: setCurrentTrack,
          payload: {
            currentTrack:
              type === "next"
                ? state.queue.list[
                    next(state.queue.list.length, state.indexOfCurrentTrack)
                  ]
                : state.queue.list[
                    prev(state.queue.list.length, state.indexOfCurrentTrack)
                  ],
          },
        });
        handleSetIndexOfCurrentTrack(
          type === "next"
            ? next(state.queue.list.length, state.indexOfCurrentTrack)
            : prev(state.queue.list.length, state.indexOfCurrentTrack),
        );
        break;
      case 2:
        dispatch({
          type: setCurrentTrack,
          payload: {
            currentTrack:
              type === "next"
                ? state.queue.list[state.indexOfCurrentTrack]
                : state.queue.list[state.indexOfCurrentTrack],
          },
        });
        handleSetIndexOfCurrentTrack(
          type === "next"
            ? state.indexOfCurrentTrack
            : state.indexOfCurrentTrack,
        );
        break;
      default:
        return;
    }
  };
  const handleSetIndexOfCurrentTrack = (index) => {
    dispatch({
      type: setIndexOfCurrentTrack,
      payload: {
        index,
      },
    });
  };
  const handleShuffle = () => {
    const active =
      state.queue.type === "directory"
        ? state.activeList
        : state.activePlaylist;
    if (state.queue.list.length > 0) {
      if (!state.shuffle) {
        handleSetQueue({
          ...active,
          list: shuffle(
            active.list,
            state.queue.list.findIndex(
              (obj) => obj.name === state.currentTrack.name,
            ),
          ),
        });
        handleSetIndexOfCurrentTrack(0);
        console.log(state.queue.list.indexOf(state.currentTrack), active.list);
      } else {
        if (state.queue.type === "directory") {
          handleShuffleDir();
        } else {
          handleShufflePlaylist();
        }
      }
    }
    dispatch({
      type: toggleShuffle,
    });
  };
  const handleSetActiveDir = (dir = null) => {
    if (state.activeDir) {
      dispatch({
        type: setActiveDir,
        payload: {
          dir: null,
        },
      });
      handleSetActiveList({ ...state.activeList, url: [], active: "" });
    } else {
      dispatch({
        type: setActiveDir,
        payload: {
          dir,
        },
      });
      handleSetActiveList({
        ...state.activeList,
        url:
          state.activeList.url.length < 1
            ? [...state.activeList.url, dir]
            : state.activeList.url,
      });
    }
  };
  const handleShuffleDir = () => {
    let url = "/";
    state.queue.url.map((item) => (url = path.join(url, item)));
    api
      .get("/dir/getFromDir", {
        params: {
          dir: path.join(url, state.queue.active, "/"),
        },
      })
      .then((res) => {
        handleSetQueue({
          ...state.activeList,
          list: res.data,
        });
        handleSetIndexOfCurrentTrack(
          res.data.findIndex((obj) => obj.name === state.currentTrack.name),
        );
        console.log("i am un shuffling man", state.currentTrack);
      });
  };
  const handleShufflePlaylist = () => {
    api
      .get("/playlist/getPlaylist", {
        params: {
          name: state.queue.active,
        },
      })
      .then((res) => {
        handleSetQueue({
          ...state.activePlaylist,
          list: res.data,
        });
        console.log(res.data);
        handleSetIndexOfCurrentTrack(
          res.data.findIndex((obj) => obj.name === state.currentTrack.name),
        );
        console.log("i am un shuffling man", state.currentTrack);
      });
  };
  const handleLoop = () => {
    let val = state.loop;
    val = (val + 1) % 3;
    dispatch({
      type: toggleLoop,
      payload: {
        loop: val,
      },
    });
    console.log(val);
  };
  const handleSetCurrentTab = (currentTab) => {
    dispatch({
      type: setCurrentTab,
      payload: {
        currentTab: currentTab,
      },
    });
  };
  const vals = useMemo(
    () => ({
      ...state,
      handleAddPath,
      handlePopPath,
      handleSetPath,
      handleSetCurrentTrack,
      handleSetQueue,
      handleSetActiveList,
      handleSetActiveDir,
      handleShuffle,
      handleSetActivePlaylist,
      handleLoop,
      handleNextPrev,
      handleSetIndexOfCurrentTrack,
      handleSetCurrentTab,
    }),
    [state],
  );
  return (
    <GlobalContext.Provider value={vals}>{children}</GlobalContext.Provider>
  );
};
