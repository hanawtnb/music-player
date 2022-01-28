import { memo, VFC } from "react";
import { ImHeadphones } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";

type Props = {
  track: any;
  chooseTrack: (arg1: any) => void;
};

const Track: VFC<Props> = (props) => {
  const { track, chooseTrack } = props;
  console.log("トラック", track);

  return (
    <div className="flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out">
      <div className="flex items-center">
        <img
          src={track.albumUrl}
          alt=""
          className="rounded-xl h-12 w-12 object-cover mr-3"
        />
        <div>
          <h4 className="text-white text-sm font-semibold truncate w-[450px]">
            {track.title}
          </h4>
          <p className="text-white/70 text-[13px] font-semibold group-hover:text-white">
            {track.artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Track;
