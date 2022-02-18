/* eslint-disable react/display-name */
import { memo, VFC } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../../../atoms/playerAtom";

type Props = {
  track: any;
};

export const PlayIcon: VFC<Props> = memo((props: Props) => {
  const { track } = props;
  const [playingTrack] = useRecoilState(playingTrackState);
  const [play] = useRecoilState(playState);
  return (
    <div className="absolute inset-x-0 ml-4 flex items-center space-x-3.5 invisible group-hover:visible slideIn 1s ease-in forwards">
      <div className="text-white/80 h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
        {track?.uri === playingTrack?.uri && play ? (
          <BsFillPauseFill className="text-xl " />
        ) : (
          <BsFillPlayFill className="text-xl ml-[1px]" />
        )}
      </div>
    </div>
  );
});
