/* eslint-disable react/display-name */
import { memo, useCallback, useEffect, VFC } from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";

import { playingTrackState, playState } from "../../../atoms/playerAtom";
import { LikePlayButton } from "../LikePlayButton";

type Props = {
  track: any;
  chooseTrack: (arg1: any) => void;
  spotifyApi: any;
  accessToken: any;
};

export const Track: VFC<Props> = memo((props: Props) => {
  const { track, chooseTrack, spotifyApi, accessToken } = props;
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const onClickPlayMusic = useCallback(() => {
    chooseTrack(track);
    if (track?.uri === playingTrack?.uri) {
      setPlay(!play);
    }
  }, [setPlay]);

  // アクセストークンを設定
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  return (
    <div className="flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-1 px-4 rounded-lg group transition ease-out">
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
          {track.albumType == "album" ? (
            <Link
              key={track.id}
              href="/album/[track.id]"
              as={`/album/${track.id}`}
              passHref
            >
              <a>
                <h4 className="text-white text-sm font-semibold truncate hover:underline underline-offset-1">
                  {track.title}
                </h4>
              </a>
            </Link>
          ) : (
            <h4 className="text-white text-sm font-semibold truncate">
              {track.title}
            </h4>
          )}

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
          <LikePlayButton track={track} onClickPlayMusic={onClickPlayMusic} />
        </div>
      </div>
    </div>
  );
});
