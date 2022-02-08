import { useState, VFC } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../../atoms/playerAtom";

type Props = {
  track: any;
  onClickPlayMusic: () => void;
};

export const LikePlayButton: VFC<Props> = (props: Props) => {
  const { track, onClickPlayMusic } = props;
  const [hasLiked, setHasLiked] = useState(false);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [play, setPlay] = useRecoilState(playState);

  return (
    <div className="md:ml-auto flex items-center space-x-2.5">
      <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
        <AiFillHeart
          className={`text-xl ml-3 icon ${
            hasLiked ? "text-[#1ed760]" : "text-[#868686]"
          }`}
          // onClick={() => addPlayFavorite(track.id, track.title)}
        />
        {track.uri === playingTrack?.uri && play ? (
          <div className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#15883e] icon hover:scale-110">
            <BsFillPauseFill
              onClick={onClickPlayMusic}
              className="text-white text-xl"
            />
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
  );
};
