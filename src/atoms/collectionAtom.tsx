import { atom } from "recoil";

// お気に入りの曲
export const collectionState = atom({
  key: "collectionState",
  default: [] as any,
});

export const myCollectionTotalState = atom({
  key: "myCollectionTotalState",
  default: 0,
});
