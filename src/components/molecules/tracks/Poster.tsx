/* eslint-disable @next/next/no-img-element */
import { memo, useCallback, VFC } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../../../atoms/playerAtom";
import { PlayIcon } from "../../atoms/icon/PlayIcon";

type Props = {
  track: any;
  chooseTrack: (arg1: any) => void;
};

const Poster: VFC<Props> = (props) => {
  const { track, chooseTrack } = props;
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(
    playingTrackState
  ) as any;

  const onClickPlayMusic = () => {
    chooseTrack(track);

    if (track?.uri === playingTrack?.uri) {
      setPlay(!play);
    }
  };
  return (
    <div
      onClick={onClickPlayMusic}
      className="w-[260px] h-[360px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
    >
      <img
        src={track.albumUrl}
        alt=""
        className="h-full  w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
      />
      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div className="relative left-40">
          <PlayIcon track={track} />
        </div>

        <div className="text-[15px] left-30">
          <h4 className="font-extrabold truncate w-44 line-clamp-1">
            {track.title}
          </h4>
          <h6 className="line-clamp-1">{track?.artist}</h6>
        </div>
      </div>
    </div>
  );
};

export default memo(Poster);
