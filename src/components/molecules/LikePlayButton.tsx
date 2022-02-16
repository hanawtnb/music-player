import { useEffect, useState, VFC } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import {
  collectionState,
  myCollectionTotalState,
} from "../../atoms/collectionAtom";
import { playingTrackState, playState } from "../../atoms/playerAtom";

type Props = {
  track: any;
  onClickPlayMusic: () => void;
  spotifyApi: any;
  accessToken: any;
};

export const LikePlayButton: VFC<Props> = (props: Props) => {
  const { track, onClickPlayMusic, spotifyApi, accessToken } = props;
  const [hasLiked, setHasLiked] = useState(false);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [play, setPlay] = useRecoilState(playState);
  const [collection, setCollection] = useRecoilState(collectionState);
  const [myCollectionTotal, setMyCollectionTotal] = useRecoilState(
    myCollectionTotalState
  );

  useEffect(() => {
    /**
     * お気に入りを取得.
     */
    spotifyApi
      .getMySavedTracks({
        limit: 50,
      })
      .then((res: any) => {
        setMyCollectionTotal(res.body.total);
        setCollection(
          res.body.items.map((track: any) => {
            return {
              id: track.track.id,
              title: track.track.name,
              artist: track.track.artists.map((artist: any) => {
                return {
                  artistName: artist.name,
                  artistId: artist.id,
                };
              }),
              albumUrl: track.track.album.images[0].url,
              albumId: track.track.album.id,
              uri: track.track.uri,
            };
          })
        );
      });
  }, [accessToken, setCollection, setMyCollectionTotal, spotifyApi]);

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
  }, [accessToken, collection, spotifyApi, track.id]);

  /**
   * お気に入りに追加.
   * @param index - 追加したい曲のIndex番号
   * @param title - 追加したい曲のステータスタイトル
   */
  const addPlayFavorite = (track: any): void => {
    if (!accessToken) return;
    setHasLiked(true);

    track.albumId
      ? spotifyApi.getAlbumTracks([track.albumId]).then((res: any) => {
          res.body.items.map((albumTrack: any) => {
            if (albumTrack.name === track.title) {
              return spotifyApi.addToMySavedTracks([albumTrack.id]);
            }
          });
        })
      : spotifyApi.getAlbumTracks([track.id]).then((res: any) => {
          res.body.items.map((albumTrack: any) => {
            if (albumTrack.name === track.title) {
              return spotifyApi.addToMySavedTracks([albumTrack.id]);
            }
          });
        });
  };

  /**
   * お気に入りから削除.
   * @param index - 削除したい曲のIndex番号
   * @param title - 削除したい曲のタイトル
   */
  const removePlayFavorite = (track: any) => {
    if (!accessToken) return;
    setHasLiked(false);

    track.albumId
      ? spotifyApi.getAlbumTracks([track.albumId]).then((res: any) => {
          res.body.items.map((albumTrack: any) => {
            if (albumTrack.name === track.title) {
              return spotifyApi.removeFromMySavedTracks([albumTrack.id]);
            }
          });
        })
      : spotifyApi.getAlbumTracks([track.id]).then((res: any) => {
          res.body.items.map((albumTrack: any) => {
            if (albumTrack.name === track.title) {
              return spotifyApi.removeFromMySavedTracks([albumTrack.id]);
            }
          });
        });
  };

  return (
    <>
      <AiFillHeart
        className={`text-xl ml-3 icon ${
          hasLiked ? "text-[#1ed760]" : "text-[#868686]"
        }`}
        onClick={
          hasLiked
            ? () => removePlayFavorite(track) as any
            : () => addPlayFavorite(track) as any
        }
      />
      {track.uri === playingTrack?.uri && play ? (
        <div className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#15883e] icon hover:scale-110">
          <BsFillPauseFill className="text-white text-xl" />
        </div>
      ) : (
        <div
          onClick={onClickPlayMusic}
          className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110"
        >
          <BsFillPlayFill className="text-white text-xl ml-[1px]" />
        </div>
      )}
    </>
  );
};
