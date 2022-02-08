import { useEffect, useState, VFC } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import Link from "next/link";

import { playingTrackState, playState } from "../../atoms/playerAtom";

type Props = {
  track: any;
  chooseTrack: (arg1: any) => void;
  spotifyApi: any;
  accessToken: any;
};

const Track: VFC<Props> = (props: Props) => {
  const { track, chooseTrack, spotifyApi, accessToken } = props;
  // お気に入り登録
  const [hasLiked, setHasLiked] = useState(false);
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  // const accessToken = session?.accessToken;

  const onClickPlayMusic = () => {
    chooseTrack(track);

    if (track?.uri === playingTrack?.uri) {
      setPlay(!play);
    }
  };

  // アクセストークンを設定
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  /**
   * お気に入りに追加.
   * @param index - 追加したい曲のIndex番号
   * @param title - 追加したい曲のステータスタイトル
   */
  const addPlayFavorite = (index: string, title: any): void => {
    // if (!accessToken) return;
    setHasLiked(true);
    spotifyApi.getAlbumTracks([index]).then((res: any) => {
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
  const removePlayFavorite = (index: string, title: any) => {
    setHasLiked(false);
    spotifyApi.getAlbumTracks([index]).then((res: any) => {
      res.body.items.map((track: any) => {
        if (track.name === title) {
          return spotifyApi.removeFromMySavedTracks([track.id]);
        }
      });
    });
  };

  return (
    <div className=" flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out">
      <div
        className="items-center cursor-pointer w-full"
        onClick={onClickPlayMusic}
      >
        <img
          src={track.albumUrl}
          alt=""
          className="rounded-xl h-12 w-12 object-cover mr-3 float-left"
        />
        <span>
          <h4 className="text-white text-sm font-semibold truncate w-[450px]">
            {track.title}
          </h4>
          <Link
            key={track.artistId}
            href="/artist/[track.artistId]"
            as={`/artist/${track.artistId}`}
            passHref
          >
            <a>
              <p className="hover:underline underline-offset-1 text-white/70 text-[13px] font-semibold group-hover:text-white">
                {track.artist}
              </p>
            </a>
          </Link>
        </span>
      </div>

      <div className="md:ml-auto flex items-center space-x-2.5">
        <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
          <AiFillHeart
            className={`text-xl ml-3 icon ${
              hasLiked ? "text-[#1ed760]" : "text-[#868686]"
            }`}
            onClick={
              hasLiked
                ? () => removePlayFavorite(track.id, track.title) as any
                : () => addPlayFavorite(track.id, track.title) as any
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
        </div>
      </div>
    </div>
  );
};

export default Track;
