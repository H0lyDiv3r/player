import { useReducer } from "react";
import { createContext } from "react";
import path from "path-browserify";
import { api, next, prev, shuffle } from "../utils";
import useRequest from "../hooks/useRequest";
import { useMemo } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

export const GlobalContext = createContext();

const global = localStorage.getItem("global")
  ? JSON.parse(localStorage.getItem("global"))
  : null;
const initialState = {
  url: [],
  filePath: "/",
  currentTrack: global
    ? global.currentTrack
    : {
        name: "",
        path: "",
        title: "",
        album: "",
        artist: "",
        genre: "",
        year: "",
      },
  currentTrackImage: global ? global.currentTrackImage : null,
  indexOfCurrentTrack: Math.abs(global ? global.indexOfCurrentTrack : null),
  queue: global
    ? global.queue
    : {
        list: [],
        url: [],
        active: "",
        type: "directory",
      },
  activeDir: global ? global.activeDir : null,
  currentTab: "directory",
  activePlaylist: global
    ? global.activePlaylist
    : {
        list: [],
        url: [],
        active: "",
        type: "playlist",
      },
  activeList: global
    ? global.activeList
    : {
        list: [],
        url: [],
        active: "",
        type: "directory",
      },
  shuffle: global ? global.shuffle : false,
  loop: global ? global.loop : 0,
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
const setCurrentTrackImage = "SET_CURRENT_TRACK_IMAGE";

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
        indexOfCurrentTrack: Math.abs(action.payload.index),
      };
    case toggleShuffle:
      return { ...state, shuffle: !state.shuffle };
    case toggleLoop:
      return { ...state, loop: action.payload.loop };
    case setCurrentTab:
      return { ...state, currentTab: action.payload.currentTab };
    case setActivePlaylist:
      return { ...state, activePlaylist: action.payload.activePlaylist };
    case setCurrentTrackImage:
      return { ...state, currentTrackImage: action.payload.currentTrackImage };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [playlist] = useRequest();
  const handleAddPath = useCallback(
    (dir) => {
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
    },
    [state.url],
  );
  const handlePopPath = useCallback(() => {
    state.url.pop();
    dispatch({
      type: popPath,
      payload: {
        newPath: path.dirname(state.filePath),
      },
    });
  }, [state.url, state.filePath]);
  const handleSetTrack = useCallback((track) => {
    dispatch({
      type: setCurrentTrack,
      payload: {
        currentTrack: track,
      },
    });
  }, []);
  const handleSetCurrentTrack = useCallback(
    async (index) => {
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
          list: await shuffle(active.list, index),
        });
        handleSetIndexOfCurrentTrack(0);
      } else {
        handleSetQueue({
          ...active,
        });
        handleSetIndexOfCurrentTrack(index);
      }
      // console.log("activelist", state.activeList);
    },
    [state.currentTab, state.activeList, state.shuffle, state.activePlaylist],
  );
  const handleSetPath = useCallback((dir) => {
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
  }, []);
  const handleSetQueue = useCallback((queue) => {
    dispatch({
      type: setQueue,
      payload: {
        queue: queue && queue,
      },
    });
  }, []);
  const handleSetActiveList = useCallback((list) => {
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
  }, []);
  const handleSetActivePlaylist = useCallback(
    (name) => {
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
    },
    [state.activePlaylist, playlist],
  );
  const handleNextPrev = useCallback(
    (type) => {
      console.log(state.loop);
      switch (state.loop) {
        case 0:
          dispatch({
            type: setCurrentTrack,
            payload: {
              currentTrack:
                type === "next"
                  ? state.queue.list[
                      Math.min(
                        state.queue.list.length - 1,
                        state.indexOfCurrentTrack + 1,
                      )
                    ]
                  : state.queue.list[
                      Math.max(state.indexOfCurrentTrack - 1, 0)
                    ],
            },
          });
          handleSetIndexOfCurrentTrack(
            type === "next"
              ? Math.min(
                  state.queue.list.length - 1,
                  state.indexOfCurrentTrack + 1,
                )
              : Math.max(state.indexOfCurrentTrack - 1, 0),
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
    },
    [state.loop, state.queue.list, state.indexOfCurrentTrack],
  );
  const handleSetIndexOfCurrentTrack = useCallback((index) => {
    dispatch({
      type: setIndexOfCurrentTrack,
      payload: {
        index,
      },
    });
  }, []);
  const handleShuffleDir = useCallback(() => {
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
          res.data.findIndex((obj) => obj.name === state.currentTrack.name) < 0
            ? res.data.findIndex((obj) => obj.name === state.currentTrack.name)
            : state.indexOfCurrentTrack,
        );
      });
  }, [
    state.queue.url,
    handleSetIndexOfCurrentTrack,
    state.indexOfCurrentTrack,
    state.currentTrack,
    state.queue.active,
    handleSetQueue,
    state.activeList,
  ]);
  const handleShufflePlaylist = useCallback(() => {
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
        handleSetIndexOfCurrentTrack(
          res.data.findIndex((obj) => obj.name === state.currentTrack.name) < 0
            ? res.data.findIndex((obj) => obj.name === state.currentTrack.name)
            : state.indexOfCurrentTrack,
        );
      });
  }, [
    state.activePlaylist,
    state.indexOfCurrentTrack,
    state.queue.active,
    state.currentTrack,
    handleSetIndexOfCurrentTrack,
    handleSetQueue,
  ]);
  const handleShuffle = useCallback(async () => {
    dispatch({
      type: toggleShuffle,
    });
    const active =
      state.queue.type === "directory"
        ? state.activeList
        : state.activePlaylist;
    if (state.queue.list.length > 0) {
      if (!state.shuffle) {
        handleSetQueue({
          ...active,
          list: await shuffle(active.list, state.indexOfCurrentTrack),
        });
        handleSetIndexOfCurrentTrack(0);
      } else {
        if (state.queue.type === "directory") {
          handleShuffleDir();
        } else {
          handleShufflePlaylist();
        }
      }
    }
  }, [
    state.queue.list,
    state.shuffle,
    state.queue.type,
    state.activeList,
    state.activePlaylist,
    state.indexOfCurrentTrack,
    handleShuffleDir,
    handleShufflePlaylist,
    handleSetQueue,
    handleSetIndexOfCurrentTrack,
  ]);
  const handleSetActiveDir = useCallback(
    (dir = null) => {
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
    },
    [state.activeList, state.activeDir, handleSetActiveList],
  );
  const handleLoop = useCallback(() => {
    let val = state.loop;
    val = (val + 1) % 3;
    dispatch({
      type: toggleLoop,
      payload: {
        loop: val,
      },
    });
  }, [state.loop]);
  const handleSetCurrentTab = useCallback((currentTab) => {
    dispatch({
      type: setCurrentTab,
      payload: {
        currentTab: currentTab,
      },
    });
  }, []);
  const handleSetCurrentTrackImage = useCallback((currentTrackImage) => {
    dispatch({
      type: setCurrentTrackImage,
      payload: {
        currentTrackImage: currentTrackImage,
      },
    });
  }, []);
  const vals = useMemo(
    () => ({
      ...state,
      handleAddPath,
      handlePopPath,
      handleSetPath,
      handleSetCurrentTrack,
      handleSetCurrentTrackImage,
      handleSetQueue,
      handleSetActiveList,
      handleSetActiveDir,
      handleShuffle,
      handleSetActivePlaylist,
      handleLoop,
      handleNextPrev,
      handleSetIndexOfCurrentTrack,
      handleSetCurrentTab,
      handleSetTrack,
    }),
    [state],
  );
  useEffect(() => {
    localStorage.setItem(
      "global",
      JSON.stringify({
        shuffle: state.shuffle,
        loop: state.loop,
        url: state.url,
        currentTrack: state.currentTrack,
        currentTrackImage: state.currentTrackImage,
        indexOfCurrentTrack: state.indexOfCurrentTrack,
        queue: state.queue,
        activeList: state.activeList,
        activeDir: state.activeDir,
        activePlaylist: state.activePlaylist,
      }),
    );
  }, [
    state.shuffle,
    state.loop,
    state.url,
    state.currentTrack,
    state.currentTrackImage,
    state.indexOfCurrentTrack,
    state.queue,
    state.activeList,
    state.activePlaylist,
    state.activeDir,
  ]);
  return (
    <GlobalContext.Provider value={vals}>{children}</GlobalContext.Provider>
  );
};
