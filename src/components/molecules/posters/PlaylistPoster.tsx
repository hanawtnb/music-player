/* eslint-disable react/display-name */
import { memo, VFC } from "react";
import { PlaylistImage } from "../../atoms/image/PlaylistImage";

type Props = {
  playlist: any;
  chooseTrack: (arg1: any) => void;
};

export const PlaylistPoster: VFC<Props> = memo((props) => {
  const { playlist } = props;

  return (
    <>
      <div className="bg-[#0D0D0D] h-[340px] p-3 rounded-xl">
        <PlaylistImage playlist={playlist} />
        <div className=" text-[15px] text-white my-6 mx-4 overflow-hidden max-h-11 w-auto">
          <h6 className="font-extrabold w-44 line-clamp-1">{playlist?.name}</h6>

          <h6 className="text-white/80 line-clamp-1">
            {playlist?.description}
          </h6>
        </div>
      </div>
    </>
  );
});
