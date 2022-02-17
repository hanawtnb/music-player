import { memo, ReactNode, useEffect, useState, VFC } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { collectionState } from "../../../atoms/collectionAtom";

type Props = {
  track: any;
  spotifyApi: any;
  accessToken: any;
};

const HeartButton: VFC<Props> = (props: Props) => {
  const [hasLiked, setHasLiked] = useState(false);
  const { track, spotifyApi, accessToken } = props;

  const [collection, setCollection] = useRecoilState(collectionState);

  /**
   * 登録済みのお気に入りを表示.
   * @remarks - RecoilのCollectionからお気に入り登録済みのトラックを取得して表示
   */
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    collection.find((collectionTrack: any) => collectionTrack.id === track.id)
      ? setHasLiked(true)
      : setHasLiked(false);
  }, [accessToken, collection, spotifyApi, track]);

  /**
   * お気に入りに追加.
   * @param index - 追加したい曲のIndex番号
   * @param title - 追加したい曲のステータスタイトル
   */
  const addPlayFavorite = (id: string, title: any): void => {
    if (!accessToken) return;
    setHasLiked(true);

    spotifyApi.getAlbumTracks([id]).then((res: any) => {
      res.body.items.map((track: any) => {
        if (track.name === title) {
          return spotifyApi.addToMySavedTracks([track.id]);
        }
      });
    });
  };

  /**
   * お気に入りから削除.
   * @param index - 削除したい曲のIndex番号
   * @param title - 削除したい曲のタイトル
   */
  const removePlayFavorite = (id: string, title: any) => {
    setHasLiked(false);
    spotifyApi.getAlbumTracks([id]).then((res: any) => {
      res.body.items.map((track: any) => {
        if (track.name === title) {
          return spotifyApi.removeFromMySavedTracks([track.id]);
        }
      });
    });
  };
  return (
    <AiFillHeart
      className={`text-3xl ml-3 icon ${
        hasLiked ? "text-[#1ed760]" : "text-[#868686]"
      }`}
      onClick={
        hasLiked
          ? () => removePlayFavorite(track.id, track.title) as any
          : () => addPlayFavorite(track.id, track.title) as any
      }
    />
  );
};

export default memo(HeartButton);
