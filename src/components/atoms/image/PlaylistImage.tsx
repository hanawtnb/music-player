import { VFC } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiOutlineMusicNote } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../../../atoms/playerAtom";
import { PlayIcon } from "../icon/PlayIcon";

type Props = {
  playlist: any;
};

export const PlaylistImage: VFC<Props> = (props: Props) => {
  const { playlist } = props;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [play, setPlay] = useRecoilState(playState);

  return (
    <div
      // onClick={onClickPlayMusic}
      className="bg-[#0D0D0D] w-[240px] h-[240px] overflow-hidden relative cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto "
    >
      {playlist?.image ? (
        <img
          src={playlist?.image}
          alt=""
          className="h-full w-full object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
        />
      ) : (
        <div className="bg-white/10 w-[240px] h-[240px] rounded-[50px]">
          <HiOutlineMusicNote className=" text-white/80 text-7xl absolute top-20 left-20 items-center justify-center" />
        </div>
      )}
      <div className="relative bottom-16 left-40">
        <PlayIcon track={playlist} />
      </div>
    </div>
  );
};
