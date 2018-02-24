import { IAppState } from 'renderer/reducers'
import { PlaybackState, IMediaPlayerState } from 'renderer/lobby/reducers/mediaPlayer'

export const getCurrentMedia = (state: IAppState) => {
  return state.mediaPlayer.current
}

export const getPlaybackState = (state: IAppState) => {
  return state.mediaPlayer.playback
}

const calcTime = (playback: PlaybackState, startTime: number, pauseTime: number, delta: number) => {
  switch (playback) {
    case PlaybackState.Playing:
      const curTime = Date.now() - (startTime! + delta)
      return curTime
    case PlaybackState.Paused:
      return pauseTime
    default:
      return -1
  }
}

export const getPlaybackTime = (state: IAppState) => {
  const playback = getPlaybackState(state)
  const startTime = state.mediaPlayer.startTime
  const dt = state.mediaPlayer.serverTimeDelta
  return calcTime(playback, startTime!, state.mediaPlayer.pauseTime!, dt)
}

/** Derive playback time from mediaPlayer state subset */
export const getPlaybackTime2 = (state: IMediaPlayerState) =>
  calcTime(state.playback, state.startTime!, state.pauseTime!, state.serverTimeDelta)

export const getMediaQueue = (state: IAppState) => {
  return state.mediaPlayer.queue
}
