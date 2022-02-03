/* eslint-disable @next/next/no-img-element */
import { memo, useCallback, VFC } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiOutlineMusicNote } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../../../atoms/playerAtom";

type Props = {
  playlist: any;
  chooseTrack: (arg1: any) => void;
};

const Poster: VFC<Props> = (props) => {
  const { playlist, chooseTrack } = props;
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(
    playingTrackState
  ) as any;

  return (
    <>
      <div className="bg-[#0D0D0D] rounded-[25px]">
        <div
          // onClick={onClickPlayMusic}
          className="bg-[#0D0D0D] w-[260px] h-[260px] rounded-[50px] overflow-hidden relative cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
        >
          {playlist?.image ? (
            <img
              src={playlist?.image}
              alt=""
              className="h-full w-full object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
            />
          ) : (
            <HiOutlineMusicNote className="text-white/80 text-7xl absolute top-24 left-24 items-center justify-center" />
          )}

          <div className="absolute bottom-8 left-44 inset-x-0 ml-4 flex items-center space-x-3.5">
            <div className="text-white/80 h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
              {playlist?.uri === playingTrack?.uri && play ? (
                <BsFillPauseFill className="text-xl " />
              ) : (
                <BsFillPlayFill className="text-xl ml-[1px]" />
              )}
            </div>
          </div>
        </div>
        <div className="text-[15px] text-white my-6 mx-4 overflow-hidden max-h-11 w-auto">
          <h6 className="font-extrabold w-44 line-clamp-1">{playlist?.name}</h6>
          <h6 className="line-clamp-1 text-white/80">
            {playlist?.description}
          </h6>
        </div>
      </div>
    </>
  );
};

export default memo(Poster);
