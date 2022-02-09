import { useEffect, useState, VFC } from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";

import { playingTrackState, playState } from "../../atoms/playerAtom";
import { LikePlayButton } from "./LikePlayButton";

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
    <div className="flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out">
      <div
        className="flex items-center cursor-pointer w-full"
        onClick={onClickPlayMusic}
      >
        <img
          src={track.albumUrl}
          alt=""
          className="rounded-xl h-12 w-12 object-cover mr-3 float-left"
        />
        <span>
          <h4 className="text-white text-sm font-semibold truncate">
            {track.title}
          </h4>

          {track.artist.map((artist: any) => (
            <Link
              key={artist.artistId}
              href="/artist/[artist.artistId]"
              as={`/artist/${artist.artistId}`}
              passHref
            >
              <a>
                <span className="hover:underline underline-offset-1 text-white/70 text-[13px] font-semibold group-hover:text-white">
                  {artist.artistName}
                  &nbsp;
                </span>
              </a>
            </Link>
          ))}
        </span>
      </div>

      <div className="md:ml-auto flex items-center space-x-2.5">
        <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
          <LikePlayButton
            track={track}
            onClickPlayMusic={onClickPlayMusic}
            spotifyApi={spotifyApi}
            accessToken={accessToken}
          />
        </div>
      </div>
    </div>
  );
};

export default Track;
