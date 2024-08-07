import React, { createContext, useEffect, useReducer, useState } from "react";

export const PlayerContext = createContext();

const playerState = () => {
  return Boolean(
    localStorage.getItem("root") &&
      JSON.parse(localStorage.getItem("root")).playerState,
  );
};

const initialState = {
  paused: true,
  volume: playerState()
    ? JSON.parse(localStorage.getItem("root")).playerState.volume
    : 50,
  position: 0,
  playbackRate: playerState()
    ? JSON.parse(localStorage.getItem("root")).playerState.playbackRate
    : 1,
  muted: playerState()
    ? JSON.parse(localStorage.getItem("root")).playerState.muted
    : false,
  length: 0,
  loaded: false,
};

const togglePause = "TOGGLE_PAUSE";
const togglePlay = "TOGGLE_PLAY";
const setVolume = "SET_VOLUME";
const setPosition = "SET_POSITION";
const setPlaybackRate = "SET_PLAYBACK_RATE";
const setMute = "SET_MUTE";
const toggleMute = "TOGGLE_MUTE";
const setLength = "SET_LENGTH";
const setLoaded = "SET_LOADED";
const setCurrentTrack = "SET_CURRENT_TRACK";
const setAllState = "SET_ALL_STATE";

const reducer = (state, action) => {
  if (action.type === togglePause) return { ...state, paused: true };
  if (action.type === togglePlay) return { ...state, paused: false };
  if (action.type === setVolume)
    return { ...state, volume: action.payload.volume };
  if (action.type === setPosition)
    return { ...state, position: action.payload.position };
  if (action.type === setPlaybackRate)
    return { ...state, playbackRate: action.payload.playbackRate };
  if (action.type === setMute) return { ...state, muted: action.payload.mute };
  if (action.type === toggleMute) return { ...state, muted: !state.muted };
  if (action.type === setLength)
    return { ...state, length: action.payload.len };
  if (action.type === setLoaded)
    return { ...state, loaded: action.payload.loaded };
  if (action.type === setCurrentTrack)
    return { ...state, currentTrack: action.payload.track };
  if (action.type === setAllState) return { ...state, ...action.payload.state };
  return state;
};

const PlayerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePlay = (ref) => {
    if (ref.current.paused) {
      ref.current.play();
      dispatch({ type: togglePlay });
    } else {
      ref.current.pause();
      dispatch({ type: togglePause });
    }
  };
  const handlePause = (ref) => {
    ref.current.pause();
    dispatch({ type: togglePause });
  };
  const handleLoaded = (value) => {
    dispatch({
      type: setLoaded,
      payload: {
        loaded: value,
      },
    });
  };
  const handleMute = (ref) => {
    if (ref.current.muted) {
      ref.current.muted = false;
      dispatch({ type: toggleMute });
    } else {
      ref.current.muted = true;
      dispatch({ type: toggleMute });
    }
  };

  const handleVolume = (e, ref) => {
    ref.current.volume = e.target.value / 100;
    dispatch({
      type: setVolume,
      payload: {
        volume: Number(e.target.value),
      },
    });
    dispatch({
      type: setMute,
      payload: {
        mute: false,
      },
    });
    if (e.target.value / 100 == 0) {
      dispatch({
        type: setMute,
        payload: {
          mute: true,
        },
      });
    }
  };

  const handleTimeline = (ref) => {
    const interval = setInterval(() => {
      if (ref.current.paused) {
        clearInterval(interval);
      } else {
        dispatch({
          type: setPosition,
          payload: {
            position: ref.current.currentTime,
          },
        });
      }
    }, 1000);
  };

  const handlePlaybackRate = (value, ref) => {
    console.log("reffing", ref);
    ref.current.playbackRate = value;
    dispatch({
      type: setPlaybackRate,
      payload: {
        playbackRate: value,
      },
    });
  };

  const handlePosition = (value, ref) => {
    if (ref.current) {
      ref.current.currentTime = value;
      dispatch({
        type: setPosition,
        payload: {
          position: value,
        },
      });
    }
  };

  const handleSetCurrentTrack = (value) => {
    dispatch({
      type: setCurrentTrack,
      payload: {
        track: value,
      },
    });
    dispatch({ type: togglePause });
  };

  const handleSetPlayerValues = (ref) => {
    ref.current.volume = state.volume / 100;
    ref.current.currentTime = state.position;
    ref.current.playbackRate = state.playbackRate;
    ref.current.muted = state.muted;
    ref.current.currentTime = 0;
    if (state.paused) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
    dispatch({
      type: setLength,
      payload: {
        len: ref.current.duration,
      },
    });
    dispatch({
      type: setLoaded,
      payload: {
        loaded: true,
      },
    });
  };

  const handleFastForward = (ref) => {
    ref.current.currentTime += 10;
  };

  const handleFastBackward = (ref) => {
    ref.current.currentTime -= 10;
  };

  const handleOverAllState = (state) => {
    dispatch({
      type: setAllState,
      payload: {
        state: {
          volume: state.volume,
          muted: state.muted,
          playbackRate: state.playbackRate,
        },
      },
    });
  };

  const vals = {
    ...state,
    handleLoaded,
    handlePause,
    handleMute,
    handlePlay,
    handlePlaybackRate,
    handlePosition,
    handleTimeline,
    handleVolume,
    handleSetCurrentTrack,
    handleSetPlayerValues,
    handleFastForward,
    handleFastBackward,
  };

  useEffect(() => {
    localStorage.setItem(
      "root",
      JSON.stringify({
        playerState: {
          volume: state.volume,
          muted: state.muted,
          playbackRate: state.playbackRate,
        },
      }),
    );
  }, [state.volume, state.muted, state.playbackRate]);

  return (
    <PlayerContext.Provider value={vals}>{children}</PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
