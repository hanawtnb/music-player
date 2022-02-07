import { useState, VFC } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { ImHeadphones } from "react-icons/im";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../../atoms/playerAtom";
import { LikePlayButton } from "./LikePlayButton";

type Props = {
  track: any;
  chooseTrack: (arg1: any) => void;
  spotifyApi: any;
  accessToken: any;
  index: number;
};

export const PlaylistTrack: VFC<Props> = (props: Props) => {
  const { track, chooseTrack, spotifyApi, accessToken, index } = props;
  const [hasLiked, setHasLiked] = useState(false);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [play, setPlay] = useRecoilState(playState);

  const onClickPlayMusic = () => {
    chooseTrack(track);

    if (track?.uri === playingTrack?.uri) {
      setPlay(!play);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out">
        <div
          onClick={onClickPlayMusic}
          className="flex items-center cursor-pointer w-full"
        >
          <h4 className="mr-5 text-white">{index + 1}</h4>
          <img
            src={track.albumUrl}
            className="rounded-xl h-12 w-12 object-cover mr-3 float-left"
          />
          <span>
            <h4 className="text-white text-sm font-semibold truncate w-[450px]">
              {track.name}
            </h4>
            {/* <Link href={{ pathname: "/artist", query: { name: track.artist } }}> */}
            <p className="text-white/70 text-[13px] font-semibold group-hover:text-white">
              {track.artist?.map((artist: any) => artist.artistName)}
            </p>
            {/* </Link> */}
          </span>
        </div>

        <LikePlayButton track={track} onClickPlayMusic={onClickPlayMusic} />
      </div>
    </>
  );
};
