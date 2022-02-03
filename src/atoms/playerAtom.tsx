import { atom } from "recoil";

// 再生のステータス
// const [play,setPlay] =useState(false)と同じこと
export const playState = atom({
  key: "playState",
  default: false,
});

// 再生中の曲
export const playingTrackState = atom({
  key: "playingTrackState",
  default: null as any,
});
