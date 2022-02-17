/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { memo, VFC } from "react";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../../../atoms/playerAtom";
import HeartButton from "../../atoms/button/HeartButton";
import { PlayIcon } from "../../atoms/icon/PlayIcon";

type Props = {
  track: any;
  chooseTrack: (arg1: any) => void;
  spotifyApi: any;
  accessToken: any;
};

const Poster: VFC<Props> = (props) => {
  const { track, chooseTrack, spotifyApi, accessToken } = props;
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(
    playingTrackState
  ) as any;

  /**
   * 音楽を再生.
   */
  const onClickPlayMusic = () => {
    chooseTrack(track);

    if (track?.uri === playingTrack?.uri) {
      setPlay(!play);
    }
  };
  return (
    <div className="bg-[#0D0D0D] rounded-xl h-[330px] w-64 p-3 mx-0">
      <div
        onClick={onClickPlayMusic}
        className="w-[220px] h-[220px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
      >
        <img
          src={track.albumUrl}
          alt=""
          className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
        />
        <div className="relative left-36 top-40">
          <PlayIcon track={track} />
        </div>
      </div>
      <div className=" text-white text-[13px] mt-2 overflow-hidden w-auto ml-4 flex items-center ">
        <div className="text-[15px] left-30  ">
          <h4 className="font-extrabold truncate w-44 line-clamp-1">
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
                <span className="hover:underline underline-offset-1 text-white/70 text-[11px] font-semibold group-hover:text-white">
                  {artist.artistName}
                  &nbsp;
                </span>
              </a>
            </Link>
          ))}
          {/* <h6 className="line-clamp-1">
            {track?.artist.map((artist: any) => artist.artistName).join(", ")}
          </h6> */}
        </div>
      </div>
      <div className="relative left-48">
        <HeartButton
          track={track}
          spotifyApi={spotifyApi}
          accessToken={accessToken}
        />
      </div>
    </div>
  );
};

export default memo(Poster);
