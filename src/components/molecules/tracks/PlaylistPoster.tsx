/* eslint-disable @next/next/no-img-element */
import { memo, useState, VFC } from "react";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../../../atoms/playerAtom";
import { PlaylistImage } from "../../atoms/image/PlaylistImage";

type Props = {
  playlist: any;
  chooseTrack: (arg1: any) => void;
};

const Poster: VFC<Props> = (props) => {
  const { playlist } = props;

  return (
    <>
      <div className="bg-[#0D0D0D] h-[340px] p-3">
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
};

export default memo(Poster);
