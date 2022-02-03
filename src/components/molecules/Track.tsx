import { useEffect, useState, VFC } from "react";
import { ImHeadphones } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { useRecoilState } from "recoil";

import { playingTrackState, playState } from "../../atoms/playerAtom";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useSession } from "next-auth/react";

type Props = {
  track: any;
  chooseTrack: (arg1: any) => void;
  spotifyApi: any;
};

const Track: VFC<Props> = (props: Props) => {
  const { track, chooseTrack, spotifyApi } = props;
  // お気に入り登録
  const [hasLiked, setHasLiked] = useState(false);
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const onClickPlayMusic = () => {
    chooseTrack(track);

    if (track?.uri === playingTrack?.uri) {
      setPlay(!play);
    }
  };

  // const onClickAddToPlaylist = (track: any) => {
  //   setHasLiked(!hasLiked);
  //   spotifyApi.addToMySavedTracks([track.id]).then(function (data) {});
  // };

  // const onClickArtistPage = (e) => {
  //   router.push("./Artist.tsx");
  // };

  return (
    <div className=" flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out">
      <div
        className="items-center cursor-pointer w-full"
        onClick={onClickPlayMusic}
      >
        <img
          src={track.albumUrl}
          alt=""
          className="rounded-xl h-12 w-12 object-cover mr-3 float-left"
        />
        <span>
          <h4 className="text-white text-sm font-semibold truncate w-[450px]">
            {track.title}
          </h4>
          {/* <Link href={{ pathname: "/artist", query: { name: track.artist } }}> */}
          <p className="text-white/70 text-[13px] font-semibold group-hover:text-white">
            {track.artist}
          </p>
          {/* </Link> */}
        </span>
      </div>

      <div className="md:ml-auto flex items-center space-x-2.5">
        <div className="text-white flex space-x-1 text-sm font-semibold">
          <ImHeadphones className="text-lg" />
          <h4>{track.popularity}</h4>
        </div>
        <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
          <AiFillHeart
            className={`text-xl ml-3 icon ${
              hasLiked ? "text-[#1ed760]" : "text-[#868686]"
            }`}
            onClick={() => setHasLiked(!hasLiked)}
          />
          {track.uri === playingTrack?.uri && play ? (
            <div className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#15883e] icon hover:scale-110">
              <BsFillPauseFill className="text-white text-xl" />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110">
              <BsFillPlayFill className="text-white text-xl ml-[1px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Track;
